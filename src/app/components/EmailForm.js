'use client';

import { useState, useRef } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Tipos de arquivo suportados
const SUPPORTED_FORMATS = {
  'application/pdf': '.pdf',
  'text/plain': '.txt',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/msword': '.doc',
  'text/html': '.html',
  'application/rtf': '.rtf'
};

export default function EmailForm({ setResults, setLoading, setError }) {
  const [emailText, setEmailText] = useState('');
  const [file, setFile] = useState(null);
  const [processingMethod, setProcessingMethod] = useState('text');
  const [showTextArea, setShowTextArea] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (processingMethod === 'text') {
      if (!emailText.trim()) {
        setError('Por favor, insira um texto do email');
        return;
      }
      if (emailText.trim().length < 5) {
        setError('O email é muito curto. Insira pelo menos 5 caracteres.');
        return;
      }
    }
    
    if (processingMethod === 'file' && !file) {
      setError('Por favor, selecione um arquivo');
      return;
    }
    
    setLoading(true);
    setError('');
    setResults(null);

    try {
      if (processingMethod === 'text') {
        await processEmailText(emailText);
      } else {
        await processEmailFile(file);
      }
    } catch (err) {
      setError(err.message || 'Erro ao processar o email');
    } finally {
      setLoading(false);
    }
  };

  const processEmailText = async (content) => {
    const response = await fetch(`${API_BASE_URL}/process-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: content,
        text: content
      }),
    });
    await handleApiResponse(response);
  };

  const processEmailFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/process-file`, {
      method: 'POST',
      body: formData,
    });
    await handleApiResponse(response);
  };

  const handleApiResponse = async (response) => {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
      }
      
      if (response.status === 422) {
        if (errorData.detail && Array.isArray(errorData.detail)) {
          const errorMessages = errorData.detail.map(err => 
            `${err.loc ? err.loc.join('.') + ': ' : ''}${err.msg}`
          );
          throw new Error(errorMessages.join(', '));
        } else if (errorData.detail) {
          throw new Error(typeof errorData.detail === 'string' 
            ? errorData.detail 
            : JSON.stringify(errorData.detail)
          );
        }
      }
      
      const errorMessages = {
        400: 'Dados inválidos enviados.',
        413: 'Arquivo muito grande. Tamanho máximo: 10MB',
        415: 'Tipo de arquivo não suportado.',
        422: 'Dados inválidos. Verifique o formato do texto ou arquivo.',
        500: 'Erro interno do servidor. Tente novamente em alguns instantes.'
      };
      
      throw new Error(errorMessages[response.status] || `Erro ${response.status}`);
    }

    const data = await response.json();
    if (!data.category || !data.response) {
      throw new Error('Resposta inválida do servidor');
    }
    setResults(data);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
    const supportedExtensions = Object.values(SUPPORTED_FORMATS);
    
    if (!supportedExtensions.includes(fileExtension)) {
      setError(`Tipo de arquivo não suportado. Formatos aceitos: ${supportedExtensions.join(', ')}`);
      e.target.value = '';
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('Arquivo muito grande. Tamanho máximo: 10MB');
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const selectedFile = files[0];
      const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
      const supportedExtensions = Object.values(SUPPORTED_FORMATS);
      
      if (!supportedExtensions.includes(fileExtension)) {
        setError(`Tipo de arquivo não suportado. Formatos aceitos: ${supportedExtensions.join(', ')}`);
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('Arquivo muito grande. Tamanho máximo: 10MB');
        return;
      }

      setFile(selectedFile);
      setProcessingMethod('file');
      setError('');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const resetForm = () => {
    setEmailText('');
    setFile(null);
    setError('');
    setResults(null);
    setShowTextArea(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div 
        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 relative overflow-hidden shimmer-effect ${
          dragOver 
            ? 'border-blue-600 bg-blue-50 transform -translate-y-1 shadow-xl' 
            : 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100'
        } hover:border-blue-600 hover:transform hover:-translate-y-1 hover:shadow-xl`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-5xl mb-5 text-blue-500">📎</div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Envie seu email para análise
          </h3>
          <p className="text-gray-600 mb-2">
            Suporte a arquivos .txt, .pdf, .docx ou texto direto
          </p>
          <p className="text-gray-500 text-sm">
            Máximo 10MB por arquivo
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.txt,.docx,.doc,.html,.rtf"
            className="hidden"
          />
          
          <button
            type="button"
            onClick={() => {
              fileInputRef.current?.click();
              setProcessingMethod('file');
            }}
            className="btn-gradient-blue text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
          >
            📁 Selecionar Arquivo
          </button>
          
          <button
            type="button"
            onClick={() => {
              setShowTextArea(!showTextArea);
              setProcessingMethod('text');
            }}
            className="btn-gradient-blue text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
          >
            ✏️ Inserir Texto
          </button>
        </div>

        {file && (
          <div className="mt-6 p-4 bg-blue-100 rounded-xl border border-blue-200 animate-slideIn">
            <div className="font-medium text-blue-800 mb-2">✅ Arquivo selecionado:</div>
            <div className="text-blue-700">
              📄 {file.name} ({formatFileSize(file.size)})
            </div>
          </div>
        )}
      </div>

      {/* Text Area Section */}
      {showTextArea && (
        <div className="animate-slideIn">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            📝 Cole o conteúdo do email aqui:
          </label>
          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Cole aqui o texto do email que deseja analisar..."
            rows="8"
            className=" text-gray-800 mb-3 w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
            maxLength="10000"
          />
          <div className="text-sm text-gray-500 mt-2">
            {emailText.length}/10000 caracteres {emailText.length < 5 && '(mínimo 5)'}
          </div>
        </div>
      )}

      {/* Process Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={
            (processingMethod === 'text' && (!emailText.trim() || emailText.trim().length < 5)) ||
            (processingMethod === 'file' && !file)
          }
          className="flex-1 btn-gradient-green text-white py-4 px-8 rounded-full text-lg font-semibold transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
        >
          🚀 Analisar Email
        </button>
        
        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-4 text-gray-600 border-2 border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 font-semibold"
        >
          🔄 Limpar
        </button>
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">ℹ️ Informações Importantes:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <div className="font-medium mb-2">📄 Formatos Suportados:</div>
            <ul className="space-y-1">
              <li>• PDF: Documentos Adobe PDF</li>
              <li>• TXT: Arquivos de texto simples</li>
              <li>• DOCX/DOC: Microsoft Word</li>
              <li>• HTML: Páginas web</li>
              <li>• RTF: Rich Text Format</li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">⚙️ Como usar:</div>
            <ul className="space-y-1">
              <li>• Arraste arquivos ou clique para selecionar</li>
              <li>• Use texto direto para análise rápida</li>
              <li>• PDFs funcionam melhor com texto selecionável</li>
              <li>• Limite de 10MB por arquivo</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-300 text-xs text-gray-500 text-center">
          API: {API_BASE_URL}
        </div>
      </div>
    </div>
  );
}
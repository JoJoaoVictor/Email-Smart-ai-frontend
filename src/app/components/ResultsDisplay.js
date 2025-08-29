'use client';

import { useState } from 'react';

export default function ResultsDisplay({ results }) {
  const [copied, setCopied] = useState(false);

  const handleCopyResponse = async () => {
    try {
      await navigator.clipboard.writeText(results.response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
    }
  };

  const isProductive = results.category === 'Produtivo';
  
  return (
    <div className="mt-8 space-y-6 animate-slideIn">
      {/* Classification Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Classificação</h3>
        <div className={`inline-flex items-center px-6 py-3 rounded-full font-semibold text-white mb-4 ${
          isProductive 
            ? 'bg-gradient-to-r from-green-500 to-green-600' 
            : 'bg-gradient-to-r from-orange-500 to-orange-600'
        }`}>
          <span className="mr-2">
            {isProductive ? '✅' : '⚠️'}
          </span>
          {results.category}
        </div>
        
        {results.confidence && (
          <div className="flex items-center">
            <span className="text-gray-600 mr-3">Confiança:</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  isProductive ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-orange-400 to-orange-500'
                }`}
                style={{ width: `${(results.confidence * 100)}%` }}
              ></div>
            </div>
            <span className="font-semibold text-gray-800">
              {(results.confidence * 100).toFixed(1)}%
            </span>
          </div>
        )}
      </div>

      {/* Response Card */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">💬 Resposta Sugerida</h3>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-l-4 border-blue-400">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed italic">
            {results.response}
          </p>
        </div>
        
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleCopyResponse}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {copied ? (
              <>
                ✅ Copiado!
              </>
            ) : (
              <>
                📋 Copiar Resposta
              </>
            )}
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium hover:bg-blue-200 transition-all duration-300"
          >
            🖨️ Imprimir
          </button>
        </div>
      </div>

      {/* Email Preview Card */}
      {results.email_preview && (
        <div className="bg-white p-6 rounded-2xl shadow-xl border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">👁️ Preview do Email</h3>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <p className="text-gray-700 italic leading-relaxed">
              {results.email_preview}
            </p>
          </div>
        </div>
      )}

      {/* Additional Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Dicas para Otimizar</h3>
        <div className="space-y-3 text-sm text-gray-700">
          {isProductive ? (
            <>
              <div className="flex items-start">
                <span className="mr-2 mt-1">🎯</span>
                <span>Este email requer ação específica. Priorize na sua agenda.</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2 mt-1">⏰</span>
                <span>Responda dentro do prazo adequado para manter a produtividade.</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2 mt-1">📝</span>
                <span>Documente as ações tomadas para referência futura.</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start">
                <span className="mr-2 mt-1">😊</span>
                <span>Email de cortesia. Uma resposta cordial é suficiente.</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2 mt-1">📤</span>
                <span>Pode ser respondido em horário de menor prioridade.</span>
              </div>
              <div className="flex items-start">
                <span className="mr-2 mt-1">🤝</span>
                <span>Mantenha o relacionamento positivo com uma resposta calorosa.</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
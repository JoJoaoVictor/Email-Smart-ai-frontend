export default function EmailResults({ results }) {
  if (!results) return null;

  const getCategoryColor = (category) => {
    return category === 'Produtivo' 
      ? 'text-green-700 bg-green-100 border-green-200'
      : 'text-orange-700 bg-orange-100 border-orange-200';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileTypeDescription = (detectedType) => {
    const descriptions = {
      'application/pdf': 'Documento PDF',
      'text/plain': 'Arquivo de texto',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Documento Word (DOCX)',
      'application/msword': 'Documento Word (DOC)',
      'text/html': 'Página HTML',
      'application/rtf': 'Rich Text Format'
    };
    return descriptions[detectedType] || detectedType;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Resultado da Classificação</h2>
      
      {/* Informações do arquivo (se processado via upload) */}
      {results.file_info && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 mb-3">📁 Informações do Arquivo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-700">Nome:</span>
              <p className="text-gray-600 break-all">{results.file_info.filename}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Tipo:</span>
              <p className="text-gray-600">{getFileTypeDescription(results.file_info.detected_type)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Tamanho:</span>
              <p className="text-gray-600">{formatFileSize(results.file_info.size_bytes)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Texto extraído:</span>
              <p className="text-gray-600">{results.file_info.extracted_chars} caracteres</p>
            </div>
          </div>
        </div>
      )}

      {/* Classificação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg border-2 ${getCategoryColor(results.category)}`}>
          <h3 className="font-semibold text-lg mb-1">Categoria</h3>
          <p className="text-2xl font-bold">{results.category}</p>
        </div>
        
        <div className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-lg mb-1 text-gray-700">Confiança</h3>
          <p className={`text-2xl font-bold ${getConfidenceColor(results.confidence)}`}>
            {(results.confidence * 100).toFixed(1)}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                results.confidence >= 0.8 ? 'bg-green-500' :
                results.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${results.confidence * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Preview do conteúdo */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2 text-gray-700">Preview do Conteúdo</h3>
        <div className="p-3 bg-gray-50 border rounded-lg">
          <p className="text-gray-600 text-sm italic">{results.email_preview}</p>
        </div>
      </div>

      {/* Palavras-chave identificadas */}
      {results.processed_keywords && results.processed_keywords.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Palavras-chave Identificadas</h3>
          <div className="flex flex-wrap gap-2">
            {results.processed_keywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Resposta sugerida */}
      <div>
        <h3 className="font-semibold text-lg mb-2 text-gray-700">Resposta Sugerida</h3>
        <div className="p-4 bg-gray-50 border rounded-lg">
          <p className="text-gray-700 whitespace-pre-wrap">{results.response}</p>
        </div>
        <div className="mt-2 flex justify-end">
          <button 
            onClick={() => navigator.clipboard.writeText(results.response)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            📋 Copiar resposta
          </button>
        </div>
      </div>

      {/* Dicas baseadas na categoria */}
      <div className="mt-6 p-4 rounded-lg border-l-4 border-blue-400 bg-blue-50">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Dica</h4>
        <p className="text-blue-700 text-sm">
          {results.category === 'Produtivo' 
            ? 'Este email parece requerer ação ou resposta. Considere priorizá-lo em sua caixa de entrada.'
            : 'Este email parece ser mais informativo ou social. Pode ser respondido quando conveniente.'
          }
        </p>
      </div>
    </div>
  );
}
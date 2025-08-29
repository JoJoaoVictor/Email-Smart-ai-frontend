// src/app/components/LoadingSpinner.js
export default function LoadingSpinner() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center p-8 animate-fadeInUp">
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Spinner secundário para efeito duplo */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        
        {/* Círculo central pulsante */}
        <div className="absolute inset-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* Texto de loading */}
      <div className="mt-6 text-center">
        <div className="text-lg font-semibold text-gray-800 mb-2 animate-pulse">
          Processando com IA...
        </div>
        <div className="text-sm text-gray-600">
          Por favor, aguarde enquanto analisamos seu email
        </div>
      </div>
      
      {/* Barra de progresso animada */}
      <div className="mt-4 w-64 bg-gray-200 rounded-full h-2">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse-glow" style={{
          width: '100%',
          animation: 'shimmer 2s infinite'
        }}></div>
      </div>
      
      {/* Indicadores de etapas */}
      <div className="mt-6 flex space-x-4 text-xs text-gray-500">
        <div className="flex items-center animate-pulse">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          Analisando conteúdo
        </div>
        <div className="flex items-center animate-pulse" style={{ animationDelay: '0.5s' }}>
          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
          Classificando
        </div>
        <div className="flex items-center animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Gerando resposta
        </div>
      </div>
    </div>
  );
}
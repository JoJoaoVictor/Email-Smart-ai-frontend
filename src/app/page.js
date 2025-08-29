'use client';

import { useState } from 'react';
import EmailForm from './components/EmailForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-800 flex items-center justify-center p-5">
      <div className="w-full max-w-4xl bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-3">📧 EmailSmart AI</h1>
          <p className="text-lg opacity-90">
            Classificação Inteligente e Respostas Automáticas para Emails Corporativos
          </p>
        </div>

        {/* Main Content */}
        <div className="p-10">
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4 text-blue-600">🎯</div>
              <h4 className="text-gray-800 font-semibold mb-3">Classificação Precisa</h4>
              <p className="text-gray-600 text-sm">
                Identifica emails produtivos e improdutivos com alta precisão
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4 text-blue-600">⚡</div>
              <h4 className="text-gray-800 font-semibold mb-3">Respostas Instantâneas</h4>
              <p className="text-gray-600 text-sm">
                Gera respostas automáticas contextualizadas
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4 text-blue-600">💼</div>
              <h4 className="text-gray-800 font-semibold mb-3">Otimização de Tempo</h4>
              <p className="text-gray-600 text-sm">
                Libera a equipe para tarefas mais estratégicas
              </p>
            </div>
          </div>

          {/* Email Form */}
          <EmailForm
            setResults={setResults}
            setLoading={setLoading}
            setError={setError}
          />

          {/* Loading Spinner */}
          {loading && <LoadingSpinner />}

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-2xl animate-slideIn">
              <div className="font-medium">❌ Erro:</div>
              <div>{error}</div>
            </div>
          )}

          {/* Results */}
          {results && <ResultsDisplay results={results} />}
        </div>
      </div>
    </div>
  );
}
#📧 EmailSmart AI - Frontend

Sistema inteligente de classificação automática de emails corporativos com interface moderna e responsiva desenvolvida em Next.js.

##✨ Funcionalidades

🧠 Classificação Automática: Identifica emails como produtivos ou improdutivos

📂 Upload de Arquivos: Suporte a múltiplos formatos (PDF, TXT, DOCX, DOC, HTML, RTF)

✏️ Inserção de Texto: Interface para colar texto diretamente

🖱️ Drag & Drop: Arraste e solte arquivos facilmente

🤖 Respostas Inteligentes: Gera respostas contextualizadas automaticamente

🎨 Interface Moderna: Design com glassmorphism, gradientes e animações suaves

📱 Responsivo: Otimizado para desktop e mobile

##🛠️ Tecnologias Utilizadas

Framework: Next.js 13+ (App Router)

Estilização: Tailwind CSS

Linguagem: JavaScript (ES6+)

Fontes: Inter (Google Fonts)

Animações: CSS customizadas + Tailwind

##⚡ Instalação e Configuração
Pré-requisitos

Node.js 18+

npm ou yarn

Passos
# Clone o repositório
git clone [url-do-repositorio]
cd emailsmart-ai-frontend

# Instale as dependências
npm install

# Configure variáveis de ambiente
# Crie um arquivo .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

# Inicie o servidor de desenvolvimento
npm run dev


Acesse a aplicação em: http://localhost:3000

##🎨 Configuração do Tailwind CSS

O projeto utiliza configurações customizadas para animações e estilos únicos.

🔹 Animações Personalizadas

fadeInUp → Entrada suave de baixo para cima

slideIn → Deslizamento lateral

shimmer → Efeito de brilho

pulse-glow → Pulsação com brilho

🔹 Classes Utilitárias

.btn-gradient-blue → Botão com gradiente azul

.btn-gradient-green → Botão com gradiente verde

.glass-effect → Efeito glassmorphism

.shimmer-effect → Container com efeito shimmer

##🧩 Componentes Principais

EmailForm
Gerencia upload de arquivos, inserção de texto, validações e comunicação com a API.

ResultsDisplay
Exibe classificação, barra de confiança animada, resposta sugerida e dicas contextuais.

LoadingSpinner
Spinner duplo com rotações opostas, indicadores de progresso e animações suaves.

##📁 Formatos de Arquivo Suportados
Formato	Extensão	Descrição
PDF	.pdf	Documentos Adobe PDF
Texto	.txt	Arquivos de texto simples
Word	.docx, .doc	Microsoft Word
HTML	.html	Páginas web
RTF	.rtf	Rich Text Format

Limite: máximo 10MB por arquivo.

##🌐 API Integration
Endpoints

POST /process-email → Processa texto direto

POST /process-file → Processa arquivos enviados

Formato de Resposta
{
  "category": "Produtivo|Improdutivo",
  "confidence": 0.85,
  "response": "Resposta sugerida gerada pela IA",
  "email_preview": "Preview do email processado"
}

##🎨 Personalização de Estilos
Cores Primárias
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'primary': {
        400: '#sua-cor',
        500: '#sua-cor',
        600: '#sua-cor',
      }
    }
  }
}

Adicionar Novas Animações
/* globals.css */
@keyframes suaAnimacao {
  0% { /* estado inicial */ }
  100% { /* estado final */ }
}

##💻 Configuração Recomendada no VS Code
// .vscode/settings.json
{
  "css.validate": false,
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}

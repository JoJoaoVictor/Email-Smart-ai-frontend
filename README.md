EmailSmart AI - Frontend
Sistema inteligente de classificação automática de emails corporativos com interface moderna e responsiva desenvolvida em Next.js.
Funcionalidades

Classificação Automática: Identifica emails como produtivos ou improdutivos
Upload de Arquivos: Suporte a múltiplos formatos (PDF, TXT, DOCX, DOC, HTML, RTF)
Inserção de Texto: Interface para colar texto diretamente
Drag & Drop: Funcionalidade de arrastar e soltar arquivos
Respostas Inteligentes: Gera respostas contextualizadas automaticamente
Interface Moderna: Design com glassmorphism, gradientes e animações
Responsivo: Otimizado para desktop e mobile

Tecnologias Utilizadas

Framework: Next.js 13+ (App Router)
Estilização: Tailwind CSS
Linguagem: JavaScript (ES6+)
Fontes: Inter (Google Fonts)
Animações: CSS customizadas + Tailwind

Instalação e Configuração
Pré-requisitos

Node.js 18+
npm ou yarn

Passos de Instalação

Clone o repositório
bashgit clone [url-do-repositorio]
cd emailsmart-ai-frontend

Instale as dependências
bashnpm install

Configure as variáveis de ambiente
Crie um arquivo .env.local na raiz:
envNEXT_PUBLIC_API_URL=http://localhost:8000

Inicie o servidor de desenvolvimento
bashnpm run dev

Acesse a aplicação
http://localhost:3000


Configuração do Tailwind CSS
O projeto usa configurações customizadas do Tailwind para animações e estilos únicos:
Animações Personalizadas

fadeInUp: Entrada suave de baixo para cima
slideIn: Deslizamento lateral
shimmer: Efeito de brilho
pulse-glow: Pulsação com brilho

Classes Utilitárias

.btn-gradient-blue: Botão com gradiente azul
.btn-gradient-green: Botão com gradiente verde
.glass-effect: Efeito glassmorphism
.shimmer-effect: Container com efeito shimmer

Componentes Principais
EmailForm
Componente principal que gerencia:

Upload de arquivos (drag & drop + seleção manual)
Inserção de texto direto
Validações de formato e tamanho
Comunicação com a API backend

ResultsDisplay
Exibe os resultados da análise:

Classificação com indicador visual
Barra de confiança animada
Resposta sugerida com botão de copiar
Dicas contextuais baseadas na classificação

LoadingSpinner
Loading avançado com:

Spinner duplo com rotações opostas
Indicadores de progresso das etapas
Animações suaves

Formatos de Arquivo Suportados
FormatoExtensãoDescriçãoPDF.pdfDocumentos Adobe PDFTexto.txtArquivos de texto simplesWord.docx, .docMicrosoft WordHTML.htmlPáginas webRTF.rtfRich Text Format
Limites: Máximo 10MB por arquivo
API Integration
Endpoints Utilizados

POST /process-email: Processa texto direto
POST /process-file: Processa arquivos enviados

Formato de Resposta Esperado
json{
  "category": "Produtivo|Improdutivo",
  "confidence": 0.85,
  "response": "Resposta sugerida gerada pela IA",
  "email_preview": "Preview do email processado"
}
Scripts Disponíveis
bashnpm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
Personalização de Estilos
Modificar Cores Primárias
No tailwind.config.js, ajuste as cores em theme.extend.colors:
javascriptcolors: {
  'primary': {
    400: '#sua-cor',
    500: '#sua-cor',
    600: '#sua-cor',
  }
}
Adicionar Novas Animações
Em globals.css, adicione keyframes personalizados:
css@keyframes suaAnimacao {
  0% { /* estado inicial */ }
  100% { /* estado final */ }
}
Configuração do VS Code
Recomendado criar .vscode/settings.json:
json{
  "css.validate": false,
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}

# Painel de Atendimento - Back-end e Front-end

Sistema backend para gerenciamento de filas e atendimento. Permite controle eficiente de filas, autenticação de usuários e visualização em tempo real dos atendimentos.

---

## Tecnologias Utilizadas

- **Node.js** e **Express**: Framework backend rápido e flexível.
- **PostgreSQL** com **Prisma**: Banco de dados relacional com mapeamento de dados eficiente.
- **Bcryptjs**: Hash de senhas para autenticação segura.
- **Dotenv**: Gerenciamento de variáveis de ambiente.
- **Nodemon**: Facilita o desenvolvimento com reinicialização automática do servidor.
- **EJS (Embedded JavaScript)**: Motor de visualização para renderizar páginas dinâmicas com HTML.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e customizável.
- **API de Temperatura**: Integração com uma API externa para exibir a temperatura em tempo real no painel.

---

## Funcionalidades

- **Gerenciamento de Filas**:
  - Geração de senhas.
  - Controle e exibição de guichês em tempo real.
  - Priorização de atendimentos.
- **Autenticação de Usuários**:
  - Perfis de administrador, operador e usuário.
- **Painel de Atendimento**:
  - Atualização em tempo real para operadores e usuários.

---

## Estrutura do Projeto

O projeto segue o padrão de **Service**, **Controller** e **View**:

- **Service**:
  - Manipulação de dados via Prisma.
- **Controller**:
  - Lógica de negócios e interação entre Service e View.
- **View**:
  - Respostas em formato JSON, integradas ao frontend.

---

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/FelipeOropeza/Painel-Atendimento.git
   cd Painel-Atendimento

2. **Certifique-se de ter o Node.js instalado**:
  Versão mínima recomendada: 14.x

3. **Instale as dependências**:
   ```bash
   npm install

4. **Crie o arquivo .env com base no arquivo .env.example fornecido**:
   Configure as variáveis de ambiente de acordo com as credenciais e configurações do seu ambiente.

5. **Prepare o banco de dados**: Aplique o esquema do Prisma no PostgreSQL:
   ```bash
   npx prisma db push

6. **Execute o servidor**:
    ```bash
    npm run dev

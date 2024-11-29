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
- **Sistema de vinculo**:
  - Onde o operador escolhe a primeira senha que foi gerada, assim adicionando em uma fila. 
- **Painel que mostra**:
  - Senhas criadas.
  - Senha atual.
  - Senhas que já foram chamadas.
- **Autenticação da Empresa**:
  - O operador, tem um perfil dá empresa, podendo usar em vários computadores, trocando só o guiche.
- **Painel de Atendimento**:
  - Atualização em tempo real da temperatura ambiente e as horas.

---

## Estrutura do Projeto

O projeto segue o padrão **Service, Controller e View**, onde cada parte é responsável por uma área específica da aplicação:

- **Service**: 
  - Manipula dados de usuários, empresas, etc.
  - Exemplo: `UserService` pode incluir métodos para criar, ler, atualizar ou deletar usuários.

- **Controller**:
  - Controla o fluxo de dados entre o **Service** e a **View**.
  - Exemplo: `UserController` pode conter uma rota para exibir todos os usuários, que irá consultar o `UserService` e passar os dados para uma view **EJS** renderizada.

- **View (EJS)**:
  - Templates **EJS** são usados para gerar HTML dinâmico que será enviado ao cliente.
  - Exemplo: `userList.ejs` renderiza a lista de usuários, recebendo dados processados pelo `UserController`.

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
    npx prisma migrate deploy
  
6. **Execute o servidor**:
    ```bash
    npm run dev

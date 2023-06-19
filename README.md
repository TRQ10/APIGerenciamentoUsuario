# APIGerenciamentoUsuario

# Configuração do Ambiente

Antes de iniciar o servidor da API, certifique-se de ter instalado as dependências necessárias. Para fazer isso, siga as etapas abaixo:

   1. Certifique-se de ter o Node.js instalado em seu ambiente de desenvolvimento.
   2. Abra o terminal e navegue até o diretório raiz do projeto.
   3. Execute o seguinte comando para instalar as dependências:
   4. 
    
  <img src="https://github.com/TRQ10/rdm.images/blob/main/install.png" alt="Demonstração">
  
# Variáveis de Ambiente
  
Para que a autenticação e o envio de e-mail funcionem corretamente, é necessário preencher as variáveis de ambiente com as informações necessárias. Antes de iniciar o servidor, crie um arquivo .env na raiz do projeto e preencha as seguintes variáveis:

<img src="https://github.com/TRQ10/rdm.images/blob/main/ENV.png" alt="Demonstração">

Certifique-se de substituir os valores acima pelos dados corretos da sua configuração de e-mail e pela chave secreta do JWT.

# Uso da Rota de Registro

A rota POST: http://localhost:8080/teste/register é usada para registrar um novo usuário. Para utilizá-la, siga as etapas abaixo:

   1. Envie uma solicitação POST para a URL mencionada.
   2. No corpo da solicitação, inclua os seguintes parâmetros obrigatórios:

   <img src="https://github.com/TRQ10/rdm.images/blob/main/register.png" alt="Demonstração">
   
   - O campo "usuario" deve conter o nome de usuário escolhido.
   - O campo "senha" deve conter a senha escolhida.
   - O campo "email" deve conter o endereço de e-mail do usuário.
   - O campo "perfil" é opcional e pode ser deixado em branco.

# Uso da Rota de Login

A rota POST: http://localhost:8080/teste/login é usada para realizar o login de um usuário. Para utilizá-la, siga as etapas abaixo:

   1. Envie uma solicitação POST para a URL mencionada.
   2. No corpo da solicitação, inclua os seguintes parâmetros obrigatórios:
   
   <img src="https://github.com/TRQ10/rdm.images/blob/main/login.png" alt="Demonstração">
   
   - O campo "usuario" deve conter o nome de usuário registrado.
   - O campo "senha" deve conter a senha correspondente ao usuário.

# Uso da Rota de Consulta de Usuário

A rota GET: http://localhost:8080/teste/user/:usuario é usada para consultar informações de um usuário específico. Substitua :usuario pelo nome de usuário desejado. Siga as etapas abaixo:

   1. Envie uma solicitação GET para a URL mencionada, substituindo :usuario pelo nome de usuário desejado.
   2. A rota buscará o usuário no banco de dados com base no nome de usuário fornecido.
   3. Se o usuário for encontrado, suas informações serão retornadas na resposta, excluindo a senha. Além disso, a resposta incluirá um campo booleano tokenGenerated, indicando se um token de verificação foi gerado para o usuário.

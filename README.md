# APIGerenciamentoUsuario

Antes de iniciar o servidor da API, certifique-se de ter instalado as dependências necessárias. Para fazer isso, siga as etapas abaixo:

   1. Certifique-se de ter o Node.js instalado em seu ambiente de desenvolvimento.
   2. Abra o terminal e navegue até o diretório raiz do projeto.
   3. Execute o seguinte comando para instalar as dependências:
    
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
   
   2. Se as credenciais de login forem válidas, a API gerará um token de autenticação do tipo Bearer.
   3. O token será retornado na resposta da API, juntamente com uma mensagem de sucesso e o nome de usuário.
   4. Guarde o token gerado para autenticar solicitações futuras.
   
   Exemplo de resposta bem-sucedida:
   
   <img src="https://github.com/TRQ10/rdm.images/blob/main/login-sucesso.png" alt="Demonstração">
   
# Uso da Rota de Consulta de Usuário

A rota GET: http://localhost:8080/teste/user/:usuario é usada para consultar informações de um usuário específico. Substitua :usuario pelo nome de usuário desejado. Siga as etapas abaixo:

   1. Envie uma solicitação GET para a URL mencionada, substituindo :usuario pelo nome de usuário desejado.
   2. A rota buscará o usuário no banco de dados com base no nome de usuário fornecido.
   3. Se o usuário for encontrado, suas informações serão retornadas na resposta, excluindo a senha. Além disso, a resposta incluirá um campo booleano tokenGenerated, indicando se um token de verificação foi gerado para o usuário.

# Uso da Rota de Atualização de Usuário

A rota PUT: http://localhost:8080/teste/updateUser é usada para atualizar as informações de um usuário. Para utilizá-la, siga as etapas abaixo:

   1. Envie uma solicitação PUT para a URL mencionada.
   2. No corpo da solicitação, inclua os seguintes parâmetros opcionais:

   <img src="https://github.com/TRQ10/rdm.images/blob/main/update.png" alt="Demonstração">
   
   - O campo "nome" é opcional e pode ser usado para atualizar o nome do usuário.
   - O campo "perfil" é opcional e pode ser usado para atualizar o perfil do usuário.
   
   Certifique-se de incluir o cabeçalho de autenticação com o token JWT válido do usuário que é gerado apos o mesmo se logar com sucesso.

# Rota para Gerar OTP (One-Time Password)

A rota GET: http://localhost:8080/teste/generateOTP é usada para gerar um OTP (One-Time Password) aleatório. Um OTP é uma senha de uso único usada para autenticação ou validação.

Para utilizar essa rota, siga as etapas abaixo:

   1. Envie uma solicitação GET para a URL mencionada.
   2. A API irá gerar um OTP aleatório com 7 caracteres.
   3. O OTP gerado será retornado na resposta da API.

   Exemplo de resposta bem-sucedida:
   
   <img src="https://github.com/TRQ10/rdm.images/blob/main/otp.png" alt="Demonstração">
   
   O código OTP gerado pode ser utilizado de acordo com as necessidades do seu projeto, como validação de telefone, autenticação de dois fatores, entre outros.
   
# Rota para Verificar OTP (One-Time Password)
   A rota GET: http://localhost:8080/teste/verifyOTP é usada para verificar se um OTP (One-Time Password) fornecido corresponde ao OTP gerado anteriormente.

Para utilizar essa rota, siga as etapas abaixo:

   1. Envie uma solicitação GET para a URL mencionada.
   2. Inclua o parâmetro code na query da solicitação, contendo o valor do OTP a ser verificado.
   3. A API irá comparar o valor fornecido com o OTP gerado anteriormente.
   4. Se o valor fornecido corresponder ao OTP gerado, a resposta da API será um status 200 indicando sucesso na verificação.
   5. Caso contrário, a resposta da API será um status 400 indicando OTP inválida.
   
   Exemplo de solicitação:
   
   <img src="https://github.com/TRQ10/rdm.images/blob/main/urlEXP.png" alt="Demonstração">
   
   Exemplo de resposta bem-sucedida:
   
   <img src="https://github.com/TRQ10/rdm.images/blob/main/yesV.png" alt="Demonstração">
   
   Exemplo de resposta de erro:
   
   <img src="https://github.com/TRQ10/rdm.images/blob/main/noV.png" alt="Demonstração">
  
   Certifique-se de utilizar o valor correto do OTP para verificar sua validade.
   

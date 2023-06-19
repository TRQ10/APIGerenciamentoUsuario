# APIGerenciamentoUsuario

## Overview

A APIGerenciamentoUsuario é uma API desenvolvida em JavaScript que lida com operações de gerenciamento de usuários, como registro, login, atualizações de perfil e alteração de senha. A API é executada na porta 8080.

## Pré-requisitos

Certifique-se de ter o Node.js instalado em sua máquina antes de prosseguir com a configuração e execução da API.

## Instalação

1. Faça o download do código-fonte da APIGerenciamentoUsuario.

2. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências necessárias: npm install

## Configuração

Antes de iniciar o servidor da API, siga as etapas a seguir para configurar corretamente o ambiente:

1. Preencha as variáveis de ambiente necessárias. Crie um arquivo `.env` ou utilize o que já está presente no diretório raiz do projeto e forneça os seguintes valores:

Configurações de autenticação

JWT_SECRET = 'sua encriptografia'

Configurações de envio de email

EMAIL = "seu email do outlook"
SENHA = "sua senha do outlook"
EGMAIL = "seu email do google"
SGMAIL = "sua senha"

Certifique-se de substituir os valores acima pelos seus próprios. Essas configurações são necessárias para o funcionamento adequado da autenticação e do envio de emails após o registro do usuário.

## Executando a API

Após concluir a configuração, você pode iniciar o servidor da API com o seguinte comando: npm start

A API será iniciada e estará disponível no endereço http://localhost:8080.

## Documentação das Rotas

Recomendamos fornecer uma documentação detalhada das rotas e suas funcionalidades em uma seção separada, como um arquivo `API_DOCUMENTATION.md`. Isso ajudará outros desenvolvedores a entenderem como usar corretamente a API e aproveitar suas funcionalidades.

## Exemplo de Uso

Aqui está um exemplo básico de como usar a APIGerenciamentoUsuario:

#language: pt
Funcionalidade: Gerenciamento de Usuários

  Cenário: Criar um novo usuário
    Dado que eu possuo os detalhes de um usuário, incluindo nome de usuário, primeiro nome e senha
    Quando eu envio uma requisição POST para "/user" com esses dados
    Então o usuário deve ser criado no sistema

  Cenário: Criar uma lista de usuários
    Dado que eu possuo uma lista de detalhes de usuários em formato de array
    Quando eu envio uma requisição POST para "/user/createWithArray" com essa lista
    Então os usuários devem ser adicionados ao sistema

  Cenário: Resgatar um usuário pelo nome
    Dado que eu possuo o nome de um usuário
    Quando eu envio uma requisição GET para "/user/{username}"
    Então devo receber os detalhes do usuário

  Cenário: Atualizar um usuário
    Dado que eu possuo os dados atualizados de um usuário e o nome de usuário
    Quando eu envio uma requisição PUT para "/user/{username}" com esses dados
    Então as informações do usuário devem ser atualizadas

  Cenário: Deletar um usuário
    Dado que eu possuo o nome de um usuário
    Quando eu envio uma requisição DELETE para "/user/{username}"
    Então o usuário deve ser removido do sistema

  Cenário: Logar no sistema como um usuário
    Dado que eu possuo um nome de usuário e uma senha
    Quando eu envio uma requisição GET para "/user/login" com as credenciais
    Então devo receber uma resposta de login bem-sucedida

  Cenário: Deslogar do sistema
    Dado que estou logado como um usuário
    Quando eu envio uma requisição GET para "/user/logout"
    Então devo ser deslogado do sistema

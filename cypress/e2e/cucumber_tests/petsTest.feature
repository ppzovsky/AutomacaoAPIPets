#language: pt 
Funcionalidade: Gerenciamento de Pets

  Cenário: Adicionar um novo pet
    Dado que eu possuo os detalhes de um pet incluindo nome, status e categoria
    Quando eu envio uma requisição POST para /pet com esses dados
    Então o pet deve ser adicionado ao sistema

  Cenário: Adicionar uma foto para um pet
    Dado que eu possuo uma imagem de um pet
    Quando eu envio uma requisicao para atualizar a imagem
    Então a imagem deve ser enviada e associada ao pet

  Cenário: Atualizar um pet existente
    Dado que eu possuo os detalhes de um pet existente incluindo nome, id, status e categoria
    Quando eu envio uma requisição PUT para /pet com os dados atualizados
    Então as informações do pet devem ser atualizadas

  Cenário: Procurar pets pelo status "available"
    Dado que eu possuo um status "available"
    Quando eu envio uma requisição GET para buscar por status
    Então devo receber uma lista de pets que correspondem ao status "available"

  Cenário: Procurar pets pelo status "pending"
    Dado que eu possuo um status "pending"
    Quando eu envio uma requisição GET para buscar por status
    Então devo receber uma lista de pets que correspondem ao status "pending"

  Cenário: Procurar pets pelo status "sold"
    Dado que eu possuo um status "sold"
    Quando eu envio uma requisição GET para buscar por status
    Então devo receber uma lista de pets que correspondem ao status "sold"

  Cenário: Procurar um pet existente pelo seu ID
    Dado que eu possua um ID de um pet existente 
    Quando eu envio uma requisição GET para esse ID
    Então devo receber os detalhes do pet

  Cenário: Procurar um pet existente pelo seu ID (flaky test)
    Dado que eu possua um ID de um pet existente mas possa falhar
    Quando eu envio uma requisição GET para esse ID
    Então devo receber os detalhes do pet

  Cenário: Procurar um pet inexistente
    Dado que 231 seja o ID de um pet inexistente 
    Quando eu envio uma requisição GET para esse ID
    Então o sistema deve exibir a mensagem Pet Not Found

  Cenário: Deletar um pet
    Dado que eu possua um ID de um pet existente
    Quando eu envio uma requisição DELETE para esse ID
    Então o pet deve ser removido do sistema

  Cenário: Deletar um pet inexistente
    Dado que 231 seja o ID de um pet inexistente
    Quando eu envio uma requisição DELETE para esse ID
    Então o sistema deve exibir a mensagem Pet Not Found

  Cenário: Deletar um pet (flaky test)
    Dado que eu possua um ID de um pet existente mas possa falhar
    Quando eu envio uma requisição DELETE para esse ID
    Então o pet deve ser removido do sistema

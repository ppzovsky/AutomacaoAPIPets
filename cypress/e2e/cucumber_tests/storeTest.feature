#language: pt
Funcionalidade: Gerenciamento da loja e pedidos

  Cenário: Consultar inventário de pets por status
    Dado que eu precise acessar o inventario de pets
    Quando eu envio uma requisicao GET para inventory
    Então devo receber o inventário de pets agrupado por status

  Cenário: Criar um novo pedido de pet
    Dado que eu possuo os detalhes do pedido, incluindo o ID do pet e a quantidade
    Quando eu envio uma requisição POST para cadastrar um pedido com esses dados
    Então o pedido deve ser criado

  Cenário: Procurar um pedido pelo seu ID (flaky test) 
    Dado que eu possuo o ID de um pedido 
    E ele seja um numero maior que 0 e menor que 10
    Quando eu envio uma requisição GET para buscar esse pedido
    Então devo receber os detalhes do pedido
  
  Cenário: Procurar um pedido inexistente
    Dado que eu possuo o ID de um pedido inexistente
    E ele seja um numero maior que 0 e menor que 10
    Quando eu envio uma requisição GET para buscar esse pedido
    Então devo receber a mensagem Order not found

  Cenário: Deletar um pedido (flaky test)
    Dado que eu possuo o ID de um pedido
    Quando eu envio uma requisição DELETE para apagar esse pedido
    Então o pedido deve ser removido do sistema
  
  Cenário: Deletar um pedido inexistente
    Dado que eu possuo o ID de um pedido inexistente
    Quando eu envio uma requisição DELETE para apagar esse pedido
    Então devo receber a mensagem Order not found
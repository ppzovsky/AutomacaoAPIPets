import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import orders from '../../../fixtures/orders.json'

Given('que eu precise acessar o inventario de pets', () => {
    cy.wrap('/store/inventory').as('endpointInventario');
});
  
When('eu envio uma requisicao GET para inventory', function () {
    cy.get('@endpointInventario').then((endpoint) => {
        cy.request({
        method: 'GET',
        url: endpoint,
        failOnStatusCode: false,
        }).then((response) => {
        cy.wrap(response).as('response');
        });
    });
});
  
Then('devo receber o inventário de pets agrupado por status', function () {
    cy.get('@response').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('available');
        expect(res.body).to.have.property('sold');
        expect(res.body).to.have.property('pending');
        expect(res.body).to.have.property('string');
    });
});

Given('que eu possuo os detalhes do pedido, incluindo o ID do pet e a quantidade', () => {
    let order = orders[Math.floor(Math.random() * (9 - 0) + 0)];
    const pedido = {
      petId: order.petId,
      quantity: order.quantity,
      shipDate: new Date().toISOString(),
    };
    cy.wrap(pedido).as('novoPedido');
});
  
When('eu envio uma requisição POST para cadastrar um pedido com esses dados', function () {
    cy.get('@novoPedido').then((pedido) => {
        cy.request('POST', '/store/order', pedido).then((response) => {
        cy.wrap(response).as('response');
        });
    });
});

Then('o pedido deve ser criado', function () {
    cy.get('@response').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('petId');
        expect(res.body).to.have.property('complete');
    });
});

Given('que eu possuo o ID de um pedido', () => {
    const orderId = Math.floor(Math.random() * (10));
    cy.wrap(orderId).as('orderId');
  });

Given('que eu possuo o ID de um pedido inexistente', () => {
    cy.wrap(1).as('orderId');
  });

And('ele seja um numero maior que 0 e menor que 10', function (){ 
    cy.get('@orderId').then((orderId) => {
        expect(orderId).to.be.a('number');
        expect(orderId).to.be.greaterThan(0);
        expect(orderId).to.be.lessThan(10);
    });
});
  
When('eu envio uma requisição GET para buscar esse pedido', function () {
    cy.get('@orderId').then((orderId) => {
        cy.request({
        method: 'GET',
        url: `/store/order/${orderId}`,
        failOnStatusCode: false,
        }).then((response) => {
        cy.wrap(response).as('response');
        });
    });
});

Then('devo receber os detalhes do pedido', function () {
    cy.get('@response').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('id');
    });
});

Then('devo receber a mensagem Order not found', function () {
    cy.get('@response').then((res) => {
        expect(res.status).to.eq(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.match(/order not found/i);
    });
});
  
When('eu envio uma requisição DELETE para apagar esse pedido', function () {
    cy.get('@orderId').then((orderId) => {
        cy.request({
        method: 'DELETE',
        url: `/store/order/${orderId}`,
        failOnStatusCode: false,
        }).then((response) => {
        cy.wrap(response).as('response');
        });
    });
});

Then('o pedido deve ser removido do sistema', function () {
    cy.get('@response').then((res) => {
        expect(res.status).to.eq(200);
    });
});
  


  
  
  
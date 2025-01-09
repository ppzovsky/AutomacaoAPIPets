import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('que eu possuo os detalhes de um usuário, incluindo nome de usuário, primeiro nome e senha', () => {
    cy.wrap({
        username: "joaosoares",
        firstname: "João",
        lastname: "Soares",
        email: "joaos@ig.com.br",
        password: "senhateste",
        phone: "992935467",
        userStatus: 1
    }).as('novoUsuario');
})

When('eu envio uma requisição POST para /user com esses dados', () => {
    cy.get('@novoUsuario').then((usuario) => {
        cy.request('POST', '/user', usuario).as('response');
    });
})

Then('o usuário deve ser criado no sistema', function () {
    cy.get('@response').then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('id');
  });
});
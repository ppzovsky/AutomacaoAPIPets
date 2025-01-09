import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import pets from '../../../fixtures/pets.json';
import { listaPetsExistentes, selecionarIdValido } from '../functions/petsTestFunctions';

Given('que eu possuo os detalhes de um pet incluindo nome, status e categoria', () => {
    let pet = pets[Math.floor(Math.random() * (9 - 0) + 0)];
    cy.wrap({
      name: pet.name,
      status: pet.status,
      category: { name: pet.category.name },
      photoUrls: pet.photoUrls
  }).as('novoPet');
});

When('eu envio uma requisição POST para /pet com esses dados', function () {
    cy.get('@novoPet').then((pet) => {
    cy.request('POST', '/pet', pet).as('response');
  });
});

Then('o pet deve ser adicionado ao sistema', function () {
    cy.get('@response').then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('id');
  });
});


Given('que eu possuo uma imagem de um pet', () => {
    cy.fixture('imagemTeste.jpg', 'base64').as('imagemPet');
});

When('eu envio uma requisicao para atualizar a imagem', function () {
    let petId = Math.floor(Math.random() * (10 - 1) + 1);
    cy.get('@imagemPet').then((imagemBase64) => {
      
      const byteCharacters = atob(imagemBase64); 
      const byteArrays = new Uint8Array(byteCharacters.length); 
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i); 
      }

      const blob = new Blob([byteArrays], { type: 'image/jpeg' }); 
      const formData = new FormData();
      formData.append('file', blob, 'pet_image.jpg'); 

      cy.request({
        method: 'POST',
        url: `https://petstore.swagger.io/v2/pet/${petId}/uploadImage`,
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).as('response');
  });
});

Then('a imagem deve ser enviada e associada ao pet', function () {
  cy.get('@response').then((res) => {
    expect(res.status).to.eq(200);
  });
});

Given('que eu possuo os detalhes de um pet existente incluindo nome, id, status e categoria', () => {
    let petId = Math.floor(Math.random() * (9 - 1) + 1);
  const pet = {
    id: petId,
    name: pets[petId].name,
    status: pets[petId].status,
    category: { name: pets[petId].category.name },
    photoUrls: pets[petId].photoUrls
  };
  cy.wrap(pet).as('petAtualizado');
});

When('eu envio uma requisição PUT para /pet com os dados atualizados', function () {
  cy.get('@petAtualizado').then((pet) => {
    cy.request('PUT', '/pet', pet).as('response');
  });
});

Then('as informações do pet devem ser atualizadas', function () {
    cy.get('@petAtualizado').then((petEsperado) => {
        cy.get('@response').then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.name).to.eq(petEsperado.name);
          expect(res.body.status).to.eq(petEsperado.status);
          expect(res.body.category.name).to.eq(petEsperado.category.name);
          expect(res.body.photoUrls).to.deep.eq(petEsperado.photoUrls);
        });
      });
});

Given('que eu possuo um status {string}', (status) => {
  cy.wrap(status).as('statusPet');
});

When('eu envio uma requisição GET para buscar por status', function () {
  cy.get('@statusPet').then((status) => {
    cy.request('GET', `/pet/findByStatus?status=${status}`).as('response');
  });
});

Then('devo receber uma lista de pets que correspondem ao status {string}', function (status) {
  cy.get('@response').then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.be.an('array');
    res.body.forEach((pet) => {
      expect(pet.status).to.eq(status);
    });
  });
});


Given('que eu possua um ID de um pet existente', () => {
    listaPetsExistentes();
    selecionarIdValido();
});

Given('que eu possua um ID de um pet existente mas possa falhar', () => {
    listaPetsExistentes();
    cy.get('@listaPetsExistentes').then((pets) => {
        expect(pets).to.be.an('array');
        expect(pets.length).to.be.greaterThan(0);

        const petAleatorio = pets[Math.floor(Math.random() * pets.length)];
        cy.wrap(petAleatorio.id).as('petId');
    });  
});

Given('que 231 seja o ID de um pet inexistente', () => {
    cy.wrap(231).as('petId');
});

When('eu envio uma requisição GET para esse ID', function () {
    cy.get('@petId').then((id) => {
      cy.request({
        method: 'GET',
        url: `/pet/${id}`,
        failOnStatusCode: false
      }).as('response');
    });
  });
  

Then('devo receber os detalhes do pet', function () {
    cy.get('@petId').then((id) =>{
        cy.get('@response').then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('id');
            expect(res.body.id).to.eq(id);
        });
    });
});

Then('o sistema deve exibir a mensagem Pet Not Found', function () {
    cy.get('@response').then((res) => {
        expect(res.status).to.eq(404);
        expect(res.body).to.have.property('message', 'Pet not found');
    });
});

When('eu envio uma requisição DELETE para esse ID', function () {
    cy.get('@petId').then((id) => {
    cy.request({
        method: 'DELETE', 
        url: `/pet/${id}`, 
        failOnStatusCode: false
    }).as('response');
  });
});

Then('o pet deve ser removido do sistema', function () {
    cy.get('@petId').then((id) =>{
        cy.get('@response').then((res) => {
            expect(res.status).to.eq(200);
        });
        cy.request({
            method: 'GET',
            url: `/pet/${id}`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(404);
        });
    });
});

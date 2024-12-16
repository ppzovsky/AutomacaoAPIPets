export function listaPetsExistentes (){
    return cy.request('GET', `/pet/findByStatus?status=available`).then((res) => {
        expect(res.status).to.eq(200);
        cy.wrap(res.body).as('listaPetsExistentes');
    });
}

export function selecionarIdValido() {
    cy.get('@listaPetsExistentes').then((pets) => {
        expect(pets).to.be.an('array');
        expect(pets.length).to.be.greaterThan(0);

        const petAleatorio = pets[Math.floor(Math.random() * pets.length)];
        
        if (petAleatorio.id < 10000000000) {  
            cy.wrap(petAleatorio.id).as('petId');  
        } else {
            cy.log('ID muito longo, tentando novamente...');
            selecionarIdValido(); 
        }
    });
}
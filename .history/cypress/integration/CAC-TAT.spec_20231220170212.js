// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longtext = 'TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte,TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte'
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const longtext = 'TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte,TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte'
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo_exemplo.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone vazio quando não numérico', function() {
        cy.get('#phone')
            .type('abcdef')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longtext = 'TESTE, teste, TESte'
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        const longtext = 'TESTE, teste, TESte'
        cy.get('#firstName')
            .type('Walmyr')
            .should('have.value', 'Walmyr')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Filho')
            .should('have.value', 'Filho')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('exemplo@exemplo.com')
            .should('have.value', 'exemplo@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type(longtext)
            .should('have.value', longtext)
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456')
            .should('have.value', '123456')
            .clear()
            .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })


    it('usar contains para achar botão e outras classes', function() {
        const longtext = 'TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte,TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte'
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
    })

    //ONLY roda apenas com esse comando it.only('seleciona um produto (YouTube) por seu texto', function() {
    it('seleciona um produto (YouTube) por seu texto', function() {
        //por ter apenas 1 select, poderia ser:         cy.get('select').select('YouTube')
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })


    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
            //por ter apenas 1 select, poderia ser:         cy.get('select').select('YouTube')
            cy.get('#product').select('mentoria')
                .should('have.value', 'mentoria')
    })


    it('seleciona um produto (Blog) por seu índice', function() {
        //por ter apenas 1 select, poderia ser:         cy.get('select').select('YouTube')
        cy.get('#product').select('mentoria')
            .select(1)
            .should('have.value', 'blog')
    
    })


    it('marca o tipo de atendimento "Feedback"', function() {
        //por ter apenas 1 select, poderia ser:         cy.get('select').select('YouTube')
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('have.value', 'feedback')
    })


    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
               cy.wrap($radio).check()
               cy.wrap($radio).should('be.checked')
            })
    })


    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })


    it('CHECK - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longtext = 'TESTE, teste, TESte'
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })


    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })



    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })


    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
            cy.contains('Talking About Testing').should('be.visible')
    })


    //Seção 9: Simulando as dimensões de um dispositivo móvel

    it('preenche os campos obrigatórios e envia o formulário com cy.thick e cy.clock', function() {
        const longtext = 'TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte,TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte'
        cy.clock()
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo@exemplo.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')

    })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida com clock e tick', function() {
        const longtext = 'TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte,TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESte, TESTE, teste, TESteTESTE, teste, TESte'
        cy.clock()
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('exemplo_exemplo.com')
        cy.get('#open-text-area').type(longtext, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(5, function () {
        it('campo telefone vazio quando não numérico com _times', function() {
            cy.get('#phone')
                .type('abcdef')
                .should('have.value', '')
        })
    })


    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })


      it('preenche a area de texto usando o comando invoke', function() {
        const longtext = Cypress._.repeat('teste - Teste,', 700)
        cy.get('#open-text-area')
            .invoke('val', longtext)
            .should('have.value', longtext)
      })

      it('faz uma requisição http', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                console.log(response)
                const {status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')     
            })
      })

})

describe('Note app', function() {
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'lyoung',
            username: 'admin',
            password: 'StrongP@ss2'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })

    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
    })

    it('user can log in', function() {
        cy.contains('login').click()
        cy.get('#username').type('admin')
        cy.get('#password').type('StrongP@ss2')
        cy.get('#login-button').click()
        cy.contains('lyoung logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('admin')
        cy.get('#password').type('wrongPass')
        cy.get('#login-button').click()
        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'lyoung logged in')
    })

    describe('when logged in', function() {
        beforeEach(function () {
            cy.login({ username: 'admin', password: 'StrongP@ss2' })
        })

        it('a new note can be created', function() {
            cy.contains('New note').click()
            cy.get('input').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })

        describe('and a note exists', function () {
            beforeEach(function () {
                cy.createNote({
                    content: 'another note cypress',
                    important: true
                })
            })

            it('it can be made not important', function () {
                cy.contains('another note cypress').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make important')
            })
        })

        describe('and several notes exist', function () {
            beforeEach(function () {
                cy.createNote({ content: 'first note', important: false })
                cy.createNote({ content: 'second note', important: false })
                cy.createNote({ content: 'third note', important: false })
            })
            it('one of those can be made important', function () {
                cy.contains('second note').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make not important')
            })
        })
    })
})
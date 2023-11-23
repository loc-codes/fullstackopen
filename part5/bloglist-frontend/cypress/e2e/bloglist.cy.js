describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        // create here a user to backend
        const user = {
            name: 'lyoung',
            username: 'admin',
            password: 'StrongP@ss2'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })
    it('Login form is shown', function() {
        cy.contains('login').click()
        cy.get('#login-title')
        cy.get('#user-input')
        cy.get('#password-input')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#user-input').type('admin')
            cy.get('#password-input').type('StrongP@ss2')
            cy.get('#login-submit').click()
            cy.contains('blogs')
            cy.contains('Log Out')
        })
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#user-input').type('admin')
            cy.get('#password-input').type('wrongPassword')
            cy.get('#login-submit').click()
            cy.get('.error')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })

        describe('When logged in', function() {
            beforeEach(function() {
                // log in user here
                cy.login({ username: 'admin', password: 'StrongP@ss2' })
            })
            it('A blog can be created', function() {
                cy.contains('New Blog').click()
                cy.get('#title-input').type('Cypress Blog')
                cy.get('#author-input').type('Cypress Author')
                cy.get('#url-input').type('Cypress URL')
                cy.get('#blog-submit').click()
            })
        })
    })
})

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test Tester',
            username: 'tester',
            password: 'test123'
        }
        const secondUser = {
            name: 'Tester Two',
            username: 'tester2',
            password: 'test1234'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.request('POST', 'http://localhost:3003/api/users', secondUser)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('input:first').type('tester')
            cy.get('input:last').type('test123')
            cy.contains('login').click()

            cy.contains('logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('input:first').type('tester')
            cy.get('input:last').type('tester124')
            cy.contains('login').click()

            cy.contains('wrong credentials')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('input:first').type('tester')
            cy.get('input:last').type('test123')
            cy.contains('login').click()

            cy.contains('logged in')
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('input:first').type('new test blog')
            cy.get('#author').type('tester')
            cy.get('input:last').type('google.com')
            cy.contains('save new blog').click()

            cy.contains('new test blog')
        })
    })

    describe('View a blog', function() {
        beforeEach(function() {
            cy.get('input:first').type('tester')
            cy.get('input:last').type('test123')
            cy.contains('login').click()

            cy.contains('logged in')

            cy.contains('create new blog').click()
            cy.get('input:first').type('new test blog')
            cy.get('#author').type('tester')
            cy.get('input:last').type('google.com')
            cy.contains('save new blog').click()

            cy.contains('new test blog')
        })

        it('A blog can be liked', function() {
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('likes: 1')
            cy.contains('hide')
        })

        it('A blog can be deleted', function() {
            cy.contains('view').click()
            cy.contains('delete').click()
            cy.contains('new test blog').should('not.exist')
        })

        it('Only creator of blog sees delete button', function() {
            cy.contains('view').click()
            cy.contains('delete')

            cy.contains('logout').click()
            cy.contains('Log in to application')

            cy.get('input:first').type('tester2')
            cy.get('input:last').type('test1234')
            cy.contains('login').click()

            cy.contains('logged in')
            cy.contains('view').click()
            cy.get('delete').should('not.exist')
        })
    })

    describe('Blogs are sorted correctly', function() {
        beforeEach(function() {
            cy.get('input:first').type('tester')
            cy.get('input:last').type('test123')
            cy.contains('login').click()

            cy.contains('logged in')

            cy.contains('create new blog').click()
            cy.get('input:first').type('new test blog')
            cy.get('#author').type('tester')
            cy.get('input:last').type('google.com')
            cy.contains('save new blog').click()

            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('likes: 1')

            cy.contains('create new blog').click()
            cy.get('input:first').type('new test blog2')
            cy.get('#author').type('tester')
            cy.get('input:last').type('google.com')
            cy.contains('save new blog').click()

            cy.contains('view').click()
        })

        it('Blog with most likes is shown first', function() {
            cy.get('.blog').eq(0).should('contain', 'new test blog')
            cy.get('.blog').eq(1).should('contain', 'new test blog2')
        })
    })
})
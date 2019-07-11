describe('Bloglist', () => {

  const addBlog = () => {
    cy.get('[data-cy=homeLink]').click()

    cy.get('[data-cy=showAddBlogForm]')
      .click()
    cy.get('[data-cy=blogTitle]')
      .type('Blog added by Cypress')
    cy.get('[data-cy=blogAuthor]')
      .type('Cypress Tester')
    cy.get('[data-cy=blogUrl]')
      .type('www.fi')
    cy.get('[data-cy=submitBlog]')
      .click()
  }

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Joonas Partanen',
      username: 'jpartanen',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Bloglist')
  })

  it('login form loads', () => {
    cy.get('[data-cy=login]').contains('Login').click()
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.get('[data-cy=username]')
        .type('jpartanen')
      cy.get('[data-cy=password]')
        .type('salasana')
      cy.get('[data-cy=login]')
        .click()
    })

    it('username is shown', () => {
      cy.contains('jpartanen is logged in')
    })

    describe('testing blogs', () => {
      beforeEach(() => {
        addBlog()
      })

      it('a new blog can be added and a correct notification is shown', () => {
        cy.contains('The blog Blog added by Cypress by Cypress Tester was added to the list')
        cy.contains('Blog added by Cypress')
        cy.contains('Cypress Tester')
      })

      it('blog can be liked', () => {
        cy.get('[data-cy=likeButton]').contains('0 likes')
        cy.get('[data-cy=likeButton]').click()
        cy.get('[data-cy=likeButton]').contains('1 likes')
        cy.get('[data-cy=likeButton]').click()
        cy.get('[data-cy=likeButton]').contains('2 likes')
      })

      it('blog can be deleted', () => {
        cy.contains('Blog added by Cypress')
        cy.get('[data-cy=removeButton]')
          .click()
        cy.should('not.contain', 'Blog added by Cypress')
      })
    })

    describe('testing users view', () => {

      beforeEach(() => {
        cy.contains('Title')
        cy.contains('Author')
        cy.get('[data-cy=usersLink]').click()
      })

      it('users view is shown', () => {
        cy.contains('Joonas Partanen')
      })

      it('blogs added by user are counted', () => {
        cy.contains('Joonas Partanen')
        cy.get('[data-cy=addedBlogs]').contains('0')

        addBlog()

        cy.get('[data-cy=homeLink]').click()
        cy.get('[data-cy=usersLink]').click()
        cy.get('[data-cy=addedBlogs]').contains('1')
      })

      it('single user view is shown and new blog is shown', () => {
        cy.contains('Joonas Partanen').click()
        cy.get('[data-cy=singleUserView]').contains('Joonas Partanen')
        cy.get('[data-cy=singleUserView]').should('not.contain', 'Blog added by Cypress')

        addBlog()
        cy.get('[data-cy=homeLink]').click()
        cy.get('[data-cy=usersLink]').click()
        cy.contains('Joonas Partanen').click()
        cy.get('[data-cy=singleUserView]').contains('Blog added by Cypress')
      })
    })

    describe('testing comments', () => {

      beforeEach(() => {
        addBlog()
      })

      it('comments can be added', () => {
        cy.get('[data-cy=homeLink]').click()
        cy.get('[data-cy=addedBlogTitle]').click()
        cy.contains('Comments')
        cy.get('[data-cy=commentInput]').type('Hello, this is Cypress')
        cy.get('[data-cy=submitComment').click()
        cy.contains('Hello, this is Cypress')
      })
    })
  })





})
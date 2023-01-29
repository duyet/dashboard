/// <reference types="cypress" />

// check this file using TypeScript if available
// @ts-check

describe('index page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  it('displays main and have tabs', () => {
    cy.get('main').should('have.length', 1)

    // should have tabs
    cy.get('main ol li').first().should('have.length.gt', 0)

    // Should have "Overview" tab
    cy.get('main ol li').contains('Overview')

    // Should have "Events" tab
    cy.get('main ol li').contains('Events')
  })

  it('should navigate to the first tab', () => {
    cy.get('main ol li').first().click()

    // TODO: Should contains the dropdown
  })

  // Navigate to "Events" tab
  it('should navigate to the second tab', () => {
    cy.get('main ol li').eq(1).click()

    cy.get('main').then(($main) => {
      // Should contains the <table>
      // or sometime it error because github api rare-limited
      if ($main.find('table').length === 0) {
        $main.text().includes('API rate limit exceeded')
      } else {
        cy.get('table').should('have.length', 1)
      }
    })
  })
})

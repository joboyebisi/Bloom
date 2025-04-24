describe('Email Capture', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('/')
    
    // Intercept API calls
    cy.intercept('POST', '/api/submit-email', {
      statusCode: 200,
      body: {
        message: 'Email submitted successfully',
      },
    }).as('submitEmail')
  })

  it('should submit a valid email', () => {
    // Navigate to the participate page
    cy.contains('Participate').click()
    
    // Wait for the page to load
    cy.url().should('include', '/participate')
    
    // Click the "Participate in Research" button
    cy.contains('Participate in Research').click()
    
    // Check if the modal is displayed
    cy.contains('Join Our Research Study').should('be.visible')
    
    // Enter a valid email
    cy.get('input[type="email"]').type('test@example.com')
    
    // Click the submit button
    cy.contains('Submit').click()
    
    // Wait for the API call to complete
    cy.wait('@submitEmail')
    
    // Check if the success message is displayed
    cy.contains('Thank you for your interest').should('be.visible')
  })

  it('should handle invalid email', () => {
    // Navigate to the participate page
    cy.contains('Participate').click()
    
    // Wait for the page to load
    cy.url().should('include', '/participate')
    
    // Click the "Participate in Research" button
    cy.contains('Participate in Research').click()
    
    // Check if the modal is displayed
    cy.contains('Join Our Research Study').should('be.visible')
    
    // Enter an invalid email
    cy.get('input[type="email"]').type('invalid-email')
    
    // Click the submit button
    cy.contains('Submit').click()
    
    // Check if the error message is displayed
    cy.contains('Please enter a valid email address').should('be.visible')
  })

  it('should handle empty email', () => {
    // Navigate to the participate page
    cy.contains('Participate').click()
    
    // Wait for the page to load
    cy.url().should('include', '/participate')
    
    // Click the "Participate in Research" button
    cy.contains('Participate in Research').click()
    
    // Check if the modal is displayed
    cy.contains('Join Our Research Study').should('be.visible')
    
    // Click the submit button without entering an email
    cy.contains('Submit').click()
    
    // Check if the error message is displayed
    cy.contains('Email is required').should('be.visible')
  })
}) 
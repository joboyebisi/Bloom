describe('Image Upload and 3D Model Generation', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('/')
    
    // Intercept API calls
    cy.intercept('POST', '/api/generate-model', {
      statusCode: 200,
      body: {
        success: true,
        modelUrl: 'https://example.com/model.glb',
        message: '3D model generated successfully',
      },
    }).as('generateModel')
    
    cy.intercept('GET', 'https://example.com/model.glb', {
      statusCode: 200,
      body: new Blob(['test'], { type: 'model/gltf-binary' }),
    }).as('downloadModel')
  })

  it('should upload an image and generate a 3D model', () => {
    // Navigate to the participate page
    cy.contains('Participate').click()
    
    // Wait for the page to load
    cy.url().should('include', '/participate')
    
    // Find the file input and upload an image
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('fake-image-content'),
      fileName: 'test-image.png',
      mimeType: 'image/png',
    })
    
    // Check if the image preview is displayed
    cy.get('img[alt="Selected dental image"]').should('be.visible')
    
    // Click the generate button
    cy.contains('Generate 3D Dental Model').click()
    
    // Wait for the API call to complete
    cy.wait('@generateModel')
    
    // Check if the loading state is displayed
    cy.contains('Generating 3D Model...').should('be.visible')
    
    // Wait for the 3D model to be displayed
    cy.get('canvas').should('be.visible')
    
    // Check if the download button is displayed
    cy.contains('Download 3D Model').should('be.visible')
    
    // Click the download button
    cy.contains('Download 3D Model').click()
    
    // Wait for the download API call to complete
    cy.wait('@downloadModel')
  })

  it('should handle invalid file type', () => {
    // Navigate to the participate page
    cy.contains('Participate').click()
    
    // Wait for the page to load
    cy.url().should('include', '/participate')
    
    // Find the file input and upload an invalid file
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('fake-file-content'),
      fileName: 'test-file.txt',
      mimeType: 'text/plain',
    })
    
    // Check if the error message is displayed
    cy.contains('Please upload an image file').should('be.visible')
  })

  it('should handle file size limit', () => {
    // Navigate to the participate page
    cy.contains('Participate').click()
    
    // Wait for the page to load
    cy.url().should('include', '/participate')
    
    // Create a large file (6MB)
    const largeFile = new Uint8Array(6 * 1024 * 1024).fill(0)
    
    // Find the file input and upload a large file
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from(largeFile),
      fileName: 'large-image.png',
      mimeType: 'image/png',
    })
    
    // Check if the error message is displayed
    cy.contains('File size too large').should('be.visible')
  })
}) 
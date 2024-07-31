// cypress/e2e/combined.cy.js

describe('User Flow from Login to Dashboard', () => {
  beforeEach(() => {
    // Augmentez le délai d'attente par défaut à 10000 ms pour toutes les commandes
    Cypress.config('defaultCommandTimeout', 10000);
  });

  it('should login and navigate to dashboard', () => {
    // Visitez la page de login
    cy.visit('/login');

    // Vérifiez que la page de login est chargée
    cy.url().should('include', '/login');
    cy.get('#loginFormEmailInput').should('exist'); // Corrigez le sélecteur
    cy.get('#loginFormPasswordInput').should('exist'); // Corrigez le sélecteur
    cy.get('#loginFormSubmitButton').should('exist'); // Corrigez le sélecteur

    // Remplissez le formulaire de login et soumettez-le
    cy.get('#loginFormEmailInput').type('user@example.com');
    cy.get('#loginFormPasswordInput').type('password123');
    cy.get('#loginFormSubmitButton').click();

    // Vérifiez la redirection vers le dashboard
    cy.url().should('include', '/dashboard');

    // Vérifiez que la page de dashboard est chargée
    cy.contains('Add User').should('be.visible');
  });

  it('should add a user and remove all users', () => {
    // Visitez la page de dashboard après s'être connecté
    cy.visit('/dashboard');

    // Remplissez le formulaire d'ajout d'utilisateur et soumettez-le
    cy.get('#firstName').should('be.visible').type('John');
    cy.get('#lastName').should('be.visible').type('Doe');
    cy.get('#mobileNumber').should('be.visible').type('1234567890');
    cy.get('button[type="submit"]').should('be.visible').click();

    // Attendez 2 secondes pour que la liste des utilisateurs se mette à jour
    cy.wait(2000);

    // Vérifiez que les valeurs sont affichées dans la liste des utilisateurs
    cy.contains('John').should('be.visible');
    cy.contains('Doe').should('be.visible');

    // Cliquez sur le bouton "Remove all"
    cy.get('button.btn-danger').should('be.visible').click();

    // Vérifiez que la liste des utilisateurs est vide
    cy.get('table tbody tr').should('have.length', 0);
  });
});

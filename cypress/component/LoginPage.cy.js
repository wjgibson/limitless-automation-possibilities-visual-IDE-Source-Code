import React from 'react';
import LoginPage from '../../src/App/LoginPage';

describe('LoginPage', () => {
  let server;

  beforeEach(() => {
    cy.intercept('http://localhost:3001/getLoginData', { 
      fixture: 'loginData.json' 
    }).as('loginData');
    cy.mount(<LoginPage />);
    cy.wait('@loginData');
  });

  it('displays the login form', () => {
    cy.get('form[name="loginForm"]').should('be.visible');
  });

  it('allows the user to enter their credentials', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/main');
  });

  it('displays an error message for incorrect credentials', () => {
    cy.intercept('GET', '/getLoginData*').as('loginData');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginData');
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Username or password is incorrect');
    });
  });
});
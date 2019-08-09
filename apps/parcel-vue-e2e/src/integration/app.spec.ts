import { getGreeting } from '../support/app.po';

describe('parcel-vue', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to parcel-vue!');
  });
});

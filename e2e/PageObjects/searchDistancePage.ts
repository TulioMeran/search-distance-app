export default class SearchDistancePage {
  visit(url: string) {
    cy.visit(url);
  }

  click(element: string) {
    cy.get(element).click();
  }

  type(element: string, text: string) {
    cy.wait(1000);
    cy.get(element).type(text);
  }

  checkStatusOfSearch(isDisabled: boolean) {
    if (isDisabled) {
      cy.get('button').should('be.disabled');
    } else {
      cy.get('button').should('not.be.disabled');
    }
  }

  checkElementIsVisible(element: string) {
    cy.wait(2000);
    cy.get(element).should('be.visible');
  }
}

describe('Hotel edit specs', () => {
  it('should navigate to second hotel when click on edit second hotel', () => {
    // Arrange
    // Act
    cy.loadAndVisit('/api/hotels', '/hotel-collection');
    cy.findAllByRole('button', { name: 'Edit hotel' }).then((buttons) => {
      buttons[1].click();
    });

    // Assert
    cy.url().should('eq', 'http://localhost:8080/#/hotel-edit/2');
  });

  it('should update hotel name when it edits an hotel and click on save button', () => {
    // Arrange
    // Act
    cy.loadAndVisit('/api/hotels', '/hotel-collection');
    cy.intercept('GET', '/api/hotels/2').as('loadHotel');
    cy.intercept('GET', '/api/cities').as('loadCities');
    cy.findAllByRole('button', { name: 'Edit hotel' }).then((buttons) => {
      buttons[1].click();
    });

    cy.wait('@loadHotel');
    cy.wait('@loadCities');

    cy.findByLabelText('Name').clear().type('Updated hotel two');
    cy.findByRole('button', { name: 'Save' }).click();

    // Assert
    cy.wait('@load')
    cy.findByText('Updated hotel two');
  });
});

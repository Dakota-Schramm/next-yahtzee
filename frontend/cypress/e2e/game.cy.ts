describe('Game', () => {
  it('should navigate to the page', () => {
    cy.visit('localhost:3000/game')
      .get('header h1')
      .should('have.text', 'Yahtzee!')
  })
  it('')
})

describe('Game - End of Game', () => {
  it('On end of game, footer should have play again button', () => {
    cy.visit('localhost:3000/game')
      .get('footer')
      .should('have.text', 'Play Again')
  })
})

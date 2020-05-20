export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const SAVE_QUIZ_RESULT = 'SAVE_QUIZ_RESULT'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS, 
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK, 
    deck,
  }
}

export function deleteDeck (deckId) {
  return {
    type: DELETE_DECK, 
    deckId
  }
}

export function addCard (deckId, card) {
  return {
    type: ADD_CARD, 
    deckId,
    card
  }
}

export function saveQuizResult (deckId, quiz) {
  return {
    type: SAVE_QUIZ_RESULT, 
    deckId, 
    quiz
  }
}
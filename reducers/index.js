import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD, SAVE_QUIZ_RESULT } from '../actions'

function decks (state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS : 
      return {
        ...state, 
        ...action.decks
      }
    case ADD_DECK : 
      return {
        ...state, 
        ...action.deck
      }
    case DELETE_DECK : 
      delete state[action.deckId];
      return {
        ...state, 
      }
    case ADD_CARD : 
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId], 
          questions: [action.card, ...state[action.deckId].questions]
        }
      }
    case SAVE_QUIZ_RESULT : 
      return {
        ...state, 
        [action.deckId]: {
          ...state[action.deckId], 
          quizzes: [action.quiz, ...state[action.deckId].quizzes]
        }
      }
    default: 
      return state
  }
}

export default decks
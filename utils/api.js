import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'FLashCardsIO:deck'

export async function fetchDeckResults () {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  return JSON.parse(results)
}

export function submitDeck ({ deckId, deck }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [deckId]: deck
  }))
}

export async function removeDeck (deckId) {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  const data = JSON.parse(results)
  data[deckId] = undefined
  delete data[deckId]
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
}

export async function submitCard ({ deckId, card }) {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  const data = JSON.parse(results)
  const deck = data[deckId]
  deck.questions.unshift(card)
  const updatedDeck = {[deckId]: deck}

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDeck))
}

export async function submitQuiz ({ deckId, quiz }) {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  const data = JSON.parse(results)
  const deck = data[deckId]
  deck.quizzes.unshift(quiz)
  const updatedDeck = {[deckId]: deck}

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(updatedDeck))
}
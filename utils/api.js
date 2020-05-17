import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'FLashCardsIO:deck'
export const QUIZ_STORAGE_KEY = 'FLashCardsIO:quiz'

export async function fetchDeckResults () {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  return JSON.parse(results)
}

export function submitDeck ({ key, deck }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export async function removeDeck (key) {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY)
  const data = JSON.parse(results)
  data[key] = undefined
  delete data[key]
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
}


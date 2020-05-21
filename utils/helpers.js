import { AsyncStorage } from "react-native";
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'FlashCardsIO:notifications'


export function shuffle (array) {
  var newArray = [...array]
  var m = newArray.length, t, i;
  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = newArray[m];
    newArray[m] = newArray[i];
    newArray[i] = t;
  }

  return newArray;
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
  }

function createNotification () {
  return {
    title: 'Take a Quiz!', 
    body: "📚Don't forget to study for today!", 
    ios: {
      sound: true, 
    }, 
    android: {
      sound: true, 
      priority: 'high', 
      sticky: false, 
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              tomorrow.setSeconds(0)
              
              Notifications.scheduleLocalNotificationAsync(
                createNotification(), 
                {
                  time: tomorrow, 
                  repeat: 'day', 
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
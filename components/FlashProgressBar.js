import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { lightPurple, primaryColor, white } from '../utils/colors'
import { Caption, ProgressBar } from 'react-native-paper'


export default function FlashProgressBar ({ progress }) {
  return (
    <View style={styles.container}>
      <Caption style={styles.caption}>0%</Caption>
      <View style={{ flex: 1 }}>
        <ProgressBar style={{height: 25, borderRadius: 10}} progress={ progress } color={lightPurple} />
        <View style={styles.labelContainer}>
          <Text style={{color: white, fontWeight: 'bold'}}>{(progress * 100).toFixed(1) + '%'}</Text>
        </View>
      </View>
      <Caption style={styles.caption}>100%</Caption>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    padding: 10, 
    alignItems: 'center', 
    justifyContent: 'space-around'
  }, 
  caption: {
    margin: 20, 
    color: primaryColor
  },
  labelContainer: {
    position: 'absolute', 
    left: 0, 
    top: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})
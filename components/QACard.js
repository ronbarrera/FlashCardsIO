import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native'
import { Surface, Paragraph, Caption } from 'react-native-paper'
import { white, lightPurple, primaryColor } from '../utils/colors'
import { MaterialCommunityIcons } from "@expo/vector-icons"

class QACard extends Component {
  render() {
    const { card } = this.props

    return (
      <Surface style={styles.container}>  
        <View style={styles.content}>
          <Caption style={{color: primaryColor}}>Question</Caption>
          <Paragraph >{card.question}</Paragraph>
          <Caption style={{color: primaryColor, paddingTop: 15}}>Answer</Caption>
          <Paragraph style={{fontWeight: 'bold'}}>{card.answer}</Paragraph>
        </View>
    </Surface>
    )
  }
}

export default QACard

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: white, 
    borderRadius: 20, 
    shadowRadius: 3,  
    shadowOpacity: 0.8, 
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    elevation: 4
  }, 
  content: {
    padding: 20
  }, 
})
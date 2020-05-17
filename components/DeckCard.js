import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Surface, Title, Caption } from 'react-native-paper'
import { white, lightPurple } from '../utils/colors'
import { MaterialCommunityIcons } from "@expo/vector-icons"

class DeckCard extends Component {
  render() {
    const { deck, navigation } = this.props
    const cards = deck.questions.length

    return (
      <Surface style={styles.container}>  
        <TouchableOpacity style={{flexDirection: 'row'}}  onPress={() => navigation.navigate(
          'DeckDetail', 
          { deckId: deck.title }

        )}>
        <View style={styles.content}>
          <MaterialCommunityIcons name="library-books" size={15} color={lightPurple} />
          <View style={{padding: 10}}>
            <Title>{deck.title}</Title>
            <Caption>{cards} cards</Caption>
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
    )
  }
}

export default DeckCard

const styles = StyleSheet.create({
  container: {
    flex: 1/2, 
    flexDirection: 'column', 
    margin: 10,
    paddingTop: 15, 
    paddingBottom: 15,
    backgroundColor: white, 
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
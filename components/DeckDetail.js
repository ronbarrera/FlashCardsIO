import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import { white } from '../utils/colors'
import { deleteDeck } from '../actions'
import { removeDeck } from '../utils/api'


class DeckDetail extends Component {

  componentDidMount() {
    const {deckId, deck } = this.props
    this.props.navigation.setOptions({
      title: `${deckId} Deck`, 
      headerRight: () => (
        <Button
          case={false} 
          color={white}
          icon="delete"
          mode="text" 
          onPress={this.deleteAlert}
          title="Delete Deck"
        >
          Deck
        </Button>
      )
    });
  }

  deleteAlert = () => {
    Alert.alert(
      "Delete Deck",
      "Are you sure you want to delete the deck and questions?",
      [{
        text: "Cancel",
        onPress: () => console.log("Cancel delete"),
        style: "cancel"
        },
        { text: "Delete", onPress: this.deleteDeck }
      ],
      { cancelable: true }
    )
  }

  deleteDeck = () => {
    const { goBack, remove, deckId } = this.props
    remove()
    goBack()
    removeDeck(deckId)
  }

  render() {
    return (
      <Text>
        DeckDetail
      </Text>
    )
  }
}

function mapStateToProps (state, { route }) {
  const { deckId } = route.params
  return {
    deckId, 
    deck: state[deckId], 
  }
}

function mapDispatchToProps (dispatch, { route, navigation }) {
  const { deckId } = route.params

  return {
    remove: () => dispatch(deleteDeck(deckId)), 
    goBack: () => navigation.goBack()
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(DeckDetail)
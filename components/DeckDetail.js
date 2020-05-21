import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Alert, Image, FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import { white, primaryColor } from '../utils/colors'
import { deleteDeck } from '../actions'
import { removeDeck } from '../utils/api'
import { FAB, Chip, Title, Paragraph } from 'react-native-paper'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AddCard from './AddCard'
import QACard from './QACard'

class DeckDetail extends Component {

  state = {
    modalVisible: false, 
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    const {deckId } = this.props
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

  shouldComponentUpdate (nextProps) {
    return nextProps.deck !== null && nextProps.deck !== undefined
  }

  deleteAlert = () => {
    Alert.alert(
      "Delete Deck",
      "Are you sure you want to delete the deck and questions?",
      [{
        text: "Cancel",
        style: "cancel"
        },
        { text: "Delete", onPress: this.deleteDeck }
      ],
      { cancelable: true }
    )
  }

  deleteDeck = () => {
    const { goBack, remove, deckId } = this.props
    goBack()
    remove()
    removeDeck(deckId)
  }

  handleTakeQuiz = () => {
    this.props.navigation.navigate(
      'Quiz', 
      { deckId: this.props.deckId }
    )
  }

  render() {
    const { deckId, deck } = this.props
    const { modalVisible } = this.state
    const quizzes = deck.quizzes
    const lastScore = quizzes.length === 0 ? "No Quiz Taken " : ((quizzes[0].score) * 100 + '%')

    return (
      <View style={styles.container}>

      {deck.questions.length === 0 ? 
        <View style={styles.emptyContainer}>
          <Image
            style={styles.cardImage}
            source={require('../assets/card.png')}
          />
          <Title style={{fontWeight: 'bold', padding:10}}>No Cards Yet!</Title>
          <Paragraph style={{padding: 5}}>Once you add Cards, you'll see them here. </Paragraph>
          <Button 
            uppercase={false} 
            mode="text" 
            onPress={() => {this.setModalVisible(true)}}
            >
              Add Card
          </Button>
        </View>
        : 
        <FlatList
          contentContainerStyle={{paddingBottom: 50}}
          data={deck.questions}
          renderItem={({item, index}) => <QACard card={item} index={index}/>}
          keyExtractor={(item, index) => index.toString()}
          numColumns={1} 
          // onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <Chip style={styles.chipStyle} icon="card-text">{deck.questions.length} cards</Chip>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
              <Chip style={styles.chipStyle} >Last Quiz: {lastScore}</Chip>
              <Chip style={styles.chipStyle} icon="cursor-default-click" onPress={this.handleTakeQuiz}>Take Quiz</Chip>
            </View>
          </View>}
        /> 
      }
        <FAB
          onPress={() => {this.setModalVisible(true)}}
          style={styles.fab}
          icon={({ size, color }) => (<MaterialCommunityIcons name="plus" size={size} color={color}/>)}
          />
        <AddCard deckId={deckId} setModalVisible={this.setModalVisible} modalVisible={modalVisible} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: primaryColor,
  }, 
  chipStyle: {
    backgroundColor: white,
    color: primaryColor
  }, 
  cardImage: {
    height: 200,
    width: 200
  }, 
  emptyContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

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


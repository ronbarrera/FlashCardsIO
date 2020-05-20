import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Picker, StyleSheet, Image } from 'react-native'
import { primaryColor } from '../utils/colors'
import { Headline, Title, Paragraph, Button } from 'react-native-paper'
import FlashProgressBar from './FlashProgressBar'

class QuizTab extends Component {
  state = {
    index: 0,
  }

  handleTakeQuiz = (deckId) => {
    this.props.navigation.navigate(
      'Quiz', 
      { deckId: deckId}
    )
  }

  render() {
    const { index } = this.state
    const  { decks, navigation }  = this.props

    if (decks.length === 0)
      return (
        <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.headerText}>My Stats</Text>
        </View>
        <View style={styles.emptyContainer}>
            <Image
              style={styles.statsImage}
              source={require('../assets/stats.png')}
            />
            <Title style={{fontWeight: 'bold', padding:10}}>No Decks Yet!</Title>
            <Paragraph style={{padding: 5}}>No data saved. Start adding your flashcards 📓 </Paragraph>
            <Button 
              uppercase={false} 
              mode="text" 
              // onPress={() => {this.setModalVisible(true)}}
              onPress={() => navigation.navigate(
                'DeckTab', 
              )}
              >
                Go to My Deck
            </Button>
          </View>
        </View>
      )

    const quizzes = decks[index].quizzes
    const numQuizzes = quizzes.length
    let highestScore = 0
    let lowestScore = 0
    let average = 0

    if (numQuizzes > 0) {
       highestScore = Math.max.apply(Math, quizzes.map((quiz) => { return quiz.score }))
       lowestScore = Math.min.apply(Math, quizzes.map((quiz) => { return quiz.score }))
       average = quizzes.reduce((a, b) => ({score: a.score + b.score})).score / numQuizzes
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.headerText}>My Stats</Text>
        </View>
        <View style={styles.content}>
          <Headline style={{alignSelf: 'center'}}>Choose Your Deck</Headline>
          <Picker
            style={{margin: 20}}
            selectedValue={decks[index].title}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({index: itemIndex})
            }>
            {decks.map((deck, index) =>
              <Picker.Item label={deck.title} key={index} value={deck.title} /> )}
          </Picker>
          <View >
            <Title style={{alignSelf: 'center'}}>{numQuizzes} Quiz Taken</Title>
            <Title>Highest Score</Title>
            <FlashProgressBar progress={highestScore} />
            <Title>Lowest Score</Title>
            <FlashProgressBar progress={lowestScore} />
            <Title>Avergare Score</Title>
            <FlashProgressBar progress={average} />
          </View>
          <Button style={{margin: 20}} onPress={() => this.handleTakeQuiz(decks[index].title)}>Take New Quiz</Button>
        </View>   
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -75,
    padding: 20
  },
  toolbar: {
    alignItems: 'center',
    margin: 5,
    marginLeft: 10, 
    marginRight: 10,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 25, 
    fontFamily: Platform.OS === 'ios' ? "System": "Roboto", 
    fontWeight: 'bold',
    color: primaryColor
  },
  statsImage: {
    height: 200,
    width: 200
  }, 
  emptyContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

function mapStateToProps (decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(mapStateToProps)(QuizTab)
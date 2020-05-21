import React, { Component } from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { saveQuizResult } from '../actions'
import { 
  shuffle,   
  clearLocalNotification, 
  setLocalNotification  
} from '../utils/helpers'
import { Title, Paragraph, Button, Caption, Chip } from 'react-native-paper'
import { primaryColor, red, green } from '../utils/colors'
import QuizCard from './QuizCard'
import { submitQuiz } from '../utils/api'
import FlashProgressBar from './FlashProgressBar'


class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0, 
      correct: 0, 
      total: this.props.deck.questions.length,
      startTime: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page === this.state.total) 
      this.handleSave()
  }
  
  startPageUI() {
   return (
    <View style={styles.startPageContainer}>
      <Title style={{fontWeight: 'bold'}}>{this.props.deck.title} Deck Quiz</Title>
      <Image
        style={styles.quizImage}
        source={require('../assets/quiz.png')}
      />
      <Paragraph>Get ready to start the quiz. There are {this.state.total} questions.</Paragraph>
      <Caption style={{padding: 20, marginStart: 25, marginEnd: 25, textAlign:'center'}}>Questions will be shown randomly. </Caption>
      <Button 
        color={primaryColor} 
        style={styles.button}
        mode="contained" 
        onPress={() => {
          this.setState((currentState) => ({
            page: currentState.page + 1, 
            startTime: Date.now(),
        }))}}>
        Start Quiz
      </Button>
    </View>
   )}

  questionPageUI() {
    const { page, correct, total } = this.state
    const { questions } = this.props
    
    return (
      <View style={styles.questionPageContainer}>
        <View style={styles.chipContainer}>        
          <Chip textStyle={{fontSize: 15, padding: 10, color: primaryColor, fontWeight: 'bold'}} >Score: {correct}/{total}</Chip>
        </View>
        <QuizCard question={questions[page-1]} index={page}/>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <Button
            style={styles.button}
            color={red}
            mode="contained"
            icon="close"
            labelStyle={styles.buttonLabel}
            onPress={() => {
              this.setState((currentState) => ({
                page: currentState.page + 1, 
            }))}}>
            Incorrect
          </Button>
          <Button
            style={styles.button}
            color={green}
            dark
            mode="contained"
            icon="check"
            labelStyle={styles.buttonLabel}
            onPress={this.submitCorrect}
          > Correct</Button>
        </View>
     </View>
    )
  }

  endPageUI() {
    const {total, correct } = this.state
    const { deckId } = this.props

    return (
      <View style={styles.endPageContainer}>
        <View style={{alignItems: 'center', margin: 10}}>
          <Title style={{fontWeight: 'bold', padding: 20}}>Result</Title>
          <Paragraph>You have completed the quiz for the <Text style={{fontWeight: 'bold'}}>{deckId}</Text> deck.</Paragraph>
          <Paragraph>You have answers {correct} out of {total}</Paragraph>
        </View>
        <FlashProgressBar progress={parseFloat((correct/total).toFixed(1))} />
        <View/>
        <View style={{margin: 20}}>
          <Button  color={primaryColor} style={styles.button} mode="contained" onPress={this.handleTryAgain}>
            Try Again
          </Button>
          <Button color={primaryColor} style={styles.button} onPress={this.handleBack}>
            Back
          </Button>
        </View>
      </View>
    )
  }

  handleSave = () => {
    const {total, correct, startTime } = this.state
    const { deckId } = this.props
    const score = parseFloat((correct/total).toFixed(1))
    const quiz = {
      time: startTime, 
      score: score
    }
    this.props.dispatch(saveQuizResult(deckId, quiz))
    submitQuiz({deckId, quiz})

    clearLocalNotification().then(setLocalNotification)
  }

  handleTryAgain = () => {
    const { deckId, navigation } = this.props
    this.setState({
      page: 1, 
      correct: 0, 
      total: this.props.deck.questions.length,
      startTime: Date.now()
    })
    navigation.navigate('Quiz', {
      deckId: deckId
    })
  }

  handleBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  submitCorrect = () => {
    this.setState((currentState) => ({
      page: currentState.page + 1, 
      correct: currentState.correct + 1,
  }))}

  render() {
    const { page, total } = this.state
    return (
      <View style={styles.container}>
       { page === 0 ? this.startPageUI() : page === total + 1 ? this.endPageUI() : this.questionPageUI()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quizImage: {
    height: 150,
    width: 150, 
    margin: 20
  }, 
  startPageContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: -30
  },
  questionPageContainer: {
    flex: 1,
  },
  endPageContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 5,
    margin: 5,
    fontWeight: 'bold', 

  },
  buttonLabel: {
    fontSize: 20
  }, 
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 20,
  }
})

function mapStateToProps (state, { route }) {
  const { deckId } = route.params
  const questions = shuffle(state[deckId].questions)
  return {
    deckId, 
    deck: state[deckId],
    questions: questions
  }
}
export default connect(mapStateToProps)(Quiz)
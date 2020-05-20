import React, { Component } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import CardFlip from 'react-native-card-flip'
import { Surface, Headline, Caption, Button } from 'react-native-paper'
import { primaryColor, white } from '../utils/colors'

class QuizCard extends Component {

  state = {
    isFront: true,
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    this.props.index === 1 && this.card.jiggle({ count: 2, duration: 80, progress: 0.01 })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.question !== this.props.question && !this.state.isFront) {
      this.flipCard()
    }
  }

  flipCard = () => {
    const { isFront, opacity } = this.state
    if (isFront)
      Animated.timing(opacity, { toValue: 1, duration: 2000, useNativeDriver: true }).start()
    else 
      this.setState({opacity: new Animated.Value(0)})
    this.card.flip()
  }

  setIsFront(e) {
    this.setState({isFront: e === 0})
  }

  render() {
    const { question, index } = this.props
    const { opacity } = this.state

    return (
      <View style={{flex: 1}}>
        <CardFlip 
          style={styles.cardContainer} 
          ref={card => (this.card = card)}
          onFlip={(e) => this.setIsFront(e)}
          flipZoom={0.07}>
        
          <Surface style={styles.container}>  
            <Caption style={styles.headerText}>Question {index}</Caption>
            <View style={styles.content}>
              <Headline style={styles.mainText}>{question.question}</Headline>
            </View>
            <Button 
                style={styles.flipButtom}
                icon="flip-to-back"
                onPress={this.flipCard}>
                See Answer
              </Button>
        </Surface>
        <Surface style={styles.container}>  
            <Caption style={styles.headerText}>Answer</Caption> 
            <Animated.View style={[styles.content, { opacity }]}>
              <Headline style={styles.mainText}>{question.answer}</Headline>
            </Animated.View>
            <Button 
                style={styles.flipButtom}
                icon="flip-to-front"
                onPress={this.flipCard}>
                See Question
              </Button>
        </Surface>
      </CardFlip>
    </View>
    )
  }
}

const styles = StyleSheet.create({

  cardContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'

  },
  container: {
    flex: 1,
    margin: 20,
    padding: 20,
    justifyContent: 'center', 
    alignItems: 'center',
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
    padding: 10, 
    justifyContent: 'center', 
    alignItems: 'center',
  }, 
  flipButtom: {
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    margin: 5,
  }, 
  headerText: {
    position: 'absolute', 
    top: 0, 
    left: 0,
    fontSize: 15,
    margin: 15,
    padding: 15,
    color: primaryColor, 
    textDecorationLine: 'underline'
  },
  mainText: {
    fontSize: 30, 
    fontWeight: 'bold',
    lineHeight: 40,
  }
})

export default QuizCard
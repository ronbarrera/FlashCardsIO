import React, { Component } from 'react'
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { red, lightPurple } from '../utils/colors'

  class Test extends Component {
    constructor(props) {
      super(props)
      this.isVisible = true
      this.ball = new Animated.Value(0)
  }

  moveBall = () => {
      this.isVisible = !this.isVisible
      console.log(this.isVisible)
      console.log(this.ball)
      Animated.timing(this.ball, {
          toValue: this.isVisible ? 1 : 0,
          duration: 500,
          useNativeDriver: true
      }).start()

  }


  render() {
    const xVal = this.ball.interpolate({
        inputRange: [0, 1],
            outputRange: [0, 250]
    });

    const yVal = this.ball.interpolate({
        inputRange: [0, 1],
            outputRange: [0, 100]
    })

    const animStyle = {
      transform: [{
        translateY:  yVal
      }]
    }


    return (
      <View style={styles.container}>
       <Animated.View style={[styles.ball, animStyle]}>
          <Text style={styles.text}>+</Text>
      </Animated.View>
          <TouchableOpacity onPress={this.moveBall}>
             <Text>Press</Text>
          </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightPurple,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  ball: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      margin: 200,
      borderRadius: 30,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
  },
  text: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 32
  }
})

export default Test
import React, { useState, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native"
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { primaryColor } from "../utils/colors";
import { Title, TextInput, Button, IconButton } from 'react-native-paper';
import { submitCard } from '../utils/api'


const AddCard = (props) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const { modalVisible, setModalVisible } = props

  function closeModal() {
    setQuestion('')
    setAnswer('')
    setModalVisible(false)
  }

  function handleSubmit() {
    const deckId = props.deckId
    const card = {
      question: question, 
      answer: answer
    }
    props.dispatch(addCard(deckId, card))
    submitCard({ deckId, card })
    closeModal()
  }

  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => closeModal()}
    >
      <KeyboardAvoidingView       
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.centeredView}>
        <View style={styles.modalView}>
          <IconButton
            style={styles.closeIcon}
            icon="close"
            color={primaryColor}
            size={25}
            onPress={() => closeModal()}
          />
          <Title style={styles.titleStyle}>Enter the Q&A for your Card</Title>
            <TextInput
              mode='outlined'
              label='Question'
              multiline={false}
              value={question}
              onChangeText={text => setQuestion(text)}
            />
             <TextInput
              mode='outlined'
              label='Answer'
              multiline={false}
              value={answer}
              onChangeText={text => setAnswer(text)}
            />
            <Button color={primaryColor} style={styles.createButton} disabled={question === ''  || answer === ''? true : false} mode="contained" onPress={() => handleSubmit()}>
              Add Card
            </Button>
          </View>
        </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 30,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  createButton: {
    borderRadius: 20,
    marginTop: 20,
    padding: 5,
  },
  closeIcon: {
    alignSelf: 'flex-end', 
    marginTop: -10,
    marginEnd: -10, 
    marginBottom: -10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center', 
    fontSize: 20
  }, 
  titleStyle: {
    paddingBottom: 25, 
    alignSelf: 'center'
  }
})

export default connect()(AddCard)
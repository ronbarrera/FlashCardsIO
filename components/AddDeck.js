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
import { addDeck } from '../actions'
import { primaryColor } from "../utils/colors";
import { Title, TextInput, Button, IconButton } from 'react-native-paper';
import { submitDeck, fetchDeckResults } from '../utils/api'


const AddDeck = (props) => {
  const [value, setValue] = useState({text: ''});
  const { modalVisible, setModalVisible, handleSubmitDeck } = props

  function closeModal() {
    setValue({ text: '' })
    setModalVisible(false)
  }

  function handleSubmit() {
    // Create Empty Deck
    const key = value.text.trim()
    const deck = {
      title: key, 
      created: Date.now(), 
      questions: []
    }

     // Update Redux
     props.dispatch(addDeck({
      [key]: deck
    }))
  
    // Add AsyncStorage
    submitDeck({ key, deck })
    
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
          <Title style={styles.titleStyle}>Enter title of your new Deck</Title>
            <TextInput
            autoFocus={true}
              mode='outlined'
              label='Title'
              value={value.text}
              onChangeText={text => setValue({ text })}
            />
            <Button color={primaryColor} style={styles.createButton} disabled={value.text === "" ? true : false} mode="contained" onPress={() => handleSubmit()}>
              Create Desk
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
    padding: 10,
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

export default connect()(AddDeck)
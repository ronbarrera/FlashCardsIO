import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, FlatList, Platform, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { FAB, Title, Paragraph, Button, Menu, Divider, Provider, RadioButton } from 'react-native-paper'
import { primaryColor, white, lightGray, lightPurple } from '../utils/colors'
import DeckCard from './DeckCard'
import AddDeck from './AddDeck'
import { fetchDeckResults } from '../utils/api'


class Deck extends Component {
  state = {
    visible: false,
    filterBy: 'Recent',
    modalVisible: false, 
    loading: true,
  }

  componentDidMount() {
    const { dispatch } = this.props
    fetchDeckResults()
      .then((decks) =>  {
        dispatch(receiveDecks(decks))})
      .then(() => this.setState({loading: false}))
  }

  _openMenu = () => this.setState({ visible: true });
  _closeMenu = () => this.setState({ visible: false });

  handleFilterBy(filterBy)  {
    this.setState({filterBy})
    this._closeMenu()
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const  { decks }  = this.props
    const { filterBy, modalVisible, loading } = this.state

    if (loading === true) {
      return <ActivityIndicator style={{marginTop: 50}} />
    }
    return (
      <Provider>
        <View style={styles.container}>

        {decks.length === 0 
        ? <View style={styles.emptyContainer}>
            <Image
              style={styles.cardsImage}
              source={require('../assets/flashcards.png')}
            />
            <Title style={{fontWeight: 'bold', padding:10}}>No Decks Yet!</Title>
            <Paragraph style={{padding: 5}}>Once you add a Deck, you'll see them here. </Paragraph>
            <Button 
              uppercase={false} 
              mode="text" 
              onPress={() => {this.setModalVisible(true)}}
              >
                Add Deck
            </Button>
          </View>
        : <FlatList
            data={decks}
            renderItem={({item, index}) => <DeckCard navigation={this.props.navigation} deck={item} index={index}/>}
            keyExtractor={item => item.title}
            numColumns={2} 
          /> 
        }

        <View style={styles.toolbar}>
          <Text style={styles.titleText}>My Deck</Text>
          <Menu
            visible={this.state.visible}
            onDismiss={this._closeMenu}
            anchor={<Button 
                      color={primaryColor}
                      onPress={this._openMenu} 
                      icon={({ size, color }) => (<MaterialCommunityIcons name="filter-variant" size={size} color={color}/>)}
                    >
                        {filterBy}
                    </Button>
            }>
               <RadioButton.Group
                onValueChange={value => this.handleFilterBy(value)}
                value={filterBy} >
                <RadioButton.Item label="Recent" value="Recent" />
                <RadioButton.Item label="Oldest" value="Oldest" /> 
                <RadioButton.Item label="Highest" value="Highest" /> 
                <RadioButton.Item label="Lowest" value="Lowest" /> 

              </RadioButton.Group>
            </Menu>
          </View>
        <FAB
          onPress={() => {this.setModalVisible(true)}}
          style={[styles.fab, { opacity: decks.length === 0 ? 0 : 1 }]}
          icon={({ size, color }) => (<MaterialCommunityIcons name="library-plus" size={size} color={color}/>)}
          />
        </View>
        <AddDeck setModalVisible={this.setModalVisible} modalVisible={modalVisible} />
      </Provider>

    )
  }
}

function mapStateToProps (decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25, 
    fontFamily: Platform.OS === 'ios' ? "System": "Roboto", 
    fontWeight: 'bold',
    color: primaryColor
  },
  container: {
    flex: 1,
    flexDirection: 'column-reverse'
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: primaryColor
  }, 
  header: {
    position: 'absolute', 
    top: 0, 
    alignSelf: 'center',
    margin: 16,
    padding: 10,
    paddingStart: 25,
    paddingEnd: 25,
    borderRadius: 25,
    backgroundColor: primaryColor, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 20
  }, 
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardsImage: {
    height: 200,
    width: 200
  }, 
  emptyContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});


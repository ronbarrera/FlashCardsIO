import React from 'react'
import { View, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import DeckDetail from './components/DeckDetail'
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { primaryColor, white, lightGray, lightPurple } from './utils/colors'
import Constants from 'expo-constants';
import middleware from './middleware'

function FlaskCardsIOStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator();
function MainTabs() {  
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: primaryColor,
        showLabel: false
      }}>
      <Tab.Screen 
        name="Deck"
        component={Deck}
        options={{
          tabBarIcon: ({ color, size }) =>(
            <MaterialCommunityIcons name="cards" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={Quiz}
        options={{
          tabBarIcon: ({ color, size }) =>(
            <Octicons name="checklist" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeckDetail"
        component={DeckDetail}
        options={{
          headerStatusBarHeight: 0,
          headerBackTitle: 'Back',
          headerTintColor: white,
          headerStyle: {
            backgroundColor: primaryColor
          }, 
          
        }}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <Provider store={createStore(reducer, middleware)}>
      <View style={{flex: 1}}>
        <FlaskCardsIOStatusBar backgroundColor={primaryColor} barStyle='light-content'/>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </View>
    </Provider>
  )
}

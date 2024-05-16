import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import NewsListScreen from './src/screens/NewsListScreen';
import NewsDetailScreen from './src/screens/NewsDetailScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NewsListScreen"
        screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="News_Application"
          component={NewsListScreen}
          options={{
            title: 'News Application',
            headerRight: () => (
              <Ionicons
                name="newspaper-outline"
                size={24}
                color="#000"
                style={{ marginRight: 20 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="NewsDetailScreen"
          component={NewsDetailScreen}
          options={{
            title: 'News Detail',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

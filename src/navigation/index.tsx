import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import FoodListScreen from '../screens/FoodListScreen';
import { FoodStackParamList } from '../types.d';

const Stack = createNativeStackNavigator<FoodStackParamList>();
function FoodStackNavigator() {
  return (
    <Stack.Navigator initialRouteName='FoodList'>
      <Stack.Screen name='FoodList' component={FoodListScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <FoodStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;

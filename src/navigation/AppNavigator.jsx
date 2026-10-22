import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MainTabNavigator from './MainTabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabNavigator}>
        {' '}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});

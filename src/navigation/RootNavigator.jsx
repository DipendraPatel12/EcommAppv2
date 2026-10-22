import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
const RootNavigator = () => {
  const isloggedIn = false;

  return (
    <NavigationContainer>
      {isloggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});

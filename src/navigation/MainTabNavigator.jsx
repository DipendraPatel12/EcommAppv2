import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Cart from '../screens/cart/Cart';
import Favorite from '../screens/favorite/Favorite';
import Profile from '../screens/profile/Profile';
import Home from '../screens/home/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>

      <Tab.Screen name="cart" component={Cart}></Tab.Screen>

      <Tab.Screen name="Favorite" component={Favorite}></Tab.Screen>

      <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({});

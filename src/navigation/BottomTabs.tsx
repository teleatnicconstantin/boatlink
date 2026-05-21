import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from './types';
import { CustomTabBar } from './CustomTabBar';
import { MapScreen } from '../screens/MapScreen/MapScreen';
import { LocationsScreen } from '../screens/LocationsScreen/LocationsScreen';
import { SosScreen } from '../screens/SosScreen/SosScreen';
import { MessagesScreen } from '../screens/MessagesScreen/MessagesScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Locations" component={LocationsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="SOS" component={SosScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

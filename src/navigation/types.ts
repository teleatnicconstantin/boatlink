import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
};

export type BottomTabParamList = {
  Locations: undefined;
  Map: undefined;
  SOS: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type RootStackNavProp = NativeStackNavigationProp<RootStackParamList>;
export type BottomTabNavProp = BottomTabNavigationProp<BottomTabParamList>;

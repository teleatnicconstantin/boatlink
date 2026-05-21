import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type ApiError = { message: string } | { errors: Record<string, string[]> };

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

export type AuthScreenProp = NativeStackScreenProps<RootStackParamList, 'Auth'>;
export type MainAppScreenProp = NativeStackScreenProps<RootStackParamList, 'MainApp'>;

export type LocationsScreenProp = BottomTabScreenProps<BottomTabParamList, 'Locations'>;
export type MapScreenProp = BottomTabScreenProps<BottomTabParamList, 'Map'>;
export type SosScreenProp = BottomTabScreenProps<BottomTabParamList, 'SOS'>;
export type MessagesScreenProp = BottomTabScreenProps<BottomTabParamList, 'Messages'>;
export type ProfileScreenProp = BottomTabScreenProps<BottomTabParamList, 'Profile'>;

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { styles } from './AuthScreen.styles';
import { AuthButton } from '../../components/AuthButton/AuthButton';
import { CompactMapModule } from '../../components/CompactMapModule/CompactMapModule';
import { AppleIcon } from '../../assets/icons/AppleIcon';
import { GoogleIcon } from '../../assets/icons/GoogleIcon';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
}

export function AuthScreen({ navigation }: Props) {
  const goToApp = () => navigation.navigate('MainApp');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#041732" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Logo Row */}
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <View style={styles.logoBadgeInner} />
          </View>
          <Text style={styles.logoText}>
            {'Boat'}
            <Text style={styles.logoTextBlue}>{'Link'}</Text>
          </Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>
          {"Know who's out. Reach nearby captains. Send SOS fast."}
        </Text>

        {/* Compact Presence Map Module */}
        <View style={styles.mapModuleWrapper}>
          <CompactMapModule />
        </View>

        {/* Fast Access label */}
        <Text style={styles.sectionLabel}>FAST ACCESS</Text>

        {/* Auth buttons */}
        <View style={styles.buttonGroup}>
          <AuthButton
            label="Continue with Apple"
            variant="light"
            onPress={goToApp}
            leftIcon={<AppleIcon color="#041732" size={23} />}
          />
          <AuthButton
            label="Continue with Google"
            variant="light"
            onPress={goToApp}
            leftIcon={<GoogleIcon size={24} />}
          />
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Sign in + Create account */}
        <View style={styles.buttonGroup}>
          <AuthButton label="Sign in" variant="primary" onPress={goToApp} />
          <AuthButton label="Create account" variant="outlined" onPress={() => {}} />
        </View>

        {/* Forgot password */}
        <AuthButton label="Forgot password?" variant="link" onPress={() => {}} />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>For captains operating from the same marina.</Text>
          <Text style={styles.footerSubText}>{"You'll stay signed in on this device."}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  flushFailedPurchasesCachedAsPendingAndroid,
  getSubscriptions,
  initConnection,
  SubscriptionAndroid,
  getAvailablePurchases,
  getPurchaseHistory,
  Purchase,
} from 'react-native-iap';

import { appAxios } from '../../app/axiosInstance';
import { handleError } from '../../app/helpers';
import {
  ChangePasswordPayload,
  ResetPasswordPayload,
  SetNewPasswordPayload,
  SubscriptionItem,
  UserPayload,
  UserResponse,
  ValidateResetPasswordCodePayload,
} from './types.ts';
import { Alert, Platform } from 'react-native';
import { ListeningHistory, PromotionSection, PromotionType } from '../../../typings/types.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { fetch } from "@react-native-community/netinfo";


// Map iOS model codes to friendly names
const iOSModelMap: Record<string, string> = {
  'iPhone15,3': 'iPhone 15 Pro Max',
  'iPhone15,2': 'iPhone 15 Pro',
  'iPhone15,4': 'iPhone 15 Plus',
  'iPhone15,5': 'iPhone 15',
  'iPhone14,3': 'iPhone 14 Pro Max',
  'iPhone14,2': 'iPhone 14 Pro',
  'iPhone14,4': 'iPhone 14 Plus',
  'iPhone14,5': 'iPhone 14',
  'iPhone13,4': 'iPhone 13 Pro Max',
  'iPhone13,3': 'iPhone 13 Pro',
  'iPhone13,2': 'iPhone 13',
  'iPhone13,1': 'iPhone 13 mini',
  'iPhone12,8': 'iPhone SE (2nd generation)',
  'iPhone12,5': 'iPhone 11 Pro Max',
  'iPhone12,3': 'iPhone 11 Pro',
  'iPhone12,1': 'iPhone 11',
};

const getIOSDeviceName = (modelCode: string): string => {
  return iOSModelMap[modelCode] || modelCode;
};

export const postUser = createAsyncThunk<UserResponse, UserPayload>(
  'auth/postUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/app/users', data);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const validateEmail = createAsyncThunk<{ exists: boolean }, string>(
  'auth/checkEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/auth/email-check', { email });

      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const getUserMe = createAsyncThunk<UserResponse, void>('auth/userMe', async (_, { rejectWithValue }) => {
  try {
    const netState = await fetch().catch(() => null);
    if (netState?.isConnected === false) {
      const storageAuthMe = await AsyncStorage.getItem('authMe');
      if (storageAuthMe) {
        return JSON.parse(storageAuthMe);
      }
    }

    const localListenedStories = await AsyncStorage.getItem('listeningHistoryItems');

    const availablePurchases = await getAvailablePurchases();
    const sortedAvailablePurchases = availablePurchases?.sort((a, b) => b.transactionDate - a.transactionDate);
    const purchaseItem = sortedAvailablePurchases?.[0];

    const response = await appAxios.post('/api/app/users/get-me', {
      platform: Platform.OS,
      purchaseToken: purchaseItem ? purchaseItem.transactionReceipt : null,
      ...purchaseItem,
    });

    let localListenedStoriesArray = [];
    if (!localListenedStories) {
      await AsyncStorage.setItem('listeningHistoryItems', JSON.stringify(response.data.listeningFreeHistory));
    } else {
      localListenedStoriesArray = JSON.parse(localListenedStories);
    }

    const newHistory = [...localListenedStoriesArray, ...response.data.listeningFreeHistory].reduce((acc, curr) => {
      const existStoryIndex = acc.findIndex((item: ListeningHistory) => +item.storyId === +curr.storyId);

      if (existStoryIndex === -1) {
        acc.push(curr);
      }

      return acc;
    }, []);

    const deviceUniqueId = await DeviceInfo.getUniqueId();
    const freeAccess = (response.data?.devices ?? []).find((device: any) => device.uid === deviceUniqueId)?.freeAccess === true;

    return {
      ...response.data,
      listeningFreeHistory: newHistory,
      userPackage: purchaseItem,
      freeAccess
    };
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const updateUserMe = createAsyncThunk<UserResponse, UserPayload>(
  'auth/updateUserMe',
  async (data, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/app/users/me', data);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const changePassword = createAsyncThunk<{ status: boolean }, ChangePasswordPayload>(
  'auth/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/app/users/change-password', data);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const resetPassword = createAsyncThunk<{ status: boolean }, ResetPasswordPayload>(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/auth/forgot-password', data);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const validateResetPasswordCode = createAsyncThunk<{ status: number }, ValidateResetPasswordCodePayload>(
  'auth/validateResetPasswordCode',
  async (data, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/auth/validate-confirmation-code', data);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const setNewPassword = createAsyncThunk<{ status: boolean }, SetNewPasswordPayload>(
  'auth/setNewPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/auth/change-password', data);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const getAvailableSubscriptions = createAsyncThunk<SubscriptionItem[], void>(
  'auth/getAvailableSubscriptions',
  async (_, { rejectWithValue }) => {
    try {
      await initConnection();

      if (Platform.OS === 'android') {
        await flushFailedPurchasesCachedAsPendingAndroid();
      }

      const { data: subscriptions } = await appAxios.get('/api/app/packages', {
        params: { sortField: 'priority', sortDirection: 'asc' },
      });

      const subscriptionSkus = Platform.select({
        android: subscriptions.data.map((item: SubscriptionItem) => item.androidSku),
        ios: subscriptions.data.map((item: SubscriptionItem) => item.iosSku),
      });

      const playStoreSubscriptions = await getSubscriptions({ skus: subscriptionSkus ?? [] });

      return subscriptions.data
        .map((item: SubscriptionItem) => ({
          ...item,
          storeSubscription: playStoreSubscriptions.find(sub => sub.productId === item.androidSku),
        }))
        .filter((item: SubscriptionItem) => item.storeSubscription);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const getSpecialAvailableSubscriptions = createAsyncThunk<SubscriptionItem[], void>(
  'auth/getSpecialAvailableSubscriptions',
  async (_, { rejectWithValue }) => {
    try {
      await initConnection();

      if (Platform.OS === 'android') {
        await flushFailedPurchasesCachedAsPendingAndroid();
      }

      const { data: subscriptions } = await appAxios.get('/api/app/special-packages', {
        params: {
          sortField: 'priority',
          sortDirection: 'asc',
          version: DeviceInfo.getVersion(),
          platform: Platform.OS,
        },
      });

      const subscriptionSkus = Platform.select({
        android: subscriptions.data.map((item: SubscriptionItem) => item.androidSku),
        ios: subscriptions.data.map((item: SubscriptionItem) => item.iosSku),
      });

      const playStoreSubscriptions = await getSubscriptions({ skus: subscriptionSkus ?? [] });

      return subscriptions.data
        .map((item: SubscriptionItem) => ({
          ...item,
          storeSubscription: playStoreSubscriptions.find(sub => sub.productId === item.androidSku),
        }))
        .filter((item: SubscriptionItem) => item.storeSubscription);
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const getPromotionPopupDetails = createAsyncThunk<Record<PromotionType, PromotionSection | null>, void>(
  'general/getPromotionPopupDetails',
  async (_, { rejectWithValue }) => {
    try {
      await initConnection();

      const result: Record<PromotionType, PromotionSection | null> = {
        [PromotionType.ON_LEAVE_SUBSCRIPTION]: null,
        [PromotionType.HOME_SUBSCRIPTION_OFFER]: null,
        [PromotionType.HOME_SUBSCRIPTION_OFFER_POPUP]: null,
      };

      return result;
      if (Platform.OS === 'android') {
        await flushFailedPurchasesCachedAsPendingAndroid();
      }

      const history = Platform.select({
        ios: await getAvailablePurchases(),
        android: await getPurchaseHistory(),
      });

      if (history?.length) {
        return result;
      }

      const { data } = await appAxios.get('/api/app/promo-packages');

      const subscriptionSkus = Platform.select({
        android: data.data.map((item: PromotionSection) => item.androidSku),
        ios: data.data.map((item: PromotionSection) => item.iosSku),
      });

      if (!subscriptionSkus?.length) {
        return result;
      }

      const playStoreSubscriptions = await getSubscriptions({ skus: subscriptionSkus });

      for (let i = 0; i < data.data.length; i++) {
        const subscriptionItem = playStoreSubscriptions.find(sub => sub.productId === data.data[i].androidSku);

        if (Platform.OS === 'android' && subscriptionItem) {
          const offerItem = (subscriptionItem as SubscriptionAndroid).subscriptionOfferDetails.find(
            item => item.basePlanId === data.data[i].androidOfferId,
          );

          if (offerItem) {
            result[data.data[i].type as PromotionType] = {
              ...data.data[i],
              offerToken: offerItem.offerToken,
              storeSubscription: subscriptionItem,
            };
          }
        }
        if (Platform.OS === 'ios') {
          const offerToken = '';

          result[data.data[i].type as PromotionType] = {
            ...data.data[i],
            offerToken: offerToken,
            storeSubscription: subscriptionItem,
          };
        }
      }

      return result;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const setActiveSubscribePackage = createAsyncThunk<void, any>(
  'auth/setActiveSubscribePackage',
  async (data, { rejectWithValue }) => {
    try {
      await appAxios.post('/api/app/users/me/subscribe', { ...data, platform: Platform.OS });
    } catch (error: any) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const createAppleSubscribeSignature = createAsyncThunk<
  {
    signature: string;
    productId: string;
    subscriptionOfferId: string;
    appAccountToken: string;
    nonce: string;
    timestamp: number;
  },
  { productId: string; offerId: string }
>('auth/createAppleSubscribeSignature', async (data, { rejectWithValue }) => {
  try {
    const response = await appAxios.post('/api/app/users/me/create-apple-subscribe-signature', data);

    return response.data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const deleteUser = createAsyncThunk<{ status: boolean }>('auth/deleteUser', async (_, { rejectWithValue }) => {
  try {
    const response = await appAxios.delete('/api/app/users/me');

    return response.data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const getCurrentPurchase = createAsyncThunk<Purchase | undefined>(
  'auth/setActiveSubscribePackage',
  async (_, { rejectWithValue }) => {
    try {
      const availablePurchases = await getAvailablePurchases();

      const sortedAvailablePurchases = availablePurchases?.sort((a, b) => b.transactionDate - a.transactionDate);

      return sortedAvailablePurchases?.[0];
    } catch (error: any) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const postUserSyncFirebaseData = createAsyncThunk<void, void>(
  'auth/postUserSyncFirebaseData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appAxios.post('/api/app/users/sync-firebase-data');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const registerDevice = createAsyncThunk<void, void>(
  'auth/registerDevice',
  async (_, { rejectWithValue }) => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const deviceModel = await DeviceInfo.getModel();
      const platform = Platform.OS === 'ios' ? 'iOS' : 'Android';

      // Format device name: "Brand Model (Platform)" for Android, "Model (iOS)" for iOS
      let formattedDeviceName: string;
      if (Platform.OS === 'android') {
        const deviceBrand = await DeviceInfo.getBrand();
        formattedDeviceName = `${deviceBrand} ${deviceModel} (${platform})`;
      } else {
        // For iOS, getModel() returns codes like "iPhone15,3", map to friendly name
        const friendlyModelName = getIOSDeviceName(deviceModel);
        formattedDeviceName = `${friendlyModelName} (${platform})`;
      }

      await appAxios.post('/api/app/users/me/device', {
        deviceId,
        deviceName: formattedDeviceName,
      });
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

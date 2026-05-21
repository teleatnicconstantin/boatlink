import { Subscription } from 'react-native-iap';

export type UserResponse = {
  id: number;
  uid: string;
  displayName: string;
  email: string;
  gender: string | null;
  storyIds: number[];
  package?: SubscriptionItem;
  pausedSubscription?: SubscriptionItem;
  subscription: {
    acknowledgementState: number;
    autoRenewing: boolean;
    countryCode: string;
    developerPayload: '';
    expiryTimeMillis: string;
    kind: string;
    orderId: string;
    paymentState: 1;
    priceAmountMicros: string;
    priceCurrencyCode: string;
    purchaseType: string;
    startTimeMillis: string;
    expiresDate?: number;
    userCancellationTimeMillis?: string;
    isCanceled: boolean;
    price?: number;
    currency?: string;
    autoResumeTimeMillis?: string;
  };
  userPackage: {
    autoRenewingAndroid: boolean;
    dataAndroid: string;
    developerPayloadAndroid: string;
    id: number;
    isAcknowledgedAndroid: boolean;
    obfuscatedAccountIdAndroid: string | null;
    obfuscatedProfileIdAndroid: string | null;
    packageId: number;
    packageNameAndroid: string;
    platform: string;
    productId: string;
    productIds: string[] | null;
    purchaseStateAndroid: number;
    purchaseToken: string;
    signatureAndroid: string;
    transactionDate: number;
    transactionId: string;
    transactionReceipt: string;
    userId: number;
  };
  listeningFreeHistory: Array<{
    id: number;
    storyId: number;
    userId: number;
    createdAt: string;
  }>;
  freeAccess: boolean;
};

export type UserPayload = {
  displayName: string;
  gender: string;
};

export interface ResetPasswordPayload {
  email: string;
}

export interface ValidateResetPasswordCodePayload extends ResetPasswordPayload {
  code: string;
}

export interface SetNewPasswordPayload extends ValidateResetPasswordCodePayload {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordPayload {
  password: string;
  confirmPassword: string;
}

export interface SubscriptionItem {
  id: number;
  advantages: string[];
  androidSku: string;
  androidOfferId: string;
  createdAt: string;
  cutPrice: number;
  description: string;
  iosSku: string;
  iosOfferId: string;
  price: number;
  priority: number;
  subTitle: string;
  title: string;
  priceText: string;
  updatedAt: string;
  currency: string;
  storeSubscription: Subscription;
  specialPackage: boolean;
  imageFile?: { id: number; path: string } | null;
}

import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionItem, UserResponse } from './types.ts';
import { getAvailableSubscriptions, getSpecialAvailableSubscriptions, getCurrentPurchase, getPromotionPopupDetails, getUserMe } from './authThunk.ts';
import { Purchase } from 'react-native-iap';
import { PromotionSection, PromotionType } from '../../../typings/types.ts';

type AuthState = {
  auth: FirebaseAuthTypes.User | null;
  me: UserResponse | null;
  subscriptions: {
    loading: boolean;
    items: SubscriptionItem[];
  };
  specialSubscriptions: {
    loading: boolean;
    items: SubscriptionItem[];
  };
  currentPurchase: Purchase | undefined;
  promotionOffers: Record<PromotionType, PromotionSection | null>;
  promotionOffersLoading: boolean;
};

const initialState: AuthState = {
  auth: null,
  me: null,
  currentPurchase: undefined,
  subscriptions: {
    loading: false,
    items: [],
  },
  specialSubscriptions: {
    loading: false,
    items: [],
  },
  promotionOffersLoading: false,
  promotionOffers: {
    [PromotionType.ON_LEAVE_SUBSCRIPTION]: null,
    [PromotionType.HOME_SUBSCRIPTION_OFFER]: null,
    [PromotionType.HOME_SUBSCRIPTION_OFFER_POPUP]: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAuthUser(state, { payload }) {
      state.auth = payload;
    },
    storeAuthMe(state, { payload }) {
      state.me = payload;
    },
    setActivePlan(state, { payload }) {
      state.currentPurchase = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentPurchase.fulfilled, (state, { payload }) => {
        state.currentPurchase = payload;
      })
      .addCase(getUserMe.fulfilled, (state, { payload }) => {
        state.me = payload ?? null;
      })
      .addCase(getUserMe.rejected, state => {
        state.me = null;
      })
      .addCase(getAvailableSubscriptions.pending, state => {
        state.subscriptions.loading = true;
        state.subscriptions.items = [];
      })
      .addCase(getAvailableSubscriptions.fulfilled, (state, { payload }) => {
        state.subscriptions.items = payload;
        state.subscriptions.loading = false;
      })
      .addCase(getAvailableSubscriptions.rejected, state => {
        state.subscriptions.loading = false;
      })
      .addCase(getSpecialAvailableSubscriptions.pending, state => {
        state.specialSubscriptions.loading = true;
        state.specialSubscriptions.items = [];
      })
      .addCase(getSpecialAvailableSubscriptions.fulfilled, (state, { payload }) => {
        state.specialSubscriptions.items = payload;
        state.specialSubscriptions.loading = false;
      })
      .addCase(getSpecialAvailableSubscriptions.rejected, state => {
        state.specialSubscriptions.loading = false;
      })
      .addCase(getPromotionPopupDetails.pending, state => {
        state.promotionOffersLoading = true;
      })
      .addCase(getPromotionPopupDetails.fulfilled, (state, { payload }) => {
        state.promotionOffers = payload;
        state.promotionOffersLoading = false;
      })
      .addCase(getPromotionPopupDetails.rejected, state => {
        state.promotionOffersLoading = false;
      });
  },
});

export const { storeAuthUser, storeAuthMe, setActivePlan } = authSlice.actions;

export default authSlice.reducer;

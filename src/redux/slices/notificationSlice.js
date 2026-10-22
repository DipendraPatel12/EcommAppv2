import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    {
      id: 'notif-1',
      title: '50% OFF in Ultraboost all terrain Ltd shoes!!!',
      time: 'Today',
      type: 'discount',
      isUnread: true,
    },
    {
      id: 'notif-2',
      title: 'One Step ahead with new stylish collections every week.',
      time: 'Today',
      type: 'news',
      isUnread: true,
    },
    {
      id: 'notif-3',
      title: 'Package from your order #657398 has been arrived.',
      time: 'Earlier',
      type: 'order',
      isUnread: false,
    },
    {
      id: 'notif-4',
      title: '70% OFF in Cutter and Buck Women’s knit!!!',
      time: 'Earlier',
      type: 'discount',
      isUnread: false,
    },
    {
      id: 'notif-5',
      title: '$200 added in your wallet successfully.',
      time: 'Earlier',
      type: 'wallet',
      isUnread: false,
    },
    {
      id: 'notif-6',
      title: 'Package from your order #34887 has been arrived.',
      time: 'Earlier',
      type: 'order',
      isUnread: false,
    },
  ],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) notif.isUnread = false;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.isUnread = false));
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { markAsRead, markAllAsRead, clearAllNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [
    {
      id: 'addr-1',
      type: 'Home Address',
      address: 'Street no. 2 Near Giant Mall Downtown New York',
      isDefault: true,
    },
    {
      id: 'addr-2',
      type: 'Office Address',
      address: 'Office No. 8 Main Building Near Waterfall New York',
      isDefault: false,
    },
  ],
  selectedAddressId: 'addr-1',
  paymentMethods: [
    {
      id: 'pm-1',
      name: 'Pay With Paypal',
      type: 'paypal',
      details: 'user@paypal.com',
      isDefault: true,
    },
    {
      id: 'pm-2',
      name: 'Pay With Credit Card',
      type: 'card',
      details: '**** **** **** 4242',
      isDefault: false,
    },
    {
      id: 'pm-3',
      name: 'Pay With Google Pay',
      type: 'googlepay',
      details: 'Google Pay Connected',
      isDefault: false,
    },
  ],
  selectedPaymentMethodId: 'pm-1',
  recentOrders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
    addAddress: (state, action) => {
      const newAddress = {
        id: `addr-${Date.now()}`,
        ...action.payload,
        isDefault: state.addresses.length === 0,
      };
      state.addresses.push(newAddress);
      state.selectedAddressId = newAddress.id;
    },
    selectPaymentMethod: (state, action) => {
      state.selectedPaymentMethodId = action.payload;
    },
    addPaymentMethod: (state, action) => {
      const newMethod = {
        id: `pm-${Date.now()}`,
        ...action.payload,
      };
      state.paymentMethods.push(newMethod);
      state.selectedPaymentMethodId = newMethod.id;
    },
    placeOrder: (state, action) => {
      const order = {
        id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
        items: action.payload.items,
        total: action.payload.total,
        addressId: state.selectedAddressId,
        paymentMethodId: state.selectedPaymentMethodId,
        status: 'Confirmed',
      };
      state.recentOrders.unshift(order);
    },
  },
});

export const {
  selectAddress,
  addAddress,
  selectPaymentMethod,
  addPaymentMethod,
  placeOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

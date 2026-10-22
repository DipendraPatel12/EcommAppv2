import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Plus, Minus, Trash2 } from 'lucide-react-native';
import { useDispatch } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/slices/cartSlice';
import { COLORS, FONTS, SHADOWS } from '../utils/theme';
import { rh, rw, rf } from '../utils/responsive';

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <View style={styles.card}>
      {/* Thumbnail */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Item Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity
            onPress={handleRemove}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.deleteButton}
          >
            <Trash2 size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <Text style={styles.quantityLabel}>
          Quantity : {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
          {item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ${(Number(item.price) * item.quantity).toFixed(2)}
          </Text>

          {/* Stepper Buttons */}
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleDecrement}
              style={[styles.stepperButton, styles.stepperMinus]}
            >
              <Minus size={14} color={COLORS.primary} strokeWidth={2.5} />
            </TouchableOpacity>

            <Text style={styles.stepperValue}>
              {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleIncrement}
              style={[styles.stepperButton, styles.stepperPlus]}
            >
              <Plus size={14} color={COLORS.textWhite} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: rw(3),
    marginBottom: rh(1.8),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...SHADOWS.light,
  },
  imageContainer: {
    width: rw(22),
    height: rw(22),
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: rw(2),
  },
  image: {
    width: '90%',
    height: '90%',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: rw(3.5),
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: rf(1.8),
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    marginRight: rw(2),
  },
  deleteButton: {
    padding: rw(1),
  },
  quantityLabel: {
    fontSize: rf(1.4),
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    marginTop: rh(0.3),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rh(1),
  },
  price: {
    fontSize: rf(2.0),
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    width: rw(7),
    height: rw(7),
    borderRadius: rw(1.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperMinus: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  stepperPlus: {
    backgroundColor: COLORS.primary,
  },
  stepperValue: {
    marginHorizontal: rw(2.5),
    fontSize: rf(1.7),
    fontWeight: '600',
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
});

export default CartItemCard;

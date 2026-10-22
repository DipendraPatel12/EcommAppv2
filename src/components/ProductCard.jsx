import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Heart, Plus, Star } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoritesSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { COLORS, FONTS, SHADOWS } from '../utils/theme';
import { rh, rw, rf } from '../utils/responsive';

const ProductCard = ({ product, onPress }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites.items);
  const isFav = favoriteItems.some((item) => item.id === product.id);

  const handleToggleFav = (e) => {
    e?.stopPropagation?.();
    dispatch(toggleFavorite(product));
  };

  const handleAddToCart = (e) => {
    e?.stopPropagation?.();
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        selectedColor: '#2563EB',
        selectedSize: 'M',
      })
    );
  };

  // Format rating
  const ratingValue = product.rating?.rate
    ? Number(product.rating.rate).toFixed(1)
    : '4.8';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      {/* Product Image Area */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Favorite Heart Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleToggleFav}
          style={styles.heartButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Heart
            size={16}
            color={isFav ? COLORS.heart : '#94A3B8'}
            fill={isFav ? COLORS.heart : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      {/* Info Area */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>

        {/* Rating Row */}
        <View style={styles.ratingRow}>
          <Star size={14} color={COLORS.star} fill={COLORS.star} />
          <Text style={styles.ratingText}>{ratingValue}</Text>
        </View>

        {/* Price & Add to Cart Button */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAddToCart}
            style={styles.addButton}
          >
            <Plus size={16} color={COLORS.textWhite} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: rw(44),
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: rw(2.5),
    marginBottom: rh(2),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...SHADOWS.light,
  },
  imageContainer: {
    width: '100%',
    height: rh(15),
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
  infoContainer: {
    paddingTop: rh(1),
  },
  title: {
    fontSize: rf(1.6),
    fontFamily: FONTS.medium,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: rh(0.4),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(0.6),
  },
  ratingText: {
    fontSize: rf(1.4),
    color: COLORS.textSecondary,
    marginLeft: rw(1),
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rh(0.2),
  },
  price: {
    fontSize: rf(1.8),
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
  },
  addButton: {
    width: rw(7.5),
    height: rw(7.5),
    borderRadius: rw(3.75),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductCard;

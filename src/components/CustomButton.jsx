import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../utils/theme';
import { rh, rw, rf } from '../utils/responsive';

const CustomButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'outline' | 'secondary' | 'ghost'
  size = 'medium',     // 'small' | 'medium' | 'large'
  disabled = false,
  loading = false,
  icon = null,
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineContainer;
      case 'secondary':
        return styles.secondaryContainer;
      case 'ghost':
        return styles.ghostContainer;
      case 'primary':
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineText;
      case 'secondary':
        return styles.secondaryText;
      case 'ghost':
        return styles.ghostText;
      case 'primary':
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { height: rh(4.5), paddingHorizontal: rw(3) };
      case 'large':
        return { height: rh(6.8), paddingHorizontal: rw(6) };
      case 'medium':
      default:
        return { height: rh(5.8), paddingHorizontal: rw(4) };
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.baseContainer,
        getContainerStyle(),
        getSizeStyle(),
        disabled && styles.disabledContainer,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.textWhite}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <Text
            style={[
              styles.baseText,
              getTextStyle(),
              disabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.secondaryBackground,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  disabledContainer: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: rw(2),
  },
  baseText: {
    fontSize: rf(1.9),
    fontWeight: '600',
    fontFamily: FONTS.medium,
  },
  primaryText: {
    color: COLORS.textWhite,
  },
  outlineText: {
    color: COLORS.primary,
  },
  secondaryText: {
    color: COLORS.textPrimary,
  },
  ghostText: {
    color: COLORS.textSecondary,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default CustomButton;

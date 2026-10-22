import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { COLORS, FONTS } from '../utils/theme';
import { rh, rw, rf } from '../utils/responsive';

const Header = ({
  title,
  showBack = true,
  onBack,
  rightComponent,
  titleStyle,
  containerStyle,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButtonPlaceholder} />
        )}
      </View>

      <View style={styles.centerContainer}>
        {title ? (
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightContainer}>
        {rightComponent ? rightComponent : <View style={styles.backButtonPlaceholder} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: rh(6.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rw(4),
    backgroundColor: COLORS.background,
  },
  leftContainer: {
    width: rw(12),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backButton: {
    width: rw(10),
    height: rw(10),
    borderRadius: rw(5),
    backgroundColor: COLORS.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: rw(10),
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: rf(2.2),
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
  },
  rightContainer: {
    width: rw(12),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export default Header;

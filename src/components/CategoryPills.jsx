import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../utils/theme';
import { rh, rw, rf } from '../utils/responsive';

const CategoryPills = ({ categories, selectedCategory, onSelectCategory }) => {
  // Format readable category names
  const formatCategoryName = (cat) => {
    if (!cat) return '';
    if (cat.toLowerCase() === 'all') return 'All';
    if (cat.toLowerCase() === "men's clothing") return 'Men';
    if (cat.toLowerCase() === "women's clothing") return 'Women';
    if (cat.toLowerCase() === 'jewelery') return 'Jewelry';
    if (cat.toLowerCase() === 'electronics') return 'Electronics';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              activeOpacity={0.8}
              onPress={() => onSelectCategory(category)}
              style={[styles.pill, isSelected && styles.pillActive]}
            >
              <Text
                style={[styles.pillText, isSelected && styles.pillTextActive]}
              >
                {formatCategoryName(category)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: rh(1.5),
  },
  sectionTitle: {
    fontSize: rf(2.0),
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontFamily: FONTS.bold,
    marginBottom: rh(1.2),
    paddingHorizontal: rw(4),
  },
  scrollContent: {
    paddingHorizontal: rw(4),
    gap: rw(2),
  },
  pill: {
    paddingHorizontal: rw(4.5),
    paddingVertical: rh(1),
    borderRadius: 20,
    backgroundColor: COLORS.pillInactiveBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: COLORS.pillActiveBg,
  },
  pillText: {
    fontSize: rf(1.6),
    color: COLORS.pillInactiveText,
    fontFamily: FONTS.medium,
    fontWeight: '500',
  },
  pillTextActive: {
    color: COLORS.pillActiveText,
    fontWeight: '600',
  },
});

export default CategoryPills;

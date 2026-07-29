import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Type import — used below, so no unused warning
import type { Product } from '@types';
import { COLORS, SPACING, TYPOGRAPHY } from '@constants/theme';
import { CATEGORIES } from '@constants/categories';

// A sample product proving the Product type works end-to-end.
// If any field is wrong, TypeScript errors right here.
const sampleProduct: Product = {
  id: 'BREAD-001',
  name: 'Sourdough Loaf',
  description: 'Classic sourdough, baked fresh daily',
  category: 'Bread',
  price: 18.5,
  stock: 12,
  isAvailable: true,
  images: [],
  allergens: ['gluten'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wonder Bakery</Text>
      <Text style={styles.sub}>Day 1 — Foundation complete</Text>
      <Text style={styles.sub}>{CATEGORIES.length} categories loaded</Text>
      <Text style={styles.sub}>Sample: {sampleProduct.name} — AED {sampleProduct.price}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  sub: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
});
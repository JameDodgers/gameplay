import React from "react";

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import {
  Text,
  Image,
  View,
  ScrollView,
} from "react-native";

import { Category } from '../Category'

import { categories } from "../../utils/categories";

import { styles } from "./styles";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
}

export function CategorySelect({
  selectedCategory,
  setSelectedCategory,
  hasCheckBox
}: Props) {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}>
      {
        categories.map(category => (
          <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            hasCheckBox={hasCheckBox}
            checked={category.id === selectedCategory}
            onPress={() => setSelectedCategory(category.id)}
          />
        ))
      }
    </ScrollView>
  );
}

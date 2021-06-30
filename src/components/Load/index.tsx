import React from 'react';

import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';

import { theme } from '../../global/styles/theme';

import styles from './styles';

const Component = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
      />
    </View>
  );
}

export default Component;
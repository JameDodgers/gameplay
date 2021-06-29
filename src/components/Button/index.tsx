import React from "react";

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import {
  Text,
} from "react-native";

import { styles } from "./styles";

interface Props extends RectButtonProps {
  title: string;
}

export function Button({ title, ...props }: Props) {
  return (
    <RectButton
      style={styles.container}
      {...props}>
      <Text
        style={styles.title}>
        {title}
      </Text>
    </RectButton>
  );
}

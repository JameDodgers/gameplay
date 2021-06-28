import React from "react";

import {
  Text,
  View,
} from "react-native";

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { SvgProps } from 'react-native-svg'

import { LinearGradient } from "expo-linear-gradient";


interface Props extends RectButtonProps {
  title: string;
  icon: React.FC<SvgProps>;
  checked?: boolean;
  hasCheckBox?: boolean;
}

import { theme } from "../../global/styles/theme";

import { styles } from "./styles";

export function Category({
  title,
  icon: Icon,
  checked,
  hasCheckBox,
  ...props
}: Props) {
  const { secondary40, secondary50, secondary70, secondary85 } = theme.colors;

  return (
    <RectButton {...props}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}
      >
        <LinearGradient
          style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
          colors={[checked ? secondary85 : secondary50, secondary40]}
        >
          {
            hasCheckBox &&
            <View style={
              checked ? styles.checked : styles.unchecked}
            />
          }
          <Icon
            width={48}
            height={48}
          />
          <Text style={styles.title}>
            {title}
          </Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton>
  );
}

import React from 'react';

import {
  View,
  Text,
  ImageBackground,
  FlatList
} from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Member } from '../../components/Member';
import { Header } from '../../components/Header';
import { ButtonIcon } from '../../components/ButtonIcon';

import { Fontisto } from '@expo/vector-icons'

import BannerImg from '../../assets/banner.png'

import { theme } from '../../global/styles/theme';

import { styles } from './styles';

export function AppointmentDetails() {
  const members = [
    {
      id: '1',
      username: 'Rodrigo',
      avatarUrl: 'https://github.com/jamedodgers.png',
      status: 'online',
    },
    {
      id: '2',
      username: 'Rodrigo',
      avatarUrl: 'https://github.com/jamedodgers.png',
      status: 'offilne',
    },
  ]
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />
      <ImageBackground
        style={styles.banner}
        source={BannerImg}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            Ledários
          </Text>
          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>
      <ListHeader
        title="Jogadores"
        subtitle="Total 3"
      />
      <FlatList
        data={members}
        style={styles.members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Member
            data={item}
          />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
      />
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}
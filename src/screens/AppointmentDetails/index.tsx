import React, { useState } from 'react';

import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Alert
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { BorderlessButton } from 'react-native-gesture-handler';

import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Member, MemberProps } from '../../components/Member';
import { Header } from '../../components/Header';
import { ButtonIcon } from '../../components/ButtonIcon';
import { AppointmentProps } from '../../components/Appointment';
import { Load } from '../../components/Load';

import { Fontisto } from '@expo/vector-icons'

import BannerImg from '../../assets/banner.png'

import { theme } from '../../global/styles/theme';

import { styles } from './styles';
import { discordApi } from '../../services/api';
import { useEffect } from 'react';

interface Params {
  appointment: AppointmentProps
}

interface GuildWidget {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

export function AppointmentDetails() {
  const route = useRoute();

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const { appointment } = route.params as Params;

  async function fetchGuildWidget() {
    try {
      const response = await discordApi.get(`/guilds/${appointment.guild.id}/widget.json`);

      setWidget(response.data);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. Solicite ao administrador para habilitar o Widget.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGuildWidget()
  }, [])

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
            {appointment.guild.name}
          </Text>
          <Text style={styles.subtitle}>
            {appointment.description}
          </Text>
        </View>
      </ImageBackground>
      {
        loading ? (
          <Load />
        ) : (
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total: ${widget.members.length}`}
            />
            <FlatList
              data={widget.members}
              style={styles.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member
                  data={item}
                />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
            />
          </>
        )
      }
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}
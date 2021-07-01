import React, { useState, useEffect } from 'react';

import {
  View,
  FlatList,
} from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';

import { discordApi } from '../../services/api';

import { styles } from './styles';

interface Props {
  handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true)

  async function fetchGuilds() {
    try {
      const response = await discordApi.get('/users/@me/guilds')

      setGuilds(response.data);
      setLoading(false);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchGuilds();
  }, [])

  return (
    <View style={styles.container}>
      {
        loading ? <Load /> :
          <FlatList
            data={guilds}
            style={styles.guilds}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <ListDivider isCentered />}
            contentContainerStyle={{ paddingBottom: 70, paddingTop: 104 }}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            renderItem={({ item }) => (
              <Guild
                data={item}
                onPress={() => handleGuildSelect(item)}
              />
            )}
          />
      }
    </View>
  )
}
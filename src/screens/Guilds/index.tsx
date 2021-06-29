import React from 'react';

import {
  View,
  FlatList,
} from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

interface Props {
  handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ handleGuildSelect }: Props) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'image.png',
      owner: true,
    },
    {
      id: '2',
      name: 'Lendários',
      icon: 'image.png',
      owner: true,
    },
  ]

  return (
    <View style={styles.container}>
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
    </View>
  )
}
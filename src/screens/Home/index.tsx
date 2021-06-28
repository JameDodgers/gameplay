import React, { useState } from "react";

import { FlatList, View } from "react-native";

import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";

import { styles } from "./style";

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('')

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true,
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
    }
  ]

  function handleSelectedCategory(categoryId: string) {
    categoryId === selectedCategory
      ? setSelectedCategory('')
      : setSelectedCategory(categoryId)
  }

  return (
    <View>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>
      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectedCategory}
      />
      <View style={styles.content}>
        <ListHeader
          title="Partidas agendadas"
          subtitle="Total 6"
        />
        <FlatList
          data={appointments}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Appointment
              data={item}
            />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
        />
      </View>
    </View>
  )
}
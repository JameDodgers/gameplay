import React, { useState, useCallback } from "react";

import {
  FlatList,
  View
} from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLLECTION_APPOINTMENTS } from "../../configs/storage";

import { Background } from "../../components/Background";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";

import { styles } from "./styles";

export function Home() {
  const navigation = useNavigation()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true)


  function handleSelectedCategory(categoryId: string) {
    categoryId === selectedCategory
      ? setSelectedCategory('')
      : setSelectedCategory(categoryId)
  }

  function handleAppointmentDetails() {
    navigation.navigate('AppointmentDetails')
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const appointments: AppointmentProps[] = storage ? JSON.parse(storage) : [];

    if (selectedCategory) {
      setAppointments(appointments.filter(item => item.category === selectedCategory))
    } else {
      setAppointments(appointments)
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [selectedCategory])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectedCategory}
      />
      <ListHeader
        title="Partidas agendadas"
        subtitle="Total 6"
      />
      <FlatList
        data={appointments}
        style={styles.matches}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 70 }}
        renderItem={({ item }) => (
          <Appointment
            data={item}
            onPress={handleAppointmentDetails}
          />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
      />
    </Background>
  )
}
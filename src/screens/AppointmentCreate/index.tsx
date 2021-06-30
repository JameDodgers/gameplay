import React, { useState } from 'react';

import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid'

import { Feather } from '@expo/vector-icons';

import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Background } from '../../components/Background';

import { Guilds } from '../Guilds';

import { GuildProps } from '../../components/Guild';

import { theme } from '../../global/styles/theme';

import { styles } from './styles';
import { COLLECTION_APPOINTMENTS, COLLECTION_USER } from '../../configs/storage';

export function AppointmentCreate() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGuild, setSelectedGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  function handleSelectedCategory(categoryId: string) {
    setSelectedCategory(categoryId)
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setSelectedGuild(guildSelect)
    setModalVisible(false)
  }

  function handleModalClosing() {
    setModalVisible(false)
  }

  function handleModalOpening() {
    setModalVisible(true)
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      selectedGuild,
      selectedCategory,
      date: `${day}/${month} às ${hour}:${minute}`,
      description
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment]))

    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar Partida" />
          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 }
            ]}
          >
            Categoria
          </Text>
          <CategorySelect
            hasCheckBox
            selectedCategory={selectedCategory}
            setSelectedCategory={handleSelectedCategory}
          />
          <View style={styles.form}>
            <RectButton onPress={handleModalOpening}>
              <View style={styles.select}>
                {
                  selectedGuild.icon
                    ? <GuildIcon guildId={selectedGuild.id} iconId={selectedGuild.icon} />
                    : <View style={styles.image} />
                }
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {
                      selectedGuild.name
                        ? selectedGuild.name
                        : 'Selecione um servidor'
                    }
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>
            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Data
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setDay}
                  />
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMonth}
                  />
                </View>
              </View>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Horário
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>
                Descrição
              </Text>
              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>
            <TextArea
              multiline
              autoCorrect={false}
              numberOfLines={5}
              maxLength={100}
              onChangeText={setDescription}
            />
            <View style={styles.footer}>
              <Button
                title="Agendar"
                onPress={handleSave}
              />
            </View>
          </View>
        </ScrollView>
      </Background>
      <ModalView
        visible={modalVisible}
        closeModal={handleModalClosing}
      >
        <Guilds
          handleGuildSelect={handleGuildSelect}
        />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
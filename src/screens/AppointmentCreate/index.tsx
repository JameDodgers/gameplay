import React, { useState } from 'react';

import { RectButton } from 'react-native-gesture-handler'

import { Feather } from '@expo/vector-icons';

import {
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';

import { GuildProps } from '../../components/Guild';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export function AppointmentCreate() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState<GuildProps>({} as GuildProps);

  function handleGuildSelect(guildSelect: GuildProps) {
    setSelectedGuild(guildSelect)
    setModalVisible(false)
  }

  function handleModalOpening() {
    setModalVisible(true)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
          setSelectedCategory={setSelectedCategory}
        />
        <View style={styles.form}>
          <RectButton onPress={handleModalOpening}>
            <View style={styles.select}>
              {
                selectedGuild.icon
                  ? <GuildIcon />
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
              <Text style={styles.label}>
                Data
              </Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>
                  /
                </Text>
                <SmallInput maxLength={2} />
              </View>
            </View>
            <View>
              <Text style={styles.label}>
                Horário
              </Text>
              <View style={styles.column}>
                <SmallInput maxLength={2} />
                <Text style={styles.divider}>
                  :
                </Text>
                <SmallInput maxLength={2} />
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
          />
          <View style={styles.footer}>
            <Button title="Agendar" />
          </View>
        </View>
      </ScrollView>
      <ModalView visible={modalVisible}>
        <Guilds
          handleGuildSelect={handleGuildSelect}
        />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
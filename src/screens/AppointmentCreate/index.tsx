import React, { useState } from 'react'
import { Feather } from "@expo/vector-icons";
import {
    View,
    Text,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from 'react-native'
import { Background } from "../../components/Background";
import { CategorySelect } from "../../components/CategorySelect";
import { Header } from '../../components/Header'
import { RectButton } from "react-native-gesture-handler";
import { TextArea } from '../../components/TextArea'
import { ModalView } from "../../components/ModalView";
import { SmallInput } from "../../components/SmallInput";
import {theme} from "../../global/styles/theme";
import { GuildIcon } from "../../components/GuildIcon";
import { Button } from '../../components/Button'
import { Guilds } from "../Guilds";

import { styles } from "./styles";
import {GuildProps} from "../../components/Appointment";


export function AppointmentCreate () {
    const [category, setCategory] = useState('');
    const [openGuildsModa, setOpenGuildsModal] = useState(false)
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps)

    function handleOpenGuilds(){
        setOpenGuildsModal(true)
    }
    function handleOpenSelect(guildSelect: GuildProps){
        setGuild(guildSelect)
        setOpenGuildsModal(false)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
           <ScrollView>
                <Header
                    title="Agendar Partida"
                />

                <Text style={styles.label}>
                    Categoria
                </Text>

                <CategorySelect
                    hasCheckBox
                    setCategory={setCategory}
                    categorySelected={category}
                />

                <View style={styles.form}>
                    <RectButton onPress={handleOpenGuilds}>
                        <View style={styles.select}>
                            {
                                guild.icon
                                    ? <GuildIcon/>
                                    : <View style={styles.image}/>

                            }
                                <View style={[styles.selectBody,
                                    {marginLeft: 24, marginTop: 36, marginBottom: 18}]}>
                                    <Text style={styles.label}>
                                        {
                                            guild.name
                                                ? guild.name
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
                                 Dia e mês
                             </Text>
                            <View style={styles.column}>
                                <SmallInput maxLength={2}/>
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                <SmallInput maxLength={2}/>
                            </View>
                        </View>

                        <View>
                             <Text style={styles.label}>
                                 Hora e minuto
                             </Text>
                            <View style={styles.column}>
                                <SmallInput maxLength={2}/>
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                <SmallInput maxLength={2}/>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.field, { marginBottom: 12}]}>
                        <Text style={styles.label}>
                            Descrição
                        </Text>

                        <Text style={styles.caracteresLimit}>
                            Max 100 caracteres
                        </Text>

                    </View>
                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                        />

                    <View style={styles.footer}>
                        <Button title="Agendar"/>
                    </View>
                </View>
           </ScrollView>
            <ModalView visible={openGuildsModa}>
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>
        </KeyboardAvoidingView>
    )
}
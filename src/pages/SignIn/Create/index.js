import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Button } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as Animatable from 'react-native-animatable'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Create() {

    const [hidePass, setHidePass] = useState(true);
    const [hidePass1, setHidePass1] = useState(true);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            setShowDatePicker(Platform.OS === 'ios');
            setSelectedDate(selectedDate);
        }
    };
    // Função para formatar a data no formato "DIA/MES/ANO"
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [genero, setGenero] = useState('Masculino');
    const [showGenderDialog, setShowGenderDialog] = useState(false);
    const handleGenderSelection = (gender) => {
        setGenero(gender);
        setShowGenderDialog(false);
    };

    const [cpf, setCPF] = useState('');
    const handleCPFFormat = (text) => {
        // Remove qualquer caractere não numérico
        const numericValue = text.replace(/\D/g, '');
        // Aplica a máscara de CPF (XXX.XXX.XXX-XX)
        let formattedCPF = numericValue;
        if (numericValue.length > 3) {
            formattedCPF = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
        }
        if (numericValue.length > 6) {
            formattedCPF = `${formattedCPF.slice(0, 7)}.${formattedCPF.slice(7)}`;
        }
        if (numericValue.length > 9) {
            formattedCPF = `${formattedCPF.slice(0, 11)}-${formattedCPF.slice(11)}`;
        }
        setCPF(formattedCPF);
    };

    const [numCelular, setCelular] = useState('');
    const handleCelularFormat = (text) => {
        // Remove qualquer caractere não numérico
        const numericValue = text.replace(/\D/g, '');
        // Aplica a máscara de celular ((XX)XXXXX-XXXX)
        let formatCelular = numericValue; 
        if (numericValue.length > 2) {
            formatCelular = `(${numericValue.slice(0, 2)})${numericValue.slice(2)}`;
        }
        if (numericValue.length > 7) {
            formatCelular = `${formatCelular.slice(0, 9)}-${formatCelular.slice(9)}`;
        }
        setCelular(formatCelular);
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Cadastre-se</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>

                <TextInput
                    placeholder='NOME COMPLETO'
                    style={styles.input}
                />

                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        value={selectedDate ? formatDate(selectedDate) : 'Nenhuma data selecionada'}
                        style={styles.input}
                        flex={1}
                    />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Ionicons name="calendar-outline" size={25} />
                    </TouchableOpacity>

                </View>

                {showDatePicker && (
                    <DateTimePicker
                        format="DD/MM/YYYY"
                        value={selectedDate || new Date()} // Use a data selecionada ou a data atual
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
                <TextInput
                    value={cpf}
                    onChangeText={handleCPFFormat}
                    placeholder='CPF'
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={14}
                />
                <TextInput
                    placeholder='EMAIL'
                    style={styles.input}
                />
                <TextInput
                    value={numCelular}
                    onChangeText={handleCelularFormat}
                    placeholder='CELULAR'
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={14}

                />

                <TouchableOpacity onPress={() => setShowGenderDialog(true)}>
                    <Text style={styles.input}>Gênero: {genero}</Text>
                </TouchableOpacity>


                <Modal visible={showGenderDialog} transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.dialog}>
                            <Text style={[styles.input, { fontSize: 20 }]}>Escolher Gênero</Text>
                            <TouchableOpacity onPress={() => handleGenderSelection('Masculino')}>
                                <Text style={[styles.input, { textAlign: 'center', }]}>Masculino</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleGenderSelection('Feminino')}>
                                <Text style={[styles.input, { textAlign: 'center', }]}>Feminino</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleGenderSelection('Outro')}>
                                <Text style={[styles.input, { textAlign: 'center', }]}>Outro</Text>
                            </TouchableOpacity>
                            <Button title="Cancelar" onPress={() => setShowGenderDialog(false)} />
                        </View>
                    </View>
                </Modal>

                <View style={styles.icons}>
                    <TextInput
                        placeholder='SENHA'
                        style={styles.input}
                        secureTextEntry={hidePass}
                        flex={1}
                    />
                    <TouchableOpacity style={styles.buttonRow} onPress={() => setHidePass(!hidePass)} >
                        <Ionicons name="eye" color="#FFF" size={25} />
                    </TouchableOpacity>

                </View>
                <View style={styles.icons}>
                    <TextInput
                        placeholder='CONFIRMAR SENHA'
                        style={styles.input}
                        secureTextEntry={hidePass1}
                        flex={1}
                    />
                    <TouchableOpacity style={styles.buttonRow} onPress={() => setHidePass1(!hidePass1)} >
                        <Ionicons name="eye" color="#FFF" size={25} />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={[styles.button, styles.green]}>
                    <Text style={styles.buttonText}>Cadastre-se</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',

    },
    message: {
        alignSelf: 'center',
        fontSize: 28,
        color: '#000000',

    },
    containerForm: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        paddingTop: '2%',
        elevation: 5,

    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#00ced1',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonForgot: {
        marginTop: 14,
        alignSelf: 'center',

    },
    ForgotText: {
        fontSize: 15,
        marginBottom: 30,

    },
    green: {
        backgroundColor: '#32cd32',

    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        backgroundColor: '#000000',
        width: '10%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialog: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,

    },
})
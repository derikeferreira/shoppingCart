import React from 'react'
import { Touchable, TouchableOpacity } from 'react-native'
import {View, Text, StyleSheet, TextInput} from 'react-native'

import * as Animatable from 'react-native-animatable'
import {useNavigation} from '@react-navigation/native'

export default function SignIn() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Esqueceu a senha?</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Sem problemas! Enviaremos as instruções para alteração da senha.</Text>
                <TextInput
                    placeholder='Digite um email...'
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Pesquisar</Text>
                </TouchableOpacity>

            </Animatable.View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',

    },
    message:{
        alignSelf: 'center',
        fontSize: 28,
        color: '#000000',

    },
    containerForm:{
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        elevation: 5,

    },
    title:{
        fontSize: 20,
        marginTop: 28,
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        marginTop:  30,
        fontSize: 16,
        
    }, 
    button:{
        backgroundColor: '#1976D2',
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    buttonText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonForgot:{
        marginTop: 14,
        alignSelf: 'center',

    },
    ForgotText:{
        fontSize: 15,
        marginBottom: 30,

    },
    green:{
        backgroundColor: '#32cd32',

    }
})
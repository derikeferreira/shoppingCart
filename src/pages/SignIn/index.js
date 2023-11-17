import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as Animatable from 'react-native-animatable'
import {useNavigation} from '@react-navigation/native'

export default function Forgot() {
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Animatable.Image
                animation="flipInY" 
                delay={500}
                source={require('../../assets/logo1.png')}
                style={{ width: '50%' }}
                resizeMode="contain"
                
                />
            </View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder='Digite um email...'
                    style={styles.input}
                />
                <Text style={styles.title}>Senha</Text>
                
                <View style={{flexDirection: 'row'}}> 
                    <TextInput
                        placeholder='Digite sua senha...'
                        style={styles.input}
                        secureTextEntry={hidePass}
                        flex={1}
                        
                    />
                    <TouchableOpacity  onPress={() => setHidePass(!hidePass)} >
                            <Ionicons name="eye" color="#000000" size={25}/>
                    </TouchableOpacity>
                </View>
                

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Initial')}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={styles.buttonForgot} onPress={() => navigation.navigate('Create')}>
                        <Text style={styles.ForgotText}>Criar nova conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonForgot} onPress={() => navigation.navigate('Forgot')}>
                        <Text style={styles.ForgotText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                    
                </View>
                

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
        flex: 1,
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    message:{
        alignSelf: 'center',
        fontSize: 28,
        color: '#000000',

    },
    containerForm:{
        backgroundColor: '#ffffff',
        flex: 3,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
        elevation: 5,

    },
    title:{
        color: '#000000',
        fontSize: 20,
        marginTop: 28,
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
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
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    
    },
    buttonForgot:{
        alignSelf: 'center',

    },
    ForgotText:{
        fontSize: 15,
        marginTop: 20,
        borderBottomWidth: 1,

    },
   
})
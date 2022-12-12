import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}></View>
            <Avatar
                size={'xlarge'}
                containerStyle={styles.avatar}
                rounded
                title='FV'
            />
            <Input
                label='Login'
                onChangeText={email => setEmail(email)}
            />
            <Input
                label='Senha'
                secureTextEntry={true}
                onChangeText={senha => setSenha(senha)}
            />
            <Button
                title={'Login'}
                buttonStyle={styles.button}
                onPress={() => axios.get(`http://192.168.0.154:5000/login/${email}/${senha}`)
                    .then((response) => {
                        if (response.data) {
                            navigation.navigate('ProductList');
                        } else {
                            showMessage({
                                message: 'E-mail ou senha incorretos',
                                type: 'danger',
                            });
                        }
                    })
                    .catch((error) => {
                        showMessage({
                            message: 'Ocorreu um erro, informe ao desenvolvedor',
                            type: 'danger',
                        });
                    })
                }
            />
            <Button
                title={'Cadastre-se'}
                buttonStyle={[styles.button, { backgroundColor: 'red' }]}
                style={styles.button}
                onPress={() => navigation.navigate('Register')}
            />
            <View style={{ flex: 1 }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 4,
        marginRight: 4,
    },
    avatar: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#a7b0af',
    }

})
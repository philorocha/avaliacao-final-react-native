import { StyleSheet, View } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';
import { useState } from 'react';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

export default function Register({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={{
                    icon: 'arrow-left',
                    type: 'font-awesome',
                    color: '#fff',
                    onPress: () => navigation.navigate('Login')
                }}
            />
            <View style={{ flex: 1 }}></View>

            <Input
                label='Nome'
                onChangeText={nome => setNome(nome)}
            />
            <Input
                label='E-mail'
                onChangeText={email => setEmail(email)}
            />
            <Input
                label='Senha'
                secureTextEntry={true}
                onChangeText={senha => setSenha(senha)}
            />
            <Button
                title={'Salvar'}
                buttonStyle={styles.button}
                onPress={() => axios.post('http://192.168.0.154:5000/register', {
                    nome: nome,
                    email: email,
                    senha: senha
                })
                    .then((response) => {
                        console.log(response.data)
                        if (response.data === false) {
                            showMessage({
                                message: 'E-mail já cadastrado',
                                type: 'danger',
                            });
                        } else {
                            showMessage({
                                message: 'Cadastro realizado!',
                                type: 'success',
                            });
                            navigation.goBack();
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
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
    }
})
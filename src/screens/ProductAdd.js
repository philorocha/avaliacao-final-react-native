import { StyleSheet, View } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';

export default function ProductAdd({ navigation, route }) {
    const { img_url } = route.params;
    const [produto, setProduto] = useState('');
    const [armazenamento, setArmazenamento] = useState('');
    const [valor, setValor] = useState('');

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={{
                    icon: 'arrow-left',
                    type: 'font-awesome',
                    color: '#fff',
                    onPress: () => navigation.navigate('ProductList')
                }}
            />
            <View style={{ flex: 1 }}></View>

            <Input
                label='Nome'
                onChangeText={produto => setProduto(produto)}
            />
            <Input
                label='Capacidade'
                onChangeText={armazenamento => setArmazenamento(armazenamento)}
            />
            <Input
                label='Preço (R$)'
                onChangeText={valor => setValor(valor)}
            />
            <Button
                title={'Salvar'}
                buttonStyle={styles.button}
                onPress={async () => await axios.post('http://192.168.0.154:5000/products', {
                    img_url: img_url,
                    produto: produto,
                    armazenamento: armazenamento,
                    valor: valor
                })
                    .then((response) => {
                        showMessage({
                            message: 'Produto adicionado com sucesso',
                            type: 'success',
                        });
                        navigation.goBack();
                    })
                    .catch((error) => {
                        showMessage({
                            message: 'Ocorreu um erro ao tentar adicionar',
                            type: 'danger',
                        });
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
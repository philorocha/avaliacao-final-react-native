import { StyleSheet, View } from 'react-native';
import { Header, Input, Button } from 'react-native-elements';
import { useState } from 'react';
import axios from 'axios';
import Dialog from 'react-native-dialog';
import { showMessage } from 'react-native-flash-message';

const deleteProduct = async (id, { navigation, route }) => {
    const result = await axios.delete(`http://192.168.0.154:5000/products/${id}`)
        .then((response) => {
            showMessage({
                message: 'Produto excluído',
                type: 'info',
            });
            navigation.goBack();
        })
        .catch((err) => {
            showMessage({
                message: 'Ocorreu um erro, informe ao desenvolvedor',
                type: 'danger',
            });
        })
}

export default function ProductEdit({ navigation, route }) {
    const { id, produto, armazenamento, valor } = route.params;
    const [productName, setProductName] = useState(produto);
    const [productArmazenamento, setProductArmazenamento] = useState(armazenamento);
    const [productValor, setProductValor] = useState(valor);
    const [dialogVisibility, setDialogVisibility] = useState(false);

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
                value={productName}
                onChangeText={productName => setProductName(productName)}
            />
            <Input
                label='Capacidade'
                value={productArmazenamento}
                onChangeText={productArmazenamento => setProductArmazenamento(productArmazenamento)}
            />
            <Input
                label='Preço (R$)'
                value={productValor}
                onChangeText={productValor => setProductValor(productValor)}
            />
            <Button
                title={'Salvar'}
                buttonStyle={styles.button}
                onPress={async () => await axios.put(`http://192.168.0.154:5000/products/${id}`, {
                    produto: productName,
                    armazenamento: productArmazenamento,
                    valor: productValor
                })
                    .then((response) => {
                        showMessage({
                            message: 'Registro alterado com sucesso',
                            type: 'success',
                        });
                        navigation.goBack();
                    })
                    .catch((error) => {
                        showMessage({
                            message: 'Ocorreu um erro ao tentar alterar',
                            type: 'danger',
                        });
                    })
                }
            />
            <Button
                title={'Excluir'}
                buttonStyle={[styles.button, { backgroundColor: 'red' }]}
                onPress={() => setDialogVisibility(true)}
            />
            <View style={{ flex: 1 }}>
                <View>
                    <Dialog.Container visible={dialogVisibility}>
                        <Dialog.Title style={{ textAlign: 'center' }}>Exclusão de produto</Dialog.Title>
                        <Dialog.Description>
                            Deseja realmente excluir o produto?
                        </Dialog.Description>
                        <Dialog.Button label="cancelar" onPress={() => setDialogVisibility(false)} />
                        <Dialog.Button label="Excluir" onPress={() => deleteProduct(id, { navigation })} />
                    </Dialog.Container>
                </View>
            </View>
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
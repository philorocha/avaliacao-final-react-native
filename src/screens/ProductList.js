import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header, Input, Button, ListItem, Avatar, Card, Image } from 'react-native-elements';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

function ProductList({ navigation, route }) {
    const [products, setProducts] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function getProducts() {
            const result = await axios.get('http://192.168.0.154:5000/products')
                .then((data) => {
                    setProducts(data.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getProducts();
    }, [isFocused]);

    const Product = (props) => {
        return (
            <View>
                <View>
                    <Card>
                        <Image
                            source={{ uri: props.img_url }}
                            style={{ height: 200 }}
                            onPress={() => {
                                navigation.navigate('ProductEdit', {
                                    id: props.id,
                                    produto: props.produto,
                                    armazenamento: props.armazenamento,
                                    valor: props.valor
                                })
                            }}
                        />
                        <Text><Text style={styles.description}>Produto: </Text>{props.produto}</Text>
                        <Text><Text style={styles.description}>Armazenamento: </Text>{props.armazenamento}</Text>
                        <Text><Text style={styles.description}>Valor: </Text>{props.valor}</Text>
                    </Card>
                </View>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View>
                <Header
                    rightComponent={{
                        icon: 'plus',
                        type: 'font-awesome',
                        color: '#fff',
                        onPress: () => {
                            axios.get('https://source.unsplash.com/random/?iphone')
                            .then((response) => {
                                console.log(response.request.responseURL);
                                navigation.navigate('ProductAdd', {img_url: response.request.responseURL})
                            })
                            //navigation.navigate('ProductAdd')
                        }
                    }}
                />
            </View>
            <ScrollView>
                {
                    products.map((product, i) => (
                        <Product img_url={product.img_url} produto={product.produto} armazenamento={product.armazenamento} key={i} valor={product.valor} id={product.id} />
                    ))
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    description: {
        fontWeight: 'bold',

    }
})
export default ProductList;
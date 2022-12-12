import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ProductList from './src/screens/ProductList';
import ProductAdd from './src/screens/ProductAdd';
import FlashMessage from 'react-native-flash-message';
import ProductEdit from './src/screens/ProductEdit';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='ProductList' component={ProductList} />
        <Stack.Screen name='ProductAdd' component={ProductAdd} />
        <Stack.Screen name='ProductEdit' component={ProductEdit} />
      </Stack.Navigator>
      <FlashMessage position="bottom" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
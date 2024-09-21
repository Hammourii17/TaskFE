import React, { useState } from 'react';  // Added useState import
import { View, Alert, StyleSheet } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/customButton';
import {useDispatch} from 'react-redux';
import { loginSuccess } from '../../redux/actions/authActions';
import { login } from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);  


    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };


    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        } else if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email');
            return;
        } 
        else if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        setLoading(true);  
       

        try {
        

            const data = await login(email, password);
            dispatch(loginSuccess({ user: data.user, token: data.token }));
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
                if (data.isActive) {

                    navigation.navigate('HomeScreen');  
                } else {
                    Alert.alert('Account Inactive', 'This account is inactive, please wait for the administrator to activate your account.');
                }
         
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', 'An error occurred, please try again later');
        } finally {
            setLoading(false);  
        }
    };

    return (
        <View style={styles.container}>
            <FormField 
                label="Email :"
                value={email}
                onChangeText={setEmail}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCorrect={false}
            />
            <FormField 
            label = "Password :"
                value={password}  
                onChangeText={setPassword}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <CustomButton 
            title = "Sign In"
                buttonTitle="Sign In"
                onPress={handleLogin}
                disabled={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        width: '100%', // Ensures the container takes the full width of the screen
    }
});

export default LoginScreen;

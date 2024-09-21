import React, { useState } from 'react';  // Added useState import
import { View, Alert, StyleSheet } from 'react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
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

        setLoading(true);  
       

        try {
        

            const data = await login(email, password);
            dispatch(loginSuccess({ user: data.user, token: data.token }));
           
                if (data.isActive) {

                    navigation.navigate('HomeScreen');  
                } else {
                    Alert.alert('Account Inactive', 'This account is inactive, please wait for the administrator to activate your account.');
                }
         
        } catch (error) {
            Alert.alert('Error', 'An error occurred, please try again later');
        } finally {
            setLoading(false);  
        }
    };

    return (
        <View style={styles.container}>
            <FormField 
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCorrect={false}
            />
            <FormField 
                value={password}  
                onChangeText={setPassword}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />
            <CustomButton 
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
        backgroundColor: '#fff'
    }
});

export default LoginScreen;

import React , {useState} from "react";
import {View , Alert , StyleSheet } from "react-native";
import CustomButton from "../../components/customButton";
import FormField from "../../components/FormField";

const RegisterScreen = ({navigation}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [username , setUsername] = useState('');

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    const handleRegister = async () => {
        if(username.length < 8)
        {
            Alert.alert('Error','Username must be at least 8 characters');
            return;
        }
        if(!validateEmail(email))
        {
            Alert.alert('Error','Invalid email address');
            return;
        }
        if(!validatePassword(password))
        {
            Alert.alert('Error','Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter');
            return;
        }
        if(password !== confirmPassword)
        {
            Alert.alert('Error','Passwords do not match');
            return;
        }
try {
        // Call the API to register the user
         const response = await fetch('https://192.168.137.123:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username,email,password})
            });

            const data = await response.json();
            
            if (response.ok) {
                Alert.alert('Success', data.message || 'User registered successfully, awaiting activation');
                navigation.navigate('LoginScreen');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                Alert.alert('Error', data.message || 'An error occurred during registration');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while registering');
        }
    };

    return (
        <View style={styles.container}>
            <FormField 
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            />
            <FormField 
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            />
            <FormField 
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            <FormField 
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            />
            <CustomButton title="Register" onPress={handleRegister} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});
export default RegisterScreen;
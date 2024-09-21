import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const FormField = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {   
    return (
        <View style={styles.containerStyle}>
            <Text>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                style={styles.inputStyle}
            />
        </View>
    );
}
const styles = StyleSheet.create({  
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    }
});

export default FormField;
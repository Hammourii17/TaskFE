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
        height: 50,
        flexDirection: 'column',  // changed from row to column
        alignItems: 'flex-start',  // align label on the left
        marginVertical: 10,  // add margin between fields
        width: '100%',  // full width of the parent container
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        borderColor: '#ccc',  // add border color
        borderWidth: 1,       // add border width for input field
        borderRadius: 5,      // slightly rounded corners
        width: '100%',        // make input take the full width of container
    }
});


export default FormField;
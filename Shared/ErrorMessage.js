import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// The props will be receive from parent component
const ErrorMessage = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.msg}>{props.message}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        margin: 10
    },

    msg: {
        color: 'red'
    }
})

export default ErrorMessage;

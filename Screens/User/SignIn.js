import React, {useEffect,useContext, useState} from 'react';
import {Text, View, StyleSheet, Button} from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import ErrorMessage from "../../Shared/ErrorMessage";

// Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import {loginUser} from "../../Context/actions/authActions";

const SignIn = (props) => {
    const context = useContext(AuthGlobal)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // useEffect will make actions when the components start
    // It will check if the context has a user or not in order to make some actions
    useEffect(() => {
        if(context.stateUser.isAuthenticated === true){
            props.navigation.navigate('Profile')
        }
    }, [context.stateUser.isAuthenticated]) // This will trigger every time the context is authenticated

    const submitHandler = () => {
        const user = {
            email,
            password
        }

        if (email === '' || password === ''){
            setError('Please fill your details')
        } else{
            loginUser(user, context.dispatch) // This will pass the user object
        }
    }

    useEffect(() => {
        setError();
    })
    return(
        <FormContainer title={'Sign In'}>
            <Input
                placeholder={'Enter Email'}
                name={'email'}
                id={'email'}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
                placeholder={'Enter Password'}
                name={'password'}
                id={'password'}
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                {error ? <ErrorMessage message={error} /> : null}
                <Button
                    title="SignIn"
                    onPress={() => props.navigation.navigate('ProductContainer')}
                />
            </View>
            <View style={[{marginTop: 40}, styles.buttonGroup]}>
                <Text style={styles.centerText}>
                    Don't have an account ? Sign UP
                </Text>
                <Button
                    title={'SignUp'}
                    onPress={() => props.navigation.navigate('SignUp')}
                />
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center'
    },
    centerText: {
        marginBottom: 20,
        alignSelf: 'center'
    }
})

export default SignIn

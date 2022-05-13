import React, {useState} from 'react';
import {Text, View, StyleSheet, Button} from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import ErrorMessage from "../../Shared/ErrorMessage";
import Toast from 'react-native-toast-message'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import axios from 'axios';
import baseURL from "../../assets/api/baseURL";

const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')


    const signUp = () => {
        if (name === '' || email === '' || password === '' || phone === ''){
            setError('Please fill the missing details')
        }

        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false // The server requires if the user registering is an Admin or not
        }

        axios
            .post(`${baseURL}users/register`, user)
            .then((res) =>{
                if(res.status == 200){
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: 'SignUp was successful',
                        text2: 'Please SignIn your account'
                    })
                    setTimeout(() => {
                        props.navigation.navigate('SignIn')
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'Something went wrong',
                    text2: 'Please try again'
                }
                )
            })

    }
    return(
        <View>
            <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={180}
                enableOnAndroid={true}
            >
                <FormContainer title={'Sign Up'}>
                    <Input
                        placeholder={'Enter Email'}
                        name={'email'}
                        id={'email'}
                        onChangeText={(text) => setEmail(text.toLowerCase())}
                        value={email}
                    />
                    <Input
                        placeholder={'Enter Name'}
                        name={'name'}
                        id={'name'}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <Input
                        placeholder={'Enter Phone Number'}
                        name={'phone'}
                        id={'phone'}
                        onChangeText={(text) => setPhone(text)}
                        value={phone}
                    />
                    <Input
                        placeholder={'Enter Password'}
                        name={'password'}
                        id={'password'}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <View style={styles.groupButton}>
                        {error ? <ErrorMessage message={error} /> : null}
                    </View>
                    <View>
                        <Button
                            title={'Sign Up'}
                            onPress={() => signUp()}
                        />
                    </View>
                    <View>
                        <Text>Already have an account?</Text>
                        <Button
                            title={'Sign In'}
                            onPress={() => props.navigation.navigate('SignIn')}
                        />
                    </View>
                </FormContainer>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    groupButton: {
        width: '80%',
        margin: 10,
        alignItems: 'center'
    }
})

export default SignUp;

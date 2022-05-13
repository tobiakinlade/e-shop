import React, {useState, useContext, useCallback, useEffect} from 'react';
import {Text, View,Button, StyleSheet, ScrollView} from "react-native";
import {Container} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//api
import axios from "axios";
import baseURL from "../../assets/api/baseURL";

// Context API
import AuthGlobal from "../../Context/store/AuthGlobal";
import {logoutUser} from "../../Context/actions/authActions";

const Profile = (props) => {
    const context = useContext(AuthGlobal)
    const [profile, setProfile] = useState()

    // This will check if user is logged in
    useEffect(() => {
        if(
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ){
            props.navigation.navigate('SignUp')
        }

        AsyncStorage.getItem('jwt')
            .then((res) => {
                axios
                    .get(`${baseURL}users/${context.stateUser.user.sub}`, {
                        headers: { Authorization: `Bearer ${res}` }
                    })
                    .then((user) => setProfile(user.data))
            })
            .catch((error) => console.log(error))
        return () => {
            setProfile();
        }
    }, [context.stateUser.isAuthenticated])

    return(
        <Container>
            <ScrollView>
                <Text style={{fontSize: 30}}>
                    {profile ? profile.name : ''}
                </Text>
                <View style={{marginTop: 20}}>
                    <Text style={{margin: 10}}>Email: {profile ? profile.email : ''}</Text>
                    <Text style={{margin: 10}}>Phone: {profile ? profile.phone : ''}</Text>
                </View>
                <View style={{marginTop: 80}}>
                    <Button
                        title={"Sign Out"}
                        onPress={() => [
                            AsyncStorage.removeItem('jwt'),
                            logoutUser(context.dispatch)
                        ]}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

export default Profile

import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import SignUp from "../Screens/User/SignUp";
import SignIn from "../Screens/User/SignIn";


const Stack = createStackNavigator();
// This function will return stack screens associated with the user
function MyStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    )
}

export default function InitialNavigator(){
    return <MyStack />
}


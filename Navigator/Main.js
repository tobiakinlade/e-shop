import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

//Stacks
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";

import UserNavigator from "./UserNavigator";

import CartIcon from "../Shared/CartIcon";
import {createStackNavigator} from "@react-navigation/stack";
import SignIn from "../Screens/User/SignIn";

const Tab = createBottomTabNavigator();


const Main = () => {

    return (

        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#e91e63'
            }}
        >
            <Tab.Screen name="Home"
                        component={HomeNavigator}
                        options={{
                            tabBarIcon: ({color}) => (
                                <Icon
                                    name="home"
                                    style={{position: "relative"}}
                                    color={color}
                                    size={30}
                                />
                            )
                        }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <View>
                            <Icon
                                name="shopping-cart"
                                color={color}
                                size={30}
                            />
                            <CartIcon />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            name="user"
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Main

import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ProductContainer from "../Screens/Products/ProductContainer";
import SingleProduct from "../Screens/Products/SingleProduct";
import Cart from "../Screens/Cart/Cart";
import CheckoutNavigator from "./CheckoutNavigator";

const Stack = createStackNavigator()

function MyStack () {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="CheckOut"
                component={CheckoutNavigator}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator(){
    return(
        <MyStack />
    )
}

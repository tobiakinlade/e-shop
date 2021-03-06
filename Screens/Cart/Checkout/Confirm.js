import React from 'react';
import {View, Button, StyleSheet, Dimensions,ScrollView} from 'react-native';
import {
    Text,
    Left,
    Right,
    Thumbnail,
    ListItem,
    Body
} from 'native-base'

import {connect} from "react-redux";
import * as actions from '../../../Redux/Actions/cartAction'
import axios from "axios";
import baseURL from "../../../assets/api/baseURL";
import Toast from 'react-native-toast-message'

let {height, width} = Dimensions.get('window')
const Confirm = (props) => {

    const finalOrder = props.route.params

    const confirmOrder = () => {
        const order = finalOrder.order.order

        axios
            .post(`${baseURL}orders`, order) // this will pass the oder object that comes from finalOrder
            .then((res) => {
                if (res.status == 200){
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: 'Order was successful'
                    })
                    setTimeout(() => {
                        props.clearCart();
                        props.navigation.navigate('Cart')
                    }, 500)
                }
            }).catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'Unable to complete order',
                    text2: 'Please try again'
                })
            })


    }

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}
                    >Confirm Order</Text>
                    {props.route.params ? <View
                        style={{borderWidth: 1, borderColor: 'orange'}}
                    >
                        <Text style={styles.title}>Shipping to: </Text>
                        <View style={{padding: 8}} >
                            <Text>Address: {finalOrder.order.order.shippingAddress}</Text>
                            <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                            <Text>City: {finalOrder.order.order.city}</Text>
                            <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                            <Text>Country: {finalOrder.order.order.country}</Text>
                        </View>
                        <Text style={styles.title}>Items:</Text>
                        {finalOrder.order.order.orderItems.map((x) => {
                            return(
                                <ListItem
                                    style={styles.listItem}
                                    key={x.product.name}
                                    avatar
                                >
                                    <Left>
                                        <Thumbnail source={{uri: x.product.image}} />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Left>
                                            <Text>{x.product.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>?? {x.product.price}</Text>
                                        </Right>
                                    </Body>

                                </ListItem>
                            )
                        })}
                    </View>: null}
                    <View style={{alignItems: 'center', margin: 20}}>
                        <Button
                            title="Place Order"
                            onPress={confirmOrder}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        clearCart: () => dispatch(actions.clearCart())
    }
}

const styles = StyleSheet.create({
    container:{
        height: height,
        alignContent: 'center',
        padding: 8,
        backgroundColor: 'white'
    },
    titleContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    title: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    listItem: {
        alignContent: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width / 1.2
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

// The first is null because the parameters do not have mapStateToProps but rather mapDispatchToProps
export default connect(null, mapDispatchToProps)(Confirm)

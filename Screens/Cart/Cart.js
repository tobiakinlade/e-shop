import React from 'react';
import {View, StyleSheet, Dimensions, Button, TouchableOpacity} from "react-native";
import {Container, Text, Left, Right, H1, ListItem, Thumbnail, Body} from 'native-base';
import {SwipeListView} from "react-native-swipe-list-view";
import CartItem from "./CartItem";
import Icon from "react-native-vector-icons/FontAwesome";
// This method will allow us to connect to our store and have access to the state of the store
// we the need to make the state of the store to props
import {connect} from 'react-redux'

let {width, height} = Dimensions.get('window')
import * as actions from '../../Redux/Actions/cartAction'
// we can call the cartItems as single props
const Cart = (props) => {
    let total = 0;
    // this will loop through the price of each element passed to the cart component
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    })
    return(
        // firstly we will check if the cart is empty
        <>
            {props.cartItems.length ? (
                <Container >
                    <SwipeListView
                        data={props.cartItems}
                        renderItem={(data) => (
                            <CartItem item={data} />
                            )
                        }
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity
                                    onPress={() => props.removeFromCart(data.item)}
                                    style={styles.hiddenButton}
                                >
                                    <Icon name="trash" color="white" size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />
                    <View style={styles.bottomContainer}>
                        <Left>
                            <Text style={styles.price}>
                               £ {total}
                            </Text>
                        </Left>
                        <Right>
                            <Button
                                title="Clear"
                                onPress={() => props.clearCart()}
                            />
                        </Right>
                        <Right>
                            <Button
                                title="Checkout"
                                onPress={() => props.navigation.navigate('CheckOut')}
                            />
                        </Right>
                    </View>
                </Container>
            ) : <Container style={styles.emptyContainer}>
                <Text>
                    Looks like your car is empty
                </Text>
                <Text>
                    Add products to your cart to get started
                </Text>
            </Container>
            }
        </>
    )
}

// Because cartItem reduces has been created, this would map the function to the state
const mapStateToProps = (state) => {
    const {cartItems} = state;
    return {
        cartItems: cartItems
    }
}

// This will return the method created in the actions folder
const mapDispatchToProps = (dispatch) => {
    return{
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        // height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        elevation: 20,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    }
})

// export default Cart
// this will take the item to the store
// we call the null so that it can dispatch the items to the state
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

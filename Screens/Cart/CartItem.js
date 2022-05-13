import React, {useState, useEffect} from 'react';
import {StyleSheet} from "react-native";
import {Text, Left, Right, ListItem, Thumbnail, Body} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'



const CartItem = (props) => {
    const [data, setData] = useState(props.item.item.product)
    const [value, setValue] = useState('')

    const [quantity, setQuantity] = useState(props.item.item.quality);




    return(
        <ListItem
            style={styles.listItem}
            key={Math.random()}
            avatar
        >
            <Left>
                <Thumbnail source={{
                    uri: data.image ? data.image: 'http://clipart-library.com/image_gallery/246740.png'
                }} />
            </Left>
            <Body style={styles.body}>
                <Left>
                    <Text>{data.name}</Text>
                </Left>
                <Right>
                    <Text> £ {data.price}</Text>
                </Right>
            </Body>
        </ListItem>
    )
}

const styles = StyleSheet.create({
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

})

export default CartItem;

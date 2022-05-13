import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, Button, ScrollView} from 'react-native';
import {Left, Right, Container, H1} from 'native-base'
import Toast from 'react-native-toast-message'

import {connect} from 'react-redux';
import * as actions from '../../Redux/Actions/cartAction'


const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null)
    return(
        <Container >
            <ScrollView style={{marginBottom: 80, padding: 5}}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.image ? item.image: 'http://clipart-library.com/image_gallery/246740.png' }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.brand}</Text>
                    <Text>{item.richDescription}</Text>
                </View>
                {/*{ Todo: Description, RichDescription and Availability }*/}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>£ {item.price}</Text>
                </Left>
                <Right>
                    <Button
                        title="Add "
                        onPress={() => {props.addItemToCart(item),
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: `${item.name} added to cart`
                        })
                        }}

                    />
                </Right>
            </View>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({quantity: 1, product})),
    };
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer:{
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image:{
        width: '100%',
        height: 250
    },
    contentContainer:{
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader:{
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer:{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price:{
        fontSize: 24,
        margin: 20,
        color: 'red'
    }
})

export default connect(null, mapDispatchToProps)(SingleProduct)

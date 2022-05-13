import React from 'react';
import {View, StyleSheet, Dimensions} from "react-native";
import {Content, Left, Body, ListItem, Thumbnail, Text} from 'native-base';

let {width} = Dimensions.get("window")

const SearchedProduct = (props) => {
    const {productsFiltered} = props
    return(
        <Content style={{width: width}}>
            {productsFiltered.length > 0 ?
            productsFiltered.map((item) => (
                <ListItem
                    onPress={() => props.navigation.navigate('Product Detail', {item: item})}
                    key={item._id}
                    avatar
                >
                    <Left>
                        <Thumbnail
                            source={{uri: item.image ? item.image : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg'}}
                        />
                    </Left>
                    <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.description}</Text>
                    </Body>
                </ListItem>
            )
            ) : (
                <View style={styles.center}>
                    <Text style={{alignSelf: 'center'}}>
                        No product match the selected criteria
                    </Text>
                </View>
                )
            }
        </Content>
    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SearchedProduct;

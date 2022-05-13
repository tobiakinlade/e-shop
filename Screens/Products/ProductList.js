import React from 'react';
import { View, TouchableOpacity, Dimensions } from "react-native";

import ProductCard from "./ProductCard";

let {width} = Dimensions.get("window");
const ProductList = (props) => {
    const {item} = props;
    return(
        <View>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Product Detail', {item: item})}
                style={{ width: "50%" }}>
                <View style={{ width: width / 2, backgroundColor:  'gainsboro'}}>
                    <ProductCard {...item} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProductList

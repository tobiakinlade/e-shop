import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View,ScrollView, StyleSheet,Dimensions, ActivityIndicator, FlatList} from "react-native";
import {Container, Header, Icon, Item, Input, Text} from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import baseURL from "../../assets/api/baseURL";
import axios from 'axios';

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

let { height } = Dimensions.get('window')
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // The useFocusEffect and useCallback is used instead to always call back the restful api after navigating to the single product screen
    // The useCallback will make another call to the restful api
    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);

                // Getting all products
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                        setIsLoading(false)
                    }).catch((error) => {
                    console.log(error)
                })

                // Getting product categories
                axios
                    .get(`${baseURL}categories`)
                    .then((res) => {
                        setCategories(res.data)
                    })
                    .catch((error) => {
                        console.log('Api call error')
                    })


                return () => {
                    setProducts([])
                    setProductsFiltered([])
                    setFocus()
                    setCategories([])
                    setActive()
                    setInitialState()
                }
            }, [],
        )
    ))



    // Product Methods
    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false)
    }

    // Categories
    const changeCtg = (ctg) => {
        {
            ctg === 'all'
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                    setProductsCtg(
                        products.filter((i) => i.category.name === ctg),
                        setActive(true)
                    )
                ]
        }
    }

    return (
        <>{ isLoading == false ? (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            placeholder="Search"
                            onFocus={openList}
                            onChangeText = {(text) => searchProduct(text)}
                        />
                        {focus == true ? (
                            <Icon onPress={onBlur} name="ios-close" />
                        ) : null}
                    </Item>
                </Header>
                {focus == true? (
                    <SearchedProduct
                        navigation={props.navigation}
                        productsFiltered={productsFiltered}
                    />
                ) : (
                    <ScrollView>
                        <View>
                            <View>
                                <Banner />
                            </View>
                            <View>
                                <CategoryFilter
                                    categories={categories}
                                    categoryFilter={changeCtg} // this will send the method created
                                    productsCtg={productsCtg}
                                    active={active}
                                    setActive={setActive}
                                />
                            </View>
                            {productsCtg.length > 0 ? (
                                <View style={styles.listContainer}>
                                    {productsCtg.map((item) => {
                                        return(
                                            <ProductList
                                                navigation={props.navigation}
                                                key={item._id}
                                                item={item}
                                            />
                                        )
                                    })}
                                </View>
                            ) : (
                                <View style={[styles.center, { height: height / 2}]}>
                                    <Text>No products found</Text>
                                </View>
                            )}

                        </View>
                    </ScrollView>
                )}
            </Container>
        ) : (
            <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
                <ActivityIndicator size="large" color="red" />
            </Container>
        )}
        </>



    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductContainer;


import {createStore, combineReducers, applyMiddleware} from "redux";
import {persistStore} from "redux-persist";
import {persistReducer} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage'


import cartItems from "./Reducers/cartItems";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cartItems']
}

const reducers = combineReducers({
    cartItems: cartItems,
});

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return {store, persistor}
}



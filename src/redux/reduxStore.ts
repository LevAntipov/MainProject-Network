import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import usersReducer from "./usersReducer";
//@ts-ignore
import authReducer from "./authReducer";
import appReducer from "./appReducer";

const store = configureStore({
  reducer: {
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Подключаем thunk вручную
  devTools: true, // Автоматически включает Redux DevTools
});

// Get the type of our store variable
export type AppStateType = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStateType['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStateType['dispatch']


// Для дебага в консоли (если нужно)
// @ts-ignore  
window.store = store;

export default store;




 














// import { applyMiddleware, combineReducers, createStore, compose } from "redux";
// import {thunk} from "redux-thunk";

// import profileReducer from "./profileReducer";
// import messagesReducer from "./messagesReducer";
// import usersReducer from "./usersReducer";
// import authReducer from "./authReducer";
// import appReducer from "./appReducer";
// //import { reducer as formReducer } from 'redux-form'

// let reducers = combineReducers({   // объяснение названия ключей объекта:
//     profilePage: profileReducer,   // за --profile page-- отвечает profile reducer,который возвращает объект
//     messagesPage: messagesReducer, // за --messages page -- отвечает messages reducer
//                                    //...
//     usersPage: usersReducer,
//     auth:authReducer,
//     //обязательно называем form, тк библиотека по дефолту будет обращаться к нему
//     // form:formReducer,
//     app:appReducer
// })

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// //Это было до расширения гугл redux
// //applyMiddleware - промежуточный уровень, чтобы диспатчить функцию
// //let store = createStore(reducers, applyMiddleware(thunk));

// window.store = store;

// export default store
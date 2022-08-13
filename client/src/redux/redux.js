import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from './reducers/index';


const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(()=>{
    console.log(store.getState())
})

export default store;
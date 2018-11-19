import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import CommentApp from './containers/CommentApp'
import {createStore} from "redux";
import commentsReducer from "./reducers/commentsReducer";


const store = createStore(commentsReducer)

ReactDOM.render(
    <Provider store={store}>
        <CommentApp/>
    </Provider>,
document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

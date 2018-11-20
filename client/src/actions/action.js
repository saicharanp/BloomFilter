import { actionTypes } from '../actionTypes';
import { indexApi } from '../api/api';
import store from '../store';
const Q = require('q');

export const indexAction = () => {
    store.dispatch({type: actionTypes.INDEX_ALL_WORDS_START});
    Q.when(indexApi())
    .then(() => {
        store.dispatch({type: actionTypes.INDEX_ALL_WORDS_SUCCESS});
    })
    .fail(() => {
        store.dispatch({type: actionTypes.INDEX_ALL_WORDS_FAILURE});
    });
};
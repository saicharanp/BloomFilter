import { actionTypes } from '../actionTypes';
import { indexApi, statusApi, addWordApi } from '../api/api';
import store from '../store';
const Q = require('q');

export const indexAction = () => {
    store.dispatch({type: actionTypes.INDEX_ALL_WORDS_START});
    Q.when(indexApi())
    .then(() => {
        store.dispatch({type: actionTypes.INDEX_ALL_WORDS_SUCCESS});
        store.dispatch(statusAction());
    })
    .fail(() => {
        store.dispatch({type: actionTypes.INDEX_ALL_WORDS_FAILURE});
    });
};

export const statusAction = () => {
    store.dispatch({type: actionTypes.GET_INDEXING_STATUS_START});
    Q.when(statusApi())
    .then((data) => {
        const status = data && data.status;
        store.dispatch({type: actionTypes.GET_INDEXING_STATUS_SUCCESS, status: status});
        if(status === 'RUNNING')
            store.dispatch(setTimeout(() => statusAction(), 30));
    })
    .fail((err) => {
        store.dispatch({type: actionTypes.GET_INDEXING_STATUS_FAILURE, error: err});
    });
};

export const updateAddWordAction = (value) => {
    store.dispatch({type: actionTypes.UPDATE_ADD_WORD, value});
}

export const sendAddWordAction = () => {
    store.dispatch({type: actionTypes.ADD_WORD_TO_SET_START});
    const state = store.getState(), 
        word = state && state.addWord;
    Q.when(addWordApi(word))
    .then((data) => {
        const isAdded = data && data.isAdded;
        store.dispatch({type: actionTypes.ADD_WORD_TO_SET_SUCCESS, isAdded});
    })
    .fail((err) => {
        store.dispatch({type: actionTypes.ADD_WORD_TO_SET_FAILURE, isAdded: false});
    });
};

export const updateTestWordAction = (value) => {
    store.dispatch({type: actionTypes.UPDATE_TEST_WORD, value});
}


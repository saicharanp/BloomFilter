import { actionTypes } from '../actionTypes';
import store from '../store';

export const startIndexing = () => {
    store.dispatch({type: actionTypes.INDEX_ALL_WORDS_START});
};

import { actionTypes } from "./actionTypes";
import { indexApi, statusApi, addWordApi, testWordApi } from "./api";
import store from "./store";
const Q = require("q");

/**
 *  Actions for index words and status
 */
export const indexAction = () => {
  store.dispatch({ type: actionTypes.INDEX_ALL_WORDS_START });
  Q.when(indexApi())
    .then(() => {
      store.dispatch({ type: actionTypes.INDEX_ALL_WORDS_SUCCESS });
      store.dispatch(statusAction());
    })
    .fail(() => {
      store.dispatch({ type: actionTypes.INDEX_ALL_WORDS_FAILURE });
    });
};

export const statusAction = () => {
  store.dispatch({ type: actionTypes.GET_INDEXING_STATUS_START });
  Q.when(statusApi())
    .then(data => {
      const status = data && data.index && data.index.status;
      store.dispatch({
        type: actionTypes.GET_INDEXING_STATUS_SUCCESS,
        status: status
      });
      if (status === "RUNNING")
        store.dispatch(setTimeout(() => statusAction(), 30));
    })
    .fail(() => {
      store.dispatch({ type: actionTypes.GET_INDEXING_STATUS_FAILURE });
    });
};

/**
 *  Actions for Add Word
 */
export const updateAddWordAction = value => {
  store.dispatch({ type: actionTypes.UPDATE_ADD_WORD, value });
};

export const sendAddWordAction = () => {
  store.dispatch({ type: actionTypes.ADD_WORD_TO_SET_START });
  const state = store.getState(),
    addWord = state && state.add && state.add.addWord;
  Q.when(addWordApi(addWord))
    .then(() => {
      store.dispatch({ type: actionTypes.ADD_WORD_TO_SET_SUCCESS });
    })
    .fail(() => {
      store.dispatch({ type: actionTypes.ADD_WORD_TO_SET_FAILURE });
    });
};

/**
 *  Actions for Test Word
 */
export const updateTestWordAction = value => {
  store.dispatch({ type: actionTypes.UPDATE_TEST_WORD, value });
};

export const sendTestWordAction = () => {
  store.dispatch({ type: actionTypes.TEST_WORD_IN_SET_START });
  const state = store.getState(),
    testWord = state && state.test && state.test.testWord;
  Q.when(testWordApi(testWord))
    .then(data => {
      const isPresent = data && data.isPresent;
      store.dispatch({ type: actionTypes.TEST_WORD_IN_SET_SUCCESS, isPresent });
    })
    .fail(() => {
      store.dispatch({ type: actionTypes.TEST_WORD_IN_SET_FAILURE });
    });
};

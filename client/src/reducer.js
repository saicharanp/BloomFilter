import { actionTypes } from "./actionTypes";

const initialState = {
  index: {
    status: "NOT_INDEXED"
  },
  add: {
    addWord: "",
    isAdded: false,
    isAddFailed: false
  },
  test: {
    testWord: "",
    isTested: false,
    isPresent: false,
    isTestFailed: false
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INDEX_ALL_WORDS_START: {
      return {
        ...initialState //Reset everything when indexing is triggered
      };
    }

    case actionTypes.GET_INDEXING_STATUS_SUCCESS: {
      return {
        ...state,
        status: action.status
      };
    }

    case actionTypes.UPDATE_ADD_WORD:
    case actionTypes.ADD_WORD_TO_SET_SUCCESS:
    case actionTypes.ADD_WORD_TO_SET_FAILURE: {
      return {
        ...state,
        add: addWordReducer(state.add, action)
      };
    }

    case actionTypes.UPDATE_TEST_WORD:
    case actionTypes.TEST_WORD_IN_SET_SUCCESS:
    case actionTypes.TEST_WORD_IN_SET_FAILURE: {
      return {
        ...state,
        test: testWordReducer(state.test, action)
      };
    }

    default:
      return state;
  }
};

const addWordReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ADD_WORD: {
      return {
        ...state,
        addWord: action.value,
        isAdded: false,
        isAddFailed: false
      };
    }

    case actionTypes.ADD_WORD_TO_SET_SUCCESS: {
      return {
        ...state,
        isAdded: true,
        isAddFailed: false
      };
    }

    case actionTypes.ADD_WORD_TO_SET_FAILURE: {
      return {
        ...state,
        isAddFailed: true
      };
    }

    default:
      return state;
  }
};

const testWordReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TEST_WORD: {
      return {
        ...state,
        testWord: action.value,
        isPresent: false,
        isTested: false,
        isTestFailed: false
      };
    }

    case actionTypes.TEST_WORD_IN_SET_SUCCESS: {
      return {
        ...state,
        isPresent: action.isPresent,
        isTested: true,
        isTestFailed: false
      };
    }

    case actionTypes.TEST_WORD_IN_SET_FAILURE: {
      return {
        ...state,
        isTestFailed: true
      };
    }

    default:
      return state;
  }
};
export default rootReducer;

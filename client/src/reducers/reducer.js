import { actionTypes } from "../actionTypes";

const initialState = {
  status: 'NOT_INDEXED',
  addWord: '',
  testWord: '',
  isAdded: false,
  isAddFailed: false,
  isTested: false,
  isPresent: false,
  isTestFailed: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INDEXING_STATUS_SUCCESS: {
        return {
            ...state,
            status: action.status
        };
    }

    case actionTypes.UPDATE_ADD_WORD: {
      return {
        ...state,
        addWord: action.value,
        isAdded: false,
      };
    }

    case actionTypes.ADD_WORD_TO_SET_SUCCESS: {
      return {
        ...state,
        isAdded: true,
        isAddFailed: false,
      }
    }

    case actionTypes.ADD_WORD_TO_SET_FAILURE: {
      return {
        ...state,
        isAddFailed: true,
      }
    }

    case actionTypes.UPDATE_TEST_WORD: {
      return {
        ...state,
        testWord: action.value,
        isPresent: false,
        isTested: false,
        isTestFailed: false,
      };
    }

    case actionTypes.TEST_WORD_IN_SET_SUCCESS: {
      return {
        ...state,
        isPresent: action.isPresent,
        isTested: true,
        isTestFailed: false,
      }
    }

    case actionTypes.TEST_WORD_IN_SET_FAILURE: {
      return {
        ...state,
        isTestFailed: true,
      }
    }

    default:
      return state;
  }
};
export default rootReducer;
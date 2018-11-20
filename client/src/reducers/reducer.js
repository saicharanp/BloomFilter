import { actionTypes } from "../actionTypes";

const initialState = {
  status: 'NOT_INDEXED',
  addWord: '',
  testWord: '',
  isAdded: false,
  isAddFailed: false,
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

    case actionTypes.UPDATE_TEST_WORD: {
      return {
        ...state,
        testWord: action.value,
        isPresent: false,
        isAddFailed: false,
      };
    }

    case actionTypes.ADD_WORD_TO_SET_SUCCESS: {
      return {
        ...state,
        isAdded: true,
      }
    }

    case actionTypes.ADD_WORD_TO_SET_FAILURE: {
      return {
        ...state,
        isAddFailed: true,
      }
    }

    default:
      return state;
  }
};
export default rootReducer;
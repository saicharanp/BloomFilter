import { actionTypes } from "../actionTypes";

const initialState = {
  isIndexingCompleted: false,
  isIndexingInProgress: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INDEX_ALL_WORDS_START: {
        return {
            ...state,
            isIndexingInProgress: true
        };
    }
    case actionTypes.INDEX_ALL_WORDS_SUCCESS: {
        return {
            ...state,
            isIndexingInProgress: false,
            isIndexingCompleted: true
        };
    }
    case actionTypes.INDEX_ALL_WORDS_FAILURE: {
        return {
            ...state,
            isIndexingInProgress: false,
            isIndexingCompleted: false
        };
    }
    default:
      return state;
  }
};
export default rootReducer;
import * as _ from "lodash";
import reducer from "../reducer";
import { actionTypes } from "../actionTypes";

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

describe("bloom filter index reducer", () => {
  it("should reset the state correctly when indexing is triggered", () => {
    const indexAction = {
      type: actionTypes.INDEX_ALL_WORDS_START
    };
    const newState = reducer({}, indexAction);
    expect(newState).toEqual(initialState);
  });

  it("should set the status correctly", () => {
    const statusAction = {
      type: actionTypes.GET_INDEXING_STATUS_SUCCESS,
      status: "TEST_STATUS"
    };
    const newState = reducer(initialState, statusAction);
    expect(_.get(newState, "index.status")).toEqual("TEST_STATUS");
  });
});

describe("bloom filter add reducer", () => {
  it("should set the add word correctly", () => {
    const updateAddWordAction = {
      type: actionTypes.UPDATE_ADD_WORD,
      value: "addword"
    };
    const newState = reducer(initialState, updateAddWordAction);
    const expectedAddState = {
      addWord: "addword",
      isAdded: false,
      isAddFailed: false
    };
    expect(_.get(newState, "add")).toEqual(expectedAddState);
  });

  it("works as expected when word is added to set successfully", () => {
    const setAddWordSuccessAction = {
      type: actionTypes.ADD_WORD_TO_SET_SUCCESS
    };
    const newState = reducer(initialState, setAddWordSuccessAction);
    const expectedAddState = {
      addWord: "",
      isAdded: true,
      isAddFailed: false
    };
    expect(_.get(newState, "add")).toEqual(expectedAddState);
  });

  it("works as expected when add operation fails", () => {
    const setAddWordFailureAction = {
      type: actionTypes.ADD_WORD_TO_SET_FAILURE
    };
    let newInitialState = _.cloneDeep(initialState);
    _.set(newInitialState, "add.addWord", "failedAddWord");
    const newState = reducer(newInitialState, setAddWordFailureAction);
    const expectedAddState = {
      addWord: "failedAddWord",
      isAdded: false,
      isAddFailed: true
    };
    expect(_.get(newState, "add")).toEqual(expectedAddState);
  });
});

describe("bloom filter test reducer", () => {
  it("should set the test word correctly", () => {
    const updateTestWordAction = {
      type: actionTypes.UPDATE_TEST_WORD,
      value: "testword"
    };
    const newState = reducer(initialState, updateTestWordAction);
    const expectedTestState = {
      testWord: "testword",
      isTested: false,
      isPresent: false,
      isTestFailed: false
    };
    expect(_.get(newState, "test")).toEqual(expectedTestState);
  });

  it("works as expected when word is tested successfully and is present in set", () => {
    const setTestWordSuccessAction = {
      type: actionTypes.TEST_WORD_IN_SET_SUCCESS,
      isPresent: true
    };
    const newState = reducer(initialState, setTestWordSuccessAction);
    const expectedTestState = {
      testWord: "",
      isTested: true,
      isPresent: true,
      isTestFailed: false
    };
    expect(_.get(newState, "test")).toEqual(expectedTestState);
  });

  it("works as expected when word is tested successfully and is not present in set", () => {
    const setTestWordSuccessAction = {
      type: actionTypes.TEST_WORD_IN_SET_SUCCESS,
      isPresent: false
    };
    const newState = reducer(initialState, setTestWordSuccessAction);
    const expectedTestState = {
      testWord: "",
      isTested: true,
      isPresent: false,
      isTestFailed: false
    };
    expect(_.get(newState, "test")).toEqual(expectedTestState);
  });

  it("works as expected when test operation fails", () => {
    const setTestWordFailureAction = {
      type: actionTypes.TEST_WORD_IN_SET_FAILURE
    };
    let newInitialState = _.cloneDeep(initialState);
    _.set(newInitialState, "test.testWord", "failedTestWord");
    const newState = reducer(newInitialState, setTestWordFailureAction);
    const expectedTestState = {
      testWord: "failedTestWord",
      isTested: false,
      isPresent: false,
      isTestFailed: true
    };
    expect(_.get(newState, "test")).toEqual(expectedTestState);
  });
});

import { GridContainer } from "../../components/GridContainer";
import { shallow } from "enzyme";
import React from "react";
const _ = require("lodash");
import IndexGrid from "../../components/Grids/IndexGrid";
import AddWordGrid from "../../components/Grids/AddWordGrid";
import TestWordGrid from "../../components/Grids/TestWordGrid";

const exampleClassesProps = {
  layout: {},
  cardGrid: {}
};

describe("<GridContainer />", () => {
  it("renders grid container correctly", () => {
    const wrapper = shallow(
      <GridContainer classes={exampleClassesProps} getIndexStatus={_.noop} />
    );
    expect(wrapper.contains(<IndexGrid />)).toBe(true);
    expect(wrapper.contains(<AddWordGrid />)).toBe(true);
    expect(wrapper.contains(<TestWordGrid />)).toBe(true);
  });
});

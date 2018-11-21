import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import React, { Component } from "react";

import store from "./store";

import CustomAppBar from "./components/CustomAppBar";
import Footer from "./components/Footer";
import GridContainer from "./components/GridContainer";
import HeroUnit from "./components/HeroUnit";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <CssBaseline />
          <CustomAppBar />
          <main>
            <HeroUnit />
            <GridContainer />
          </main>
          <Footer />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
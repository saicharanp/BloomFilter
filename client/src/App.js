import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import CustomAppBar from "./components/CustomAppBar";
import HeroUnit from "./components/HeroUnit";
import Footer from "./components/Footer";
import GridContainer from "./components/GridContainer";
import CssBaseline from "@material-ui/core/CssBaseline";
class App extends Component {
  state = { users: [] };

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  }

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

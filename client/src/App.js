import React, { Component } from 'react';
import CustomAppBar from './components/CustomAppBar';
import HeroUnit  from './components/HeroUnit';
import Footer from './components/Footer';
import GridContainer from './components/GridContainer';
import CssBaseline from '@material-ui/core/CssBaseline';


class App extends Component {
  state = {users: []}
  
  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  }

  render() {
      return (
        <React.Fragment>
          <CssBaseline />
          <CustomAppBar />
          <main>
            <HeroUnit />
            <GridContainer />
          </main>
          <Footer />
        </React.Fragment>
      );
  }
}

export default App;

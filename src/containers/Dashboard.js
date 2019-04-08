import React, { Component } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Exchange from '../components/Exchange';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.changeCurrencies = this.changeCurrencies.bind(this);

    this.state = {
      base: 'USD',
      desire: 'EUR'
    };
  }

  changeCurrencies(base, desire) {
    this.setState({ base, desire });
  }

  render() {
    const { base, desire } = this.state;
    return (
      <div className="container-fluid">
        <Header 
          base={base} 
          desire={desire}
          changeCurrencies={this.changeCurrencies}
        />
        <Exchange
          base={base} 
          desire={desire}
        />
        <Footer />
      </div>
    );
  }
}

export default Dashboard;

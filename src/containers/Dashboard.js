import React, { Component } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Alert } from '../components/Alert';
import Countdown from '../components/Countdown';
import Exchange from '../components/Exchange';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.changeCurrencies = this.changeCurrencies.bind(this);
    this.setCountdown = this.setCountdown.bind(this);
    this.stopCountdown = this.stopCountdown.bind(this);

    this.state = {
      base: 'USD',
      desire: 'EUR',
      endDate: null,
      hasToCallApi: false
    };
  }

  changeCurrencies(base, desire) {
    this.setState({ base, desire });
  }

  setCountdown() {
    let { endDate } = this.state;
    endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + parseInt(process.env.REACT_APP_API_TIMER, 10));
    localStorage.setItem('last_date_hit', new Date());
    localStorage.setItem('next_date_hit', endDate);
    this.setState({ endDate, hasToCallApi: false });
  }

  stopCountdown() {
    let { endDate } = this.state;
    endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + parseInt(process.env.REACT_APP_API_TIMER, 10));
    localStorage.setItem('next_date_hit', endDate);
    this.setState({ endDate, hasToCallApi: true });
  }

  render() {
    const { base, desire, endDate, hasToCallApi } = this.state;
    return (
      <div className="container-fluid">
        <Alert />
        <Header 
          base={base} 
          desire={desire}
          changeCurrencies={this.changeCurrencies}
        />
        <Exchange
          base={base} 
          desire={desire}
          hasToCallApi={hasToCallApi}
          setCountdown={this.setCountdown}
        />
        <Countdown
          endDate={endDate}
          stopCountdown={this.stopCountdown}
        />
        <Footer />
      </div>
    );
  }
}

export default Dashboard;

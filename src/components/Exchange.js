import React, { Component } from 'react';
import { connect } from 'react-redux';
import CurrencyInput from 'react-currency-input';
import { getCurrencyRates } from '../actions';
import { availableSymbols } from '../data';

class Exchange extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.calculateExchange = this.calculateExchange.bind(this);

        this.state = {
            baseCurrency: '0.00',
            floatValue: 0,
            desireCurrency: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { rates, error, hasToCallApi } = nextProps
        if (error !== prevState.error) {
            return { error };
        }
        if (rates !== prevState.rates) {
            return { rates };
        }
        if (hasToCallApi !== prevState.hasToCallApi) {
            return { hasToCallApi };
        }
        return null;
    }

    componentDidUpdate(prevProps) {
        const { error, rates, base, desire, hasToCallApi,
            getCurrencyRates, setCountdown } = prevProps;
        const { floatValue } = this.state;
        const upcomingError = this.props.error;
        const upcomingRates = this.props.rates;
        const hasToCallApiProp = this.props.hasToCallApi;
        if (error !== upcomingError) {
            // TODO Add function to display error
        }
        if (rates !== upcomingRates) {
            this.calculateExchange(upcomingRates);
        }
        if (hasToCallApi !== hasToCallApiProp 
            && hasToCallApiProp 
            && base === 'USD' 
            && desire === 'EUR' 
            && floatValue > 0) {
            getCurrencyRates({ base, symbols: desire });
            setCountdown();
        }
    }

    handleChange(event, maskedvalue, floatvalue) {
        this.setState({ 
            baseCurrency: maskedvalue, 
            floatValue: floatvalue 
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { getCurrencyRates, base, desire, setCountdown } = this.props;
        getCurrencyRates({ base, symbols: desire });
        setCountdown();
    }

    calculateExchange(upcomingRates) {
        const { USD } = upcomingRates;
        if (USD && USD > 0) {
            const { floatValue } = this.state;
            let { desireCurrency } = this.state;
            desireCurrency = parseFloat(floatValue / USD);
            this.setState({ desireCurrency });
        }
    }
        
    render() {
        const { base, desire } = this.props;
        const { baseCurrency, desireCurrency, floatValue } = this.state;
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-sm-12 col-md-6">
                                <CurrencyInput 
                                    decimalSeparator="." 
                                    thousandSeparator="," 
                                    className="form-control"
                                    prefix={availableSymbols[base]}
                                    placeholder={base}
                                    value={baseCurrency}
                                    onChangeEvent={this.handleChange}
                                />
                            </div>
                            <div className="form-group col-sm-12 col-md-6">
                                <CurrencyInput 
                                    decimalSeparator="." 
                                    thousandSeparator="," 
                                    className="form-control"
                                    prefix={availableSymbols[desire]}
                                    placeholder={desire}
                                    value={desireCurrency}
                                    onChangeEvent={this.handleChange}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="py-5 text-center">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={
                                    (base === 'USD' && desire === 'EUR' && floatValue > 0) ? false : true 
                                }
                                onClick={this.handleSubmit}
                            >
                                CALCULATE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ currencies }) => {
    const { rates, error, loading } = currencies;
    return { rates, error, loading };
};
  
const mapDispatchToProps = { getCurrencyRates };

export default connect(mapStateToProps,mapDispatchToProps)(Exchange);
import React from 'react';
import logo from '../logo.svg';
import '../styles/Header.scss';
import { availableExchanges } from '../data';

export const Header = ({ base, desire, changeCurrencies  }) => (
    <div className="py-5 text-center">
        <img 
          className="d-block mx-auto mb-4" 
          src={logo} 
          alt="logo" 
          width="80" 
          height="80" 
        />
        {
            availableExchanges.map((exchange, index) => {
                const { baseCurrency, desireCurrency } = exchange;
                const selectedClass = (baseCurrency === base && desireCurrency === desire) ?
                    'badge-primary' : 'badge-dark';
                return (
                    <span
                        key={index} 
                        className={`badge ${selectedClass} badge-margin-right`}
                        onClick={() => changeCurrencies(baseCurrency, desireCurrency)}
                    >
                        {`${baseCurrency}/${desireCurrency}`}
                    </span>
                );
            })
        }
    </div>
);
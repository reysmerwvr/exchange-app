import axios from 'axios';

const envVars = {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY
};

export const getRates = (payload) => {
    const { base, symbols } = payload;
    return axios.get(envVars.REACT_APP_API_URL, {
        params: {
            access_key: envVars.REACT_APP_API_KEY,
            base: symbols,
            symbols: base
        }
    });
}
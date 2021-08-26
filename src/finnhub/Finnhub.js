const axios = require('axios').default;
require('dotenv').config();

const TOKEN = process.env.REACT_APP_FINNHUB_TOKEN;
const BASE_URL = 'https://finnhub.io/api/v1';

const getQuote = async (ticker) => {
  const quote = `${BASE_URL}/quote?symbol=${ticker}&token=${TOKEN}`;
  try {
    const response = await axios.get(quote);
    return {
      currentPrice: response.data.c,
      openPrice: response.data.o,
    };
  } catch (error) {
    console.error(error);
  }
};
const getCompanyProfile2 = async (ticker) => {
  const companyProfile2 = `${BASE_URL}/stock/profile2?symbol=${ticker}&token=${TOKEN}`;
  try {
    const response = await axios.get(companyProfile2);
    // console.log(response.data);

    return {
      name: response.data.name,
      logo: response.data.logo,
      industry: response.data.finnhubIndustry,
    };
  } catch (error) {
    console.error(error);
  }
};

// const getAll = () => {
//   return myStocksDb;
// };

// const create = (data) => {
//   return myStocksDb.add(data);
// };

// const update = (id, value) => {
//   return myStocksDb.doc(id).update(value);
// };

// const remove = (id) => {
//   return myStocksDb.doc(id).delete();
// };

const Finnhub = {
  getCompanyProfile2,
  getQuote,
  // update,
  // remove,
};

export default Finnhub;

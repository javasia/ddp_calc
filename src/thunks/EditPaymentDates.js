import fetcher from '../utils/request';

const requestExchangeRate = (currency, date, itemIndex) => setIsLoading => (dispatch) => {
  setIsLoading(true);
  fetcher.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&date=${date}&json`)
    .then((data) => {
      dispatch({
        index: itemIndex,
        exchangeRate: data[0].rate,
      });
    })
    // eslint-disable-next-line no-console
    .catch(err => console.error(err))
    .finally(() => setIsLoading(false));
};

export default requestExchangeRate;

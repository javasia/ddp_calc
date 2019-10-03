import CRITERIA from './criteriaOfDistribution';
import CURRENCIES from './currencies';

const { weight, volume, cost } = CRITERIA;
export const { USD: { name: accountingCurrency } } = CURRENCIES;

export const DEFAULT_TEMPLATE = [
  {
    name: 'INVOICE COST',
    criterion: cost,
    currency: accountingCurrency,
    isDefault: true,
    amount: 0,
  },
  {
    name: 'TRANSPORTATION',
    criterion: volume,
    currency: accountingCurrency,
    isDefault: true,
    amount: 0,
  },
  {
    name: 'CUSTOMS DUTY',
    criterion: cost,
    currency: accountingCurrency,
    isDefault: true,
    amount: 0,
  },
  {
    name: 'LOADING/UNLOADING',
    criterion: weight,
    currency: accountingCurrency,
    isDefault: true,
    amount: 0,
  },
];

export default DEFAULT_TEMPLATE;

import ROUTES from './routes';
import pages from '../pages';

const { STEPS: STEPS_ROUTE } = ROUTES;

const STEPS = [
  {
    label: 'Choose action',
    message: 'Step 1: what are we going to do?',
    path: STEPS_ROUTE.CHOOSE_ACTION,
    component: pages.ChooseAction,
  },
  {
    label: 'Choose template',
    message: 'Step 2: Choose a template or create a new one...',
    path: STEPS_ROUTE.CHOOSE_TEMPLATE,
    component: pages.ChooseTemplate,
  },
  {
    label: 'View/edit template',
    message: 'Step 3: Edit template or click submit...',
    path: STEPS_ROUTE.EDIT_TEMPLATE,
    component: pages.EditTemplate,
  },
  {
    label: 'Fill in the cargo data',
    message: 'Step 4: Please fill in cargo data...',
    path: STEPS_ROUTE.EDIT_CARGO_DATA,
    component: pages.EditCargoData,
  },
  {
    label: 'Payment dates by expenses',
    message: 'Step 5: Please fill in payment dates and amounts...',
    path: STEPS_ROUTE.EDIT_PAYMENT_DATES,
    component: pages.EditPaymentDates,
  },
];

export default STEPS;

import pages from '../pages';

export const STEPPER_ROUTES = {
  CHOOSE_ACTION: 'choose-action',
  EDIT_TEMPLATE: 'edit-template',
  EDIT_CARGO_DATA: 'edit-cargo-data',
  EDIT_PAYMENT_DATES: 'edit-payment-dates',
};

export const STEPS = [
  {
    label: 'Choose action',
    message: 'Step 1: what are we going to do?',
    path: STEPPER_ROUTES.CHOOSE_ACTION,
    component: pages.ChooseAction,
  },
  {
    label: 'Edit template',
    message: 'Step 2: Edit template and click submit or just skip...',
    path: STEPPER_ROUTES.EDIT_TEMPLATE,
    component: pages.EditTemplate,
    optional: true,
  },
  {
    label: 'Fill in the cargo data',
    message: 'Step 3: Please fill in cargo data...',
    path: STEPPER_ROUTES.EDIT_CARGO_DATA,
    component: pages.EditCargoData,
  },
  {
    label: 'Payment dates by expenses',
    message: 'Step 4: Please fill in payment dates and amounts...',
    path: STEPPER_ROUTES.EDIT_PAYMENT_DATES,
    component: pages.EditPaymentDates,
  },
];

export default {
  STEPS,
  STEPPER_ROUTES,
};

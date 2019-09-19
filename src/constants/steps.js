import pages from '../pages';

export const STEPPER_ROUTES = {
  CHOOSE_ACTION: 'choose-action',
  CHOOSE_TEMPLATE: 'choose-template',
  EDIT_TEMPLATE: 'edit-template',
  EDIT_CARGO_DATA: 'edit-cargo-data',
  EDIT_PAYMENT_DATES: 'edit-payment-dates',
  DDP_CALCULATION_RESULT: 'ddp',
};

export const STEPS = [
  {
    label: 'Choose action',
    message: 'Step 1: what are we going to do?',
    path: STEPPER_ROUTES.CHOOSE_ACTION,
    component: pages.ChooseAction,
  },
  {
    label: 'Choose template',
    message: 'Step 2: Choose a template or create a new one...',
    path: STEPPER_ROUTES.CHOOSE_TEMPLATE,
    component: pages.ChooseTemplate,
    optional: true,
  },
  {
    label: 'View/edit template',
    message: 'Step 3: Edit template or click submit...',
    path: STEPPER_ROUTES.EDIT_TEMPLATE,
    component: pages.EditTemplate,
    optional: true,
  },
  {
    label: 'Fill in the cargo data',
    message: 'Step 4: Please fill in cargo data...',
    path: STEPPER_ROUTES.EDIT_CARGO_DATA,
    component: pages.EditCargoData,
  },
  {
    label: 'Payment dates by expenses',
    message: 'Step 5: Please fill in payment dates and amounts...',
    path: STEPPER_ROUTES.EDIT_PAYMENT_DATES,
    component: pages.EditPaymentDates,
  },
];

export const RESULT = {
  path: STEPPER_ROUTES.DDP_CALCULATION_RESULT,
  component: pages.DDPPrice,
};

export default {
  STEPS,
  STEPPER_ROUTES,
  RESULT,
};

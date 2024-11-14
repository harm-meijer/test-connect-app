/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomView}
 */
const config = {
  name: 'Custom View Mc',
  cloudIdentifier: process.env.CLOUD_IDENTIFIER,
  env: {
    development: {
      initialProjectKey: 'harm-sandbox-3',
    },
    production: {
      customViewId: process.env.CUSTOM_APPLICATION_ID,
      url: process.env.ENTRY_POINT_URI_PATH,
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: ['products.product_details.general'],
};

export default config;

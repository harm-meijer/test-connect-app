import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Starter Typescript 266827',
  entryPointUriPath,
  cloudIdentifier: '${env:CLOUD_IDENTIFIER}',
  env: {
    development: {
      initialProjectKey: 'harm-sandbox-3',
      // cdnUrl: 'https://code.jquery.com/jquery-3.7.1.min.js',
    },
    production: {
      applicationId: '${env:APPLICATION_ID}',
      cdnUrl: 'https://code.jquery.com/jquery-3.7.1.min.js',
      url: '${env:APPLICATION_URL}',
    },
  },
  additionalEnv: {
    someSecret: '${env:SOME_SECRET}',
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Template starter',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'channels',
      defaultLabel: 'Channels',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
  ],
};

export default config;

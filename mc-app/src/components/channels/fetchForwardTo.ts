import {
  buildApiUrl,
  executeHttpClientRequest,
} from '@commercetools-frontend/application-shell-connectors';
type Fetch = typeof fetch;

function createForWardFetch(customFetch: Fetch = fetch) {
  return async function (path: string, init?: RequestInit): Promise<Response> {
    path = path.startsWith('/') ? path : `/${path}`;
    return await executeHttpClientRequest(
      async (options) => {
        const response = await customFetch(buildApiUrl('/proxy/forward-to'), {
          ...init,
          ...options,
          headers: mergeHeaders(options.headers, init?.headers ?? {}),
        });
        return {
          data: response,
          statusCode: response.status,
          getHeader: (key) => response.headers.get(key),
        };
      },
      {
        forwardToConfig: {
          //@todo: this can come from the environment
          uri: `https://service-ef6aa1fb-998a-4455-9f80-f61e4bdbbe26.europe-west1.gcp.preview.commercetools.app/service${path}`,
        },
      }
    );
  };
}

function mergeHeaders(...headersInit: HeadersInit[]): Headers {
  const mergedHeaders = new Headers();

  for (const headerInit of headersInit) {
    const header = new Headers(headerInit);
    header.forEach((value, key) => {
      mergedHeaders.set(key, value);
    });
  }

  return mergedHeaders;
}
export default createForWardFetch(fetch);

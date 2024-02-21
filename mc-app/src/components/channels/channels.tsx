import {
  useMcMutation,
  useMcQuery,
} from '@commercetools-frontend/application-shell-connectors';
import UpdateCustomObjectMutation from '../../hooks/use-channels-connector/update-custom-object.ctp.graphql';
import FetchCustomObjectQuery from '../../hooks/use-channels-connector/fetch-custom-object.ctp.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { useCallback, useEffect } from 'react';
import fetchForwardTo from './fetchForwardTo';

const Channels = () => {
  useEffect(() => {
    fetchForwardTo('/hello_world')
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      });
  }, []);
  const { data, loading, refetch } = useMcQuery(FetchCustomObjectQuery, {
    variables: {
      key: 'certification-comments-af6c6cf0-f19b-4101-b761-b6f139a2b0e0',
      container: 'certification-comments',
    },
    context: {
      target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
    },
  });
  const [updateCustomObject, { loading: updating }] = useMcMutation(
    UpdateCustomObjectMutation
  );
  //@ts-ignore
  const version = data?.customObject?.version;
  const update = useCallback(() => {
    updateCustomObject({
      context: {
        target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
      },
      variables: {
        version,
        key: 'certification-comments-af6c6cf0-f19b-4101-b761-b6f139a2b0e0',
        container: 'certification-comments',
        value: JSON.stringify({ field: `Random: ${Math.random()}` }),
      },
    }).then(() => {
      refetch();
    });
  }, [refetch, updateCustomObject, version]);
  console.log('loading is not set correctly again', loading);
  return (
    <div>
      {!loading && <pre>{JSON.stringify(data, undefined, 2)}</pre>}
      {!loading && (
        <button onClick={update} disabled={updating}>
          update
        </button>
      )}
    </div>
  );
};
Channels.displayName = 'Channels';

export default Channels;

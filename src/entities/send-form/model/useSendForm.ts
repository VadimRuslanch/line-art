import { useMutation } from '@apollo/client/react';
import {
  SendFormDocument,
  type SendFormMutation,
  type SendFormMutationVariables,
} from '@/shared/api/gql/graphql';

export const useSendForm = () => {
  const [mutate, { data, loading, error }] = useMutation<
    SendFormMutation,
    SendFormMutationVariables
  >(SendFormDocument);

  const sendForm = (variables: SendFormMutationVariables) =>
    mutate({ variables });

  return { sendForm, data, loading, error };
};

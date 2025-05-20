import {
  useSendFormMutation,
  SendFormMutationVariables,
} from '@/generated/graphql';

export const useSendForm = () => {
  const [sendContactForm, { data, loading, error }] = useSendFormMutation();

  // Принимаем точно те переменные, что ожидает GraphQL
  const sendForm = (variables: SendFormMutationVariables) =>
    sendContactForm({ variables });

  return {
    sendForm,
    data,
    loading,
    error,
  };
};

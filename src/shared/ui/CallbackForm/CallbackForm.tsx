'use client';
import './CallbackForm.scss';
import Link from 'next/link';
import * as Yup from 'yup';
import { FC, useMemo, useCallback } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldProps,
} from 'formik';
import { IMaskInput } from 'react-imask';
import { useCart } from '@/entities/cart/model/useCart';
import { isSimpleProduct } from '@/hooks/typeSimpleProductGuards';
import { useSendForm } from '@/features/send-form/model/useSendForm';
import {
  CartItemInput,
  SendFormMutationVariables,
} from '@/shared/api/gql/graphql';

export interface FormValues {
  name: string;
  phone: string;
  email: string;
  agree: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Имя обязательно'),
  phone: Yup.string().required('Телефон обязателен'),
  email: Yup.string().email('Неверный формат').required('Email обязателен'),
  agree: Yup.boolean().oneOf([true], 'Нужно согласие'),
});

const CallbackForm: FC = () => {
  const { cart } = useCart();
  const { sendForm, loading: sending, error: sendError } = useSendForm();

  const formattedCart = useMemo<CartItemInput[]>(() => {
    if (!cart?.contents?.nodes) return [];
    return cart.contents.nodes
      .map((node) => {
        const p = node?.product?.node;
        if (!isSimpleProduct(p)) return undefined;
        return {
          title: p.name,
          quantity: node.quantity,
          url: `https://line-art-mu.vercel.app${p.uri}`,
          totalPrice: node.total,
        };
      })
      .filter((it): it is CartItemInput => !!it);
  }, [cart]);

  const cartTotal = cart?.total ?? '';

  const initialValues: FormValues = {
    name: '',
    phone: '',
    email: '',
    agree: true,
  };

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { setSubmitting, resetForm }: FormikHelpers<FormValues>,
    ) => {
      setSubmitting(true);

      if (formattedCart.length === 0) {
        alert('Ваша корзина пуста');
        setSubmitting(false);
        return;
      }

      const variables: SendFormMutationVariables = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        cartItems: formattedCart,
        cartTotal: cartTotal,
      };

      try {
        await sendForm(variables);
        resetForm();
        alert('Заявка отправлена');
      } catch {
        // отправка упала — sendError отобразится ниже
      } finally {
        setSubmitting(false);
      }
    },
    [formattedCart, cartTotal, sendForm],
  );

  return (
    <div className="CallbackForm__container">
      <span className="CallbackForm__title">Детали заказа</span>

      {sendError && (
        <div className="CallbackForm__sendError">
          Ошибка отправки: {sendError.message}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, setFieldTouched, isValid }) => (
          <Form className="CallbackForm__form">
            <div className="CallbackForm__inputItems">
              {/* Name */}
              <div className="CallbackForm__inputItem">
                <Field
                  id="name"
                  name="name"
                  className="CallbackForm__input"
                  placeholder="Введите имя"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="CallbackForm__error"
                />
              </div>

              {/* Phone */}
              <div className="CallbackForm__inputItem">
                <Field name="phone">
                  {({ field }: FieldProps) => (
                    <IMaskInput
                      {...field}
                      mask="+7 (000) 000-00-00"
                      definitions={{ '0': /\d/ }}
                      unmask={false}
                      onAccept={(val) => setFieldValue('phone', val)}
                      onBlur={() => setFieldTouched('phone', true)}
                      placeholder="+7 (___) ___-__-__"
                      className="CallbackForm__input"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="CallbackForm__error"
                />
              </div>

              {/* Email */}
              <div className="CallbackForm__inputItem">
                <Field
                  name="email"
                  type="email"
                  className="CallbackForm__input"
                  placeholder="email@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="CallbackForm__error"
                />
              </div>
            </div>
            <div className="CallbackForm__submit-container">
              <span className="CallbackForm__submitSum">
                Сумма заказа:&nbsp;
                <span dangerouslySetInnerHTML={{ __html: cartTotal }}></span>
              </span>

              {/* Согласие */}
              <div className="CallbackForm__checkboxBlock">
                <label className="CallbackForm__checkboxLabel">
                  <Field
                    type="checkbox"
                    name="agree"
                    className="CallbackForm__checkbox"
                  />
                  <span className="CallbackForm__checkboxText">
                    Я согласен с&nbsp;
                    <Link href="/policy">политикой конфиденциальности</Link>
                  </span>
                </label>
                <ErrorMessage
                  name="agree"
                  component="div"
                  className="CallbackForm__error"
                />
              </div>

              {/* Сумма и отправка */}
              <div className="CallbackForm__submitBlock">
                <button
                  type="submit"
                  className="CallbackForm__submitButton"
                  disabled={isSubmitting || !isValid || sending}
                >
                  {sending ? 'Отправляю...' : 'Отправить заказ'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CallbackForm;

import { ApolloLink, HttpLink, Observable } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';

import { setCookie, getCookie, deleteCookie } from './ApolloWrapper.utils';

const GRAPHQL_URL = 'https://wp-admin.lineart-alumo.ru/graphql';
const WOO_SESSION = 'woocommerce-session';
const WOO_PREFIX = 'Session ';

function buildAttachWooSessionLink(opts: {
  isServer: boolean;
  cookieHeader?: string;
  wooSessionFromSSR?: string | null;
}) {
  const { isServer, cookieHeader, wooSessionFromSSR } = opts;
  return new ApolloLink((operation, forward) => {
    const fromClient = !isServer ? getCookie(WOO_SESSION) : undefined;
    const raw = isServer ? (wooSessionFromSSR ?? undefined) : fromClient;

    // Всегда отправляем с префиксом "Session "
    const headerValue = raw
      ? raw.startsWith(WOO_PREFIX)
        ? raw
        : WOO_PREFIX + raw
      : undefined;

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...(headerValue ? { [WOO_SESSION]: headerValue } : {}),
        ...(isServer && cookieHeader ? { cookie: cookieHeader } : {}),
      },
    }));

    // После ответа — обновляем токен, если сервер прислал новый
    return new Observable<ApolloLink.Result>((observer) => {
      const sub = forward!(operation).subscribe({
        next: (result) => {
          const resp: Response | undefined = operation.getContext().response;
          const incoming = resp?.headers?.get(WOO_SESSION);
          // Сохраняем "чистый" токен без префикса
          const cleaned = incoming?.replace(/^Session\s+/i, '')?.trim();
          if (!isServer && cleaned) setCookie(WOO_SESSION, cleaned);
          observer.next(result);
        },
        error: (e) => observer.error(e),
        complete: () => observer.complete(),
      });
      return () => sub.unsubscribe();
    });
  });
}

function buildWooErrorLink() {
  const brokenTokenRe =
    /Failed to decode session token|Wrong number of segments|Expired token|Signature/i;

  return new ErrorLink(({ error, operation, forward }) => {
    if (!CombinedGraphQLErrors.is(error)) return;

    const hasBrokenToken = error.errors.some((e) =>
      brokenTokenRe.test(e.message ?? ''),
    );
    if (!hasBrokenToken) return;

    if (typeof document !== 'undefined') deleteCookie(WOO_SESSION);

    operation.setContext(({ headers = {} }) => {
      const nextHeaders = { ...(headers as Record<string, string>) };
      delete nextHeaders[WOO_SESSION];
      return { headers: nextHeaders };
    });

    return forward ? forward(operation) : undefined;
  });
}

function buildHttpLink(isServer: boolean) {
  return new HttpLink({
    uri: GRAPHQL_URL,
    credentials: isServer ? 'same-origin' : 'include',
  });
}

export { buildAttachWooSessionLink, buildWooErrorLink, buildHttpLink };

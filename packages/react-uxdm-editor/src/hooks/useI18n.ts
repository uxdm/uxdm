import React, { useEffect, useState } from 'react';
import { PrimitiveType } from 'intl-messageformat';
import { useIntl } from 'react-intl';
import { LocaleKey, LocaleMessages } from '../framework';

export type SupportedLocales = 'en-US' | 'zh-CN';

function importMessages(locale: SupportedLocales): Promise<LocaleMessages> {
  switch (locale) {
    case 'en-US':
    default:
      return import('../locales/en-US').then((m) => m.default);
    case 'zh-CN':
      return import('../locales/zh-CN').then((m) => m.default);
  }
}

/**
 *
 */
export const useI18n = () => {
  const [locale, setLocale] = useState(navigator.language as SupportedLocales);

  const [messages, setMessages] = React.useState<LocaleMessages | null>(null);

  useEffect(() => {
    importMessages(locale)?.then(setMessages);
  }, [locale]);

  return { locale, messages, setLocale };
};

export const useFormatMessage = (): ((
  id: LocaleKey, // only accepts valid keys, not any string
  values?: Record<string, PrimitiveType>,
) => string) => {
  const intl = useIntl();
  return (id, values) => intl.formatMessage({ id }, values);
};

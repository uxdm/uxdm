import sourceOfTruth from '../view/locales/en-US';

export type LocaleMessages = typeof sourceOfTruth;
export type LocaleKey = keyof LocaleMessages;
export type SupportedLocales = 'en-US' | 'zh-CN';

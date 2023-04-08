const AppLocaleList = [
  { name: 'English', code: 'en', lang: 'English' },
  { name: '中文', code: 'zh', lang: 'Chinese' },
];

const enTranslationMessages = require('./Translations/en.json');
const zhTranslationMessages = require('./Translations/zh.json');

const translatedMessages = {
  en: enTranslationMessages,
  zh: zhTranslationMessages
};

const DEFAULT_LOCALE = navigator.language.match(/^[A-Za-z]{2}/)[0];

export { AppLocaleList, translatedMessages, DEFAULT_LOCALE };
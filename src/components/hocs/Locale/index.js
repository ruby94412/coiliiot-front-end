import {useState} from 'react';
import {IntlProvider} from 'react-intl';
import {translatedMessages} from './i18n';

const withLocale = Child => props => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  return (
    <IntlProvider locale={locale} messages={translatedMessages[locale]}>
      <Child {...props} setLocale={setLocale} />
    </IntlProvider>
  );
};

export default withLocale;

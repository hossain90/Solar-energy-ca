import React from 'react';
import { useTranslation } from 'react-i18next';
import AdSense from '../components/AdSense';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('privacy.title')}</h1>

        <div className="mb-8">
          <AdSense
            adSlot="1234567890"
            className="mb-8"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.informationCollection.title')}</h2>
            <p>{t('privacy.informationCollection.description')}</p>
            <ul className="list-disc pl-6 mt-4">
              <li>{t('privacy.informationCollection.items.personal')}</li>
              <li>{t('privacy.informationCollection.items.usage')}</li>
              <li>{t('privacy.informationCollection.items.technical')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.informationUse.title')}</h2>
            <p>{t('privacy.informationUse.description')}</p>
            <ul className="list-disc pl-6 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>{t(`privacy.informationUse.purposes.${i}`)}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.dataSecurity.title')}</h2>
            <p>{t('privacy.dataSecurity.description')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.cookies.title')}</h2>
            <p>{t('privacy.cookies.description')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.thirdParty.title')}</h2>
            <p>{t('privacy.thirdParty.description')}</p>
          </section>

          <div className="mt-8">
            <AdSense
              adSlot="9876543210"
              className="mb-8"
              style={{ display: 'block', textAlign: 'center' }}
            />
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.rights.title')}</h2>
            <p>{t('privacy.rights.description')}</p>
            <ul className="list-disc pl-6 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>{t(`privacy.rights.items.${i}`)}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.contact.title')}</h2>
            <p>{t('privacy.contact.description')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('privacy.updates.title')}</h2>
            <p>{t('privacy.updates.description')}</p>
            <p className="mt-4">{t('privacy.lastUpdated', { date: new Date().toLocaleDateString() })}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
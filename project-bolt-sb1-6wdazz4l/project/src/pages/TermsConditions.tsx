import React from 'react';
import { useTranslation } from 'react-i18next';
import AdSense from '../components/AdSense';

const TermsConditions: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('terms.title')}</h1>
        <div className="separator mx-auto mb-12" />

        <div className="mb-8">
          <AdSense 
            adSlot="9876543210"
            className="mb-8"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.sections.usage')}</h2>
            <p className="text-gray-600">
              {t('terms.sections.usage_content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.sections.account')}</h2>
            <p className="text-gray-600">
              {t('terms.sections.account_content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.sections.payment')}</h2>
            <p className="text-gray-600">
              {t('terms.sections.payment_content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{t('terms.sections.liability')}</h2>
            <p className="text-gray-600">
              {t('terms.sections.liability_content')}
            </p>
          </section>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500">
            {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
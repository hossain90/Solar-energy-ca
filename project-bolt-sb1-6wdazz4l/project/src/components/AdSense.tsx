import React, { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ adSlot, style, className }) => {
  useEffect(() => {
    try {
      // Only add the script once
      if (typeof window !== 'undefined' && !window.adsbygoogle) {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.dataset.adClient = process.env.VITE_GOOGLE_ADSENSE_CLIENT_ID || '';
        document.head.appendChild(script);
      }

      // Push the ad
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading AdSense:', err);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={process.env.VITE_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
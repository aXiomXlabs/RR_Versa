"use client"

import Script from "next/script"
import { useCookieConsent } from "@/contexts/cookie-consent-context"
import { useLanguage } from "@/contexts/language-context"

export function ConditionalScripts() {
  const { consent } = useCookieConsent()
  const { language } = useLanguage()

  // Keine Skripte laden, wenn keine Zustimmung vorliegt
  if (!consent) return null

  return (
    <>
      {/* Google Tag Manager - nur laden, wenn Marketing-Cookies akzeptiert wurden */}
      {consent.marketing && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `}
          </Script>

          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </>
      )}

      {/* Google Analytics 4 - nur laden, wenn Analytics-Cookies akzeptiert wurden */}
      {/* Hinweis: Vercel Analytics wird automatisch über die VercelAnalyticsProvider-Komponente geladen */}
      {consent.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=G-6GRKXCYXWW`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6GRKXCYXWW', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
              user_id: undefined, // Will be set when user logs in
              send_page_view: true,
              anonymize_ip: true,
              cookie_domain: 'www.rust-rocket.com',
              cookie_expires: 63072000, // 2 years in seconds
              'language': '${language}' // Aktuelle Sprache an GA senden
            });
            
            // Enhanced link attribution
            gtag('set', 'linker', {
              'domains': ['www.rust-rocket.com', 'app.rust-rocket.com']
            });
            
            // Custom dimensions
            gtag('set', {
              'user_properties': {
                'user_type': 'visitor',
                'device_category': window.innerWidth < 768 ? 'mobile' : 'desktop',
                'traffic_source': document.referrer || 'direct',
                'page_template': 'landing_page',
                'language': '${language}'
              }
            });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel - nur laden, wenn Marketing-Cookies akzeptiert wurden */}
      {consent.marketing && (
        <>
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
            fbq('track', 'PageView');
            `}
          </Script>

          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=YOUR_FACEBOOK_PIXEL_ID&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>
        </>
      )}

      {/* Weitere Marketing-Skripte - nur laden, wenn Marketing-Cookies akzeptiert wurden */}
      {consent.marketing && (
        <>
          {/* LinkedIn Insight Tag */}
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
            _linkedin_partner_id = "YOUR_LINKEDIN_PARTNER_ID";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
            `}
          </Script>

          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src="https://px.ads.linkedin.com/collect/?pid=YOUR_LINKEDIN_PARTNER_ID&fmt=gif"
            />
          </noscript>

          {/* Twitter Universal Website Tag */}
          <Script id="twitter-website-tag" strategy="afterInteractive">
            {`
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('init','YOUR_TWITTER_PIXEL_ID');
            twq('track','PageView');
            `}
          </Script>

          {/* TikTok Pixel */}
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('YOUR_TIKTOK_PIXEL_ID');
              ttq.page();
            }(window, document, 'ttq');
            `}
          </Script>

          {/* Snap Pixel */}
          <Script id="snap-pixel" strategy="afterInteractive">
            {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
            r.src=n;var c=t.getElementsByTagName(s)[0];
            c.parentNode.insertBefore(r,c);})(window,document,
            'https://sc-static.net/scevent.min.js');
            snaptr('init', 'YOUR_SNAP_PIXEL_ID', {
              'user_email': '_'
            });
            snaptr('track', 'PAGE_VIEW');
            `}
          </Script>
        </>
      )}

      {/* Funktionale Skripte - nur laden, wenn funktionale Cookies akzeptiert wurden */}
      {consent.functional && (
        <>
          {/* Microsoft Clarity */}
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+"YOUR_CLARITY_PROJECT_ID";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "YOUR_CLARITY_PROJECT_ID");
            `}
          </Script>

          {/* HotJar */}
          <Script id="hotjar" strategy="afterInteractive">
            {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:"YOUR_HOTJAR_ID",hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
          </Script>
        </>
      )}
    </>
  )
}

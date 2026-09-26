// GA4 bootstrap. A same-origin file rather than an inline <script> because the
// CSP in public/_headers has no 'unsafe-inline' in script-src, so the browser
// refuses an inline gtag('config') call. The gtag.js loader is in index.html.
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag("js", new Date());
gtag("config", "G-J0DNS1H8NK");

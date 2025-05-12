"use client"

export default function InlineStyleFix() {
  return (
    <style jsx global>{`
      /* Only target elements that EXACTLY contain "header.dashboard" text */
      /* This is much more specific than our previous approach */
      button, a, div {
        /* Don't change any default styles for all elements */
      }
      
      /* The problematic button is likely in the hero section */
      /* Let's target only buttons in the hero/header area with dark backgrounds */
      .hero button:not([class*="telegram"]),
      header button:not([class*="telegram"]),
      [class*="header"] button:not([class*="telegram"]),
      [class*="hero"] button:not([class*="telegram"]) {
        /* Only hide if it matches our text check */
      }
    `}</style>
  )
}

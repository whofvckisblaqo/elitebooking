"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Add CSS to hide Google's banner
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame { display: none !important; }
      .skiptranslate { display: none !important; }
      body { top: 0 !important; position: static !important; }
      .goog-tooltip { display: none !important; }
      .goog-text-highlight { background: none !important; box-shadow: none !important; }
      #goog-gt-tt { display: none !important; }
    `;
    document.head.appendChild(style);

    // Init function
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Load script
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}
    />
  );
}
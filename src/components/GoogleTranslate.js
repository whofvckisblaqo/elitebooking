"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    const existingScript = document.getElementById("google-translate-script");
    if (existingScript) existingScript.remove();

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages:
            "es,fr,de,it,pt,ru,zh-CN,zh-TW,ja,ko,ar,hi,bn,tr,pl,nl,sv,da,no,fi,el,he,id,vi,th,fa,uk,ms,sw",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}
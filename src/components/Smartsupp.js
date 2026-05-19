"use client";
import { useEffect } from "react";

export default function Smartsupp() {
  useEffect(() => {
    var _smartsupp = _smartsupp || {};
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "d434cec1c193daede64bfc9953964e4c6efd5b1d";

    window.smartsupp ||
      (function (d) {
        var s, c, o = (window.smartsupp = function () {
          o._.push(arguments);
        });
        o._ = [];
        s = d.getElementsByTagName("script")[0];
        c = d.createElement("script");
        c.type = "text/javascript";
        c.charset = "utf-8";
        c.async = true;
        c.src = "https://www.smartsuppchat.com/loader.js?";
        s.parentNode.insertBefore(c, s);
      })(document);
  }, []);

  return null;
}
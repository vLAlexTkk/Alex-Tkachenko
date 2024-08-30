"use client";

import { useSelectedCurrency } from "@/context/SelectedCurrencyChart";
import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewWidget = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedCurrency } = useSelectedCurrency();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (containerRef.current) {
        new window.TradingView.widget({
          container_id: containerRef.current.id,
          width: "100%",
          height: "500",
          symbol: selectedCurrency,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          hide_top_toolbar: true,
          hide_side_toolbar: true,
          hide_legend: true,
          hideideas: true,
          withdateranges: false,
          enable_publishing: false,
          allow_symbol_change: false,
          save_image: false,
          details: false,
          studies: [],
          show_popup_button: false,
          no_referral_id: true,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [selectedCurrency]);

  return (
    <div
      className="!z-[-10000000]"
      id="tradingview-widget"
      ref={containerRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default TradingViewWidget;

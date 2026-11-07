import localFont from "next/font/local";

export const hindSiliguri = localFont({
  src: [
    {
      path: "../fonts/HindSiliguri-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/HindSiliguri-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/HindSiliguri-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/HindSiliguri-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hind-siliguri",
  display: "swap",
  fallback: [
    "Hind Siliguri",
    "Noto Sans Bengali",
    "SolaimanLipi",
    "Kalpurush",
    "Vrinda",
    "Segoe UI",
    "Tahoma",
    "sans-serif",
  ],
});


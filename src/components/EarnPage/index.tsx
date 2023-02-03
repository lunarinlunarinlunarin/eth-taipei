import { useState } from "react";
import Advert from "../Advert";
import { atom, useAtom } from "jotai";
const adverts = [
  {
    id: 1,
    source: "https://joy1.videvo.net/videvo_files/video/free/2013-07/large_watermarked/HS003_preview.mp4",
    advertiser: "Korean Air",
    logo: "/korean_air.png",
    title: "Take your wedding photos 3 years late",
    reward: "0.50 USDC (~ 0.50 USD)",
    toAdd: 0.5,
    rewardLogo: "/usdc.png",
    chain: "Polygon",
    chainLogo: "/polygon_matic.svg",
  },
  {
    id: 2,
    source: "https://joy1.videvo.net/videvo_files/video/free/video0454/large_watermarked/_import_6064a30001a6f6.90353328_preview.mp4",
    advertiser: "Apple",
    logo: "/apple.png",
    title: "Overpay for your phone today",
    reward: "0.00001 ETH (~ 0.10 USD)",
    toAdd: 0.1,
    rewardLogo: "/eth_logo.svg",
    chain: "Arbitrum",
    chainLogo: "/arbitrum_logo.svg",
  },
  {
    id: 3,
    source: "https://joy.videvo.net/videvo_files/video/premium/video0236/small_watermarked/10_Toronto_car_show_05_E_lamborjini_preview.webm",
    advertiser: "Lamborghini",
    logo: "/lambo.svg",
    title: "Marcia's Aventador",
    reward: "0.5 Matic (~ 0.50 USD)",
    toAdd: 0.5,
    rewardLogo: "/polygon_matic.svg",
    chain: "Polygon",
    chainLogo: "/polygon_matic.svg",
  },
  {
    id: 4,
    source: "https://joy1.videvo.net/videvo_files/video/free/2016-09/large_watermarked/160820_230_NYC_TimeSquare2_1080p_preview.mp4",
    advertiser: "Visit New York",
    logo: "/new_york.png",
    title: "Pay exhorbitant service charge for no service!",
    reward: "0.40 USDC (~ 0.40 USD)",
    toAdd: 0.4,
    rewardLogo: "/usdc.png",
    chain: "Avalanche",
    chainLogo: "/avalanche-avax-logo.svg",
  },
  {
    id: 5,
    source: "https://joy1.videvo.net/videvo_files/video/free/2016-12/large_watermarked/Typing_dark_04_Videvo_preview.mp4",
    advertiser: "Keychron",
    logo: "https://cdn.shopify.com/s/files/1/0059/0630/1017/files/keychron-blacktext2_564ecef7-85a4-458a-b79e-74b63fbcb70d.png?v=1647510916",
    title: "Buy more keyboards that you don't use!",
    reward: "1 SubDollar (~ 1000 USD)",
    toAdd: 1.0,
    rewardLogo: "/suberra_icon_light.png",
    chain: "Avalanche",
    chainLogo: "/avalanche-avax-logo.svg",
  },
  {
    id: 6,
    source:
      "https://media.istockphoto.com/id/1164728985/video/hacking-code-being-typed-onto-pc-digital-monitor-screen.mp4?s=mp4-640x640-is&k=20&c=NGaRo6xjqE5a8IKO2ZGEXyFUNBqbBRHO_SY5QIxqlo4=",
    advertiser: "Code Academy",
    logo: "/code_acad.png",
    title: "Learn how to pretend to code today.",
    reward: "5 SubDollar (~ 5000 USD)",
    toAdd: 5.0,
    rewardLogo: "/suberra_icon_light.png",
    chain: "Ethereum",
    chainLogo: "/eth_logo.svg",
  },
];

export const advertAtom = atom(adverts);
export default function EarnPage() {
  const [adverts] = useAtom(advertAtom);
  return (
    <div className="flex h-screen w-full flex-wrap gap-8 px-4 sm:px-8">
      {adverts.map((advert) => {
        return <Advert key={advert?.id} advert={advert} />;
      })}
    </div>
  );
}

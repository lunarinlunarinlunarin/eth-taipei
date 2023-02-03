import Advert from "../components/Advert";
import DashboardLayout from "../layouts/dashboard";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import Header from "../components/Header";
import { atom, useAtom } from "jotai";
import { Player } from "video-react";
import Image from "next/image";
import EarnPage from "../components/EarnPage";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
export const earningsAtom = atom(100);

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col py-2">
      <div className="mx-8 flex h-[calc(100vw-100px)] w-full flex-col items-center">
        <div className="flex flex-col items-center space-y-1  py-24">
          <Image src="/logo1.svg" alt="logo" width={200} height={150} />
          <div>Put your spare time to good use today!</div>
        </div>
        <Player fluid={false}>
          <source src="https://cdn.videvo.net/videvo_files/video/free/2022-12/large_watermarked/221019_01_Brands_4k_032_preview.mp4" />
        </Player>
      </div>
    </div>
  );
}

Home.getLayout = (currentPage) => <DashboardLayout>{currentPage}</DashboardLayout>;

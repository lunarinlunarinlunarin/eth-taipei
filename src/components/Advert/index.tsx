import { Player } from "video-react";
import Image from "next/image";
import { useState } from "react";
import Question from "../Question";
import { CheckCircleIcon } from "@heroicons/react/outline";

export default function Advert({ advert }) {
  const [hasEnded, setHasEnded] = useState(false);
  const [open, setOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);
  if (!advert) return;

  const handleVideoEnded = (advert) => {
    setHasEnded(true);
  };

  const verify = () => {
    setOpen(true);
  };

  return (
    <div className="w-full bg-gray-tints-50 p-7 sm:w-[calc(50vw-100px)] xl:h-[calc(40vh)]  xl:w-[calc(33vw-80px)] 3xl:h-[calc(40vh)] 3xl:w-[calc(25vw-70px)]">
      {open && <Question open={open} setOpen={setOpen} advert={advert} setClaimed={setClaimed} />}
      <Player id={advert.id} onEnded={handleVideoEnded}>
        <source src={advert?.source} />
      </Player>
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center justify-center space-x-4 py-4">
          <Image width={70} height={35} alt="logo" src={advert.logo} />
          <div className="flex flex-col items-center">
            <span className="text-3xl text-[#ff948e]">{advert.advertiser}</span>
            <span className="text-xs font-semibold">{advert.title}</span>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center">
          <div className="flex w-full flex-row items-center space-x-2">
            <span className="w-1/3 text-sm">Rewards:</span>
            <Image width={16} height={16} alt="logo" src={advert.rewardLogo} />
            <span className="text-sm font-medium"> {advert.reward}</span>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center">
          <div className="flex w-full flex-row items-center space-x-2">
            <span className="w-1/3 text-sm">Chain:</span>
            <Image width={16} height={16} alt="logo" src={advert.chainLogo} />
            <span className="text-sm font-medium"> {advert.chain}</span>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center">
          <div className="flex w-full flex-row items-center space-x-2">
            <span className="w-1/3 text-sm">Reward Status:</span>
            <div className="text-sm font-medium ">
              {hasEnded ? (
                claimed ? (
                  <span className="flex flex-row items-center space-x-1 text-success" onClick={verify}>
                    <CheckCircleIcon className="h-5 w-5" />
                    <span>Rewards claimed</span>
                  </span>
                ) : (
                  <span className="cursor-pointer text-warning" onClick={verify}>
                    Claim your reward!
                  </span>
                )
              ) : (
                <span className="text-error">Not Started</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

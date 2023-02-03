import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadDropzone } from "react-uploader";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import { advertAtom } from "../../EarnPage";

export default function Create() {
  const options = { multi: true };

  // Initialize once (at the start of your app).
  const uploader = Uploader({
    apiKey: "public_W142hcV97eFT2xjP6Tja8uTdLVd9", // Get production API keys from Upload.io
  });
  const [advertLink, setAdvertLink] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [campaign, setCampaign] = useState("");
  const [budget, setBudget] = useState(null);
  const [audience, setAudience] = useState(null);
  const [logo, setLogo] = useState("");
  const [adverts, setAdverts] = useAtom(advertAtom);

  const handleUpload = (url) => {
    console.log(url);
    setLogo(url);
  };

  const handleSubmit = () => {
    const reward = budget / audience;
    const clone = [...adverts];
    clone.push({
      id: 6,
      source: advertLink,
      advertiser: companyName,
      logo: logo,
      title: campaign,
      reward: reward.toFixed(2) + ` USDC (~ ${reward.toFixed(2)} USD)`,
      toAdd: reward,
      rewardLogo: "/usdc.png",
      chain: "Avalanche",
      chainLogo: "/avalanche-avax-logo.svg",
    });
    setAdverts(clone);
  };
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Advert Link
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="www.example.com"
                    onChange={(event) => setAdvertLink(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-name"
                    id="company-name"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Suberra"
                    onChange={(event) => setCompanyName(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Campaign Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="company-name"
                    id="company-name"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Suberra"
                    onChange={(event) => setCampaign(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 w-[200px] sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Budget
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="budget"
                    id="budget"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="100.00"
                    onChange={(event) => setBudget(event.target.value)}
                  />
                  <span className="inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">USDC</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 w-[200px] sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Number of Target Audience
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    name="audience"
                    id="audience"
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="100"
                    onChange={(event) => setAudience(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 w-[200px] sm:col-span-2">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                  Reward Per View
                </label>
                <div className="mt-1 flex space-x-8 rounded-md shadow-sm">
                  <span>{audience && budget ? (budget / audience).toFixed(2) : "--"}</span>
                  <span className="inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">USDC</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo</label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="w-[500px] space-y-1 text-center">
                  <div className="flex text-sm text-gray-600">
                    <UploadDropzone
                      uploader={uploader}
                      options={options}
                      onUpdate={(files) => handleUpload(files.map((x) => x.fileUrl).join("\n"))}
                      width="600px"
                      height="375px"
                    />
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <div
              onClick={handleSubmit}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

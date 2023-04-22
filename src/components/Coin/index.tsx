import Safe from "@safe-global/protocol-kit";
import { SafeTransaction, SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";
import { useAccount, useSigner } from "wagmi";
import { ZapInterface } from "../../pages";
import { Button } from "../Button/button";
import React, { Fragment } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import { classNames } from "../../utils";
import { TokenList } from "../../data";
import Image from "next/image";

export const Coin = ({ fromToken, setFromToken, toToken, setToToken }) => {
  return (
    <div className="flex flex-row justify-between p-4" style={{ background: "#fff", marginBottom: "1rem", borderRadius: "10px" }}>
      <div className="flex flex-col items-start space-y-2">
        <span className="text-lg font-medium">Sell</span>
        <Listbox onChange={setFromToken}>
          {({ open }) => (
            <div className="relative flex flex-col items-center justify-center rounded-md focus-within:shadow-input xl:w-1/2">
              <Listbox.Button className="relative flex flex-row items-center justify-center w-full space-x-2 bg-transparent rounded-md cursor-pointer focus:outline-none">
                <div className={"flex flex-row items-center space-x-1"}>
                  <Image height={25} width={25} src={fromToken?.logo} alt="Brand Logo" className="hover:cursor-pointer" />
                  <span className="font-mono text-base font-medium">{fromToken?.label}</span>
                </div>
                <ChevronDownIcon className="h-4" />
              </Listbox.Button>

              <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="scrollbar-hide absolute top-10 z-50 max-h-[200px] w-48 cursor-pointer overflow-auto rounded bg-gray-300 text-xs focus:outline-none dark:bg-gray-800">
                  {Object.values(TokenList).map((token) => {
                    return (
                      <Listbox.Option
                        key={token.label}
                        value={token}
                        className={({ active }) =>
                          classNames(active ? "bg-primary-300 text-gray-800 dark:text-white" : `text-gray-800 dark:text-white`, `relative select-none p-3`)
                        }
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-row items-center space-x-4">
                            <div className="flex flex-row items-center space-x-3">
                              <span className={classNames(selected ? "text-wnite font-medium" : "text-wnite", "flex flex-row items-center space-x-1")}>
                                <Image height={25} width={25} src={token.logo} alt="Brand Logo" className="hover:cursor-pointer" />
                                <span> {token.label}</span>
                              </span>
                            </div>
                            {selected ? (
                              <span className={classNames(active ? "text-white" : "text-primary-300", "flex items-center")}>
                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className="text-lg font-medium">Receive</span>
        <Listbox onChange={setToToken}>
          {({ open }) => (
            <div className="relative flex flex-col items-center justify-center rounded-md focus-within:shadow-input">
              <Listbox.Button className="relative flex flex-row items-center justify-center w-full space-x-2 bg-transparent rounded-md cursor-pointer focus:outline-none">
                <div className={"flex flex-row items-center space-x-1"}>
                  <Image height={25} width={25} src={toToken?.logo} alt="Brand Logo" className="hover:cursor-pointer" />
                  <span className="font-mono text-base font-medium">{toToken?.label}</span>
                </div>
              </Listbox.Button>

              <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                <Listbox.Options className="scrollbar-hide absolute top-10 z-50 max-h-[200px] w-48 cursor-pointer overflow-auto rounded bg-gray-300 text-xs focus:outline-none dark:bg-gray-800">
                  {Object.values(TokenList).map((token) => {
                    return (
                      <Listbox.Option
                        key={token.label}
                        value={token}
                        className={({ active }) =>
                          classNames(active ? "bg-primary-300 text-gray-800 dark:text-white" : `text-gray-800 dark:text-white`, `relative select-none p-3`)
                        }
                      >
                        {({ selected, active }) => (
                          <div className="flex flex-row items-center space-x-4">
                            <div className="flex flex-row items-center space-x-3">
                              <span className={classNames(selected ? "text-wnite font-medium" : "text-wnite", "flex flex-row items-center space-x-1")}>
                                <Image height={25} width={25} src={token.logo} alt="Brand Logo" className="hover:cursor-pointer" />
                                <span> {token.label}</span>
                              </span>
                            </div>
                            {selected ? (
                              <span className={classNames(active ? "text-white" : "text-primary-300", "flex items-center")}>
                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      </div>
    </div>
  );
};

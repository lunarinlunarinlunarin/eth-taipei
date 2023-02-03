import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { earningsAtom } from "../../pages";
import { useAtom } from "jotai";

export default function Question({ open, setOpen, advert, setClaimed }) {
  const [correct, setCorrect] = useState(undefined);
  const [showAnswer, setShowAnswer] = useState(false);
  const [earnings, setEarnings] = useAtom(earningsAtom);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 py-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:px-6">
                <div>
                  <div className="sm:mt-5">
                    <div className="text-xs">Answer the following question to claim your reward</div>
                    <Dialog.Title as="h3" className="mt-4 text-lg font-medium leading-6 text-gray-900">
                      What does Suberra do?
                    </Dialog.Title>
                    <div className="mt-2 justify-start">
                      <div className="flex flex-col space-y-2 text-sm text-gray-500">
                        <span
                          id="0"
                          className={`cursor-pointer ${showAnswer ? "text-error" : ""}`}
                          onClick={() => {
                            setCorrect(false);
                            setShowAnswer(true);
                          }}
                        >
                          a) A cryptocurrency centralised exchange
                        </span>
                        <div
                          id="1"
                          className={`flex cursor-pointer flex-row space-x-2 ${showAnswer ? "text-success" : ""}`}
                          onClick={() => {
                            setCorrect(true);
                            setShowAnswer(true);
                            setEarnings(earnings + advert.toAdd);
                            setClaimed(true);
                          }}
                        >
                          <span id="1">b) A web3 payments company</span>
                          {showAnswer && <CheckIcon className="h-5 w-5" />}
                        </div>
                        <div
                          id="2"
                          className={`cursor-pointer ${showAnswer ? "text-error" : ""}`}
                          onClick={() => {
                            setCorrect(false);
                            setShowAnswer(true);
                          }}
                        >
                          c) A coffeeshop
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {correct && (
                    <div className="flex w-full flex-col text-center text-xs">
                      <span>You have answered correctly!</span>
                      <span>
                        You have been awarded with <span className="font-medium">{advert.reward}</span>{" "}
                      </span>
                      <span>
                        Your current balance is ~ <span className="font-medium text-[#ff948e]">{earnings?.toFixed(2)} USDC.</span>
                      </span>
                    </div>
                  )}
                  {correct === false && (
                    <div className="flex w-full flex-col text-center text-xs">
                      <span>Sorry! You have answered incorrectly</span>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

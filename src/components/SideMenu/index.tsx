import { useRouter } from "next/router";
import Link from "next/link";
import { CashIcon, HomeIcon, LoginIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon, CollectionIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { truncate } from "../../utils";
import { useDynamicContext } from "@dynamic-labs/sdk-react";
import { earningsAtom } from "../../pages";
import { useAtom } from "jotai";
import Image from "next/image";
function NavLink({ children, href, activeClassName = "", className = "", onClick = null, disabled = false }) {
  const router = useRouter();

  const dynamicClassName = router.asPath === href ? activeClassName : className;

  return (
    <Link href={href} className={dynamicClassName}>
      {children}
    </Link>
  );
}

export function MenuItems({ onClick }: { onClick?: () => void }) {
  const activeClassName = "flex items-center py-4 pl-4 gap-2 rounded bg-[#ff948e]";
  const baseClassName = "flex items-center py-4 pl-4 gap-2 rounded hover:text-primary-500";

  return (
    <div className="flex w-full flex-col justify-center text-sm sm:justify-start">
      <NavLink className={baseClassName} activeClassName={activeClassName} href="/">
        <HomeIcon className="inline-block h-6 w-6" />
        Home
      </NavLink>
      <NavLink className={baseClassName} activeClassName={activeClassName} href="/earn">
        <CashIcon className="inline-block h-6 w-6" />
        Earn
      </NavLink>
      <NavLink className={baseClassName} activeClassName={activeClassName} href="/create">
        <CollectionIcon className="inline-block h-6 w-6" />
        Advertise
      </NavLink>
      <NavLink className={baseClassName} activeClassName={activeClassName} href="/dashboard">
        <UserIcon className="inline-block h-6 w-6" />
        Profile
      </NavLink>
    </div>
  );
}

export default function SideMenu() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuthenticated, user, setShowAuthFlow, handleLogOut } = useDynamicContext();
  const account = user?.walletPublicKey;
  const activeClassName = "flex justify-center my-4 py-1 p-1 gap-2 rounded bg-[#ff948e]";
  const baseClassName = "flex items-center my-4 py-1 p-1 justify-center rounded hover:text-primary-500";
  const [earnings] = useAtom(earningsAtom);

  const actionButton = isAuthenticated ? (
    <div className="flex w-[100px] cursor-not-allowed justify-center rounded-full bg-[#ff948e] px-2 py-3 text-center text-sm text-white" onClick={handleLogOut}>
      Sign Out
    </div>
  ) : (
    <div
      className="flex w-[100px] cursor-not-allowed justify-center rounded-full bg-[#ff948e] px-2 py-3 text-center text-sm  text-white"
      onClick={() => setShowAuthFlow(true)}
    >
      Sign In
    </div>
  );
  const focusSideMenu = () => {
    setShowSidebar(true);
  };
  const blurSlideMenu = () => {
    setShowSidebar(false);
  };
  return (
    <>
      {showSidebar ? (
        <div
          className={`z-10 hidden max-h-screen flex-shrink-0 flex-col border-r duration-1000 ease-in-out sm:flex sm:w-[250px] ${
            showSidebar ? "translate-x-0 " : "translate-x-0"
          }`}
        >
          <div className="flex w-full flex-row items-center justify-center py-7">
            <img src="/logo1.svg" alt="logo" width={150} height={150} />

            <ArrowCircleLeftIcon className="-mr-[250px] hidden h-5 w-5 cursor-pointer text-primary-500 sm:absolute sm:flex" onClick={blurSlideMenu} />
          </div>

          <MenuItems />
          <div className="mt-auto hidden flex-col items-center justify-center space-y-5 p-4 sm:flex">
            <div className="mt-auto flex w-full flex-row">
              {isAuthenticated && user && (
                <div className="flex flex-row space-x-4">
                  {isAuthenticated && user && <img className="h-12 w-12 rounded-full" src="/karararara.jpeg" alt="profile" />}
                  <div className="flex flex-col justify-center text-xs">
                    <p>{truncate(account)}</p>
                    <p className="text-[#8E9DB0]">moneyearner92@gmail.com</p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <span className="text-[10px]">Your have earned:</span>
              <span className="text-xs font-medium text-[#ff948e]"> ~{earnings?.toFixed(2)} USD </span>
              <span className="text-[10px]">so far.</span>
            </div>
            <div className="w-full border border-[#3A4554]"></div>
            {actionButton}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between bg-white px-4 pt-4">
          <div>
            <div className="flex w-full flex-row items-center justify-center" onClick={focusSideMenu}>
              <Image src="/logo1.svg" alt="logo" width={75} height={75} />

              <ArrowCircleRightIcon className="-mr-[100px] hidden h-5 w-5 cursor-pointer text-primary-500 sm:absolute sm:flex" />
            </div>
            <NavLink className={baseClassName} activeClassName={activeClassName} href="/">
              <HomeIcon className="inline-block h-6 w-6" />
            </NavLink>
            <NavLink className={baseClassName} activeClassName={activeClassName} href="/earn">
              <CashIcon className="inline-block h-6 w-6" />
            </NavLink>
            <NavLink className={baseClassName} activeClassName={activeClassName} href="/create">
              <CollectionIcon className="inline-block h-6 w-6" />
            </NavLink>
            <NavLink className={baseClassName} activeClassName={activeClassName} href="/dashboard">
              <UserIcon className="inline-block h-6 w-6" />
            </NavLink>
          </div>
          <div className="flex flex-col justify-center space-y-8 pb-8">
            <div className="mt-auto flex w-full flex-row justify-center">
              {isAuthenticated && user && (
                <div className="flex flex-col items-center justify-center space-y-1">
                  <img className="h-12 w-12 rounded-full" src="/karararara.jpeg" alt="profile" />{" "}
                </div>
              )}
            </div>
            <div className="border border-b border-[#3A4554]"></div>

            <div className="flex w-full flex-row justify-center">
              <div className="flex w-fit flex-row items-center rounded-full border border-[#3A4554] p-3">
                {isAuthenticated ? (
                  <LogoutIcon className="ml-1 h-4 w-4 cursor-pointer" onClick={handleLogOut} />
                ) : (
                  <LoginIcon className="ml-1 h-4 w-4 cursor-pointer" onClick={() => setShowAuthFlow(true)} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

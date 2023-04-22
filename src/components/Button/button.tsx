import React, { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export const Button = ({
  className = "",
  onClick,
  text,
  disabled = false,
  loading = false,
  primary = false,
  secondary = false,
  tertiary = false,
  success = false,
  warning = false,
  cancel = false,
  disabledClassName,
  type,
  href,
  ...args
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string | JSX.Element;
  disabled?: boolean;
  loading?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  success?: boolean;
  warning?: boolean;
  cancel?: boolean;
  children?: typeof React.Children;
  disabledClassName?: string;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) => {
  const variant = primary
    ? "border border-primary-500 text-white bg-primary-500 hover:text-white hover:bg-primary-shades-200 dark:bg-primary-500 dark:text-white dark:border-primary-500 dark:hover:border-primary-shades-200 dark:hover:bg-primary-shades-200 dark:hover:text-white"
    : secondary
    ? "border border-primary-tints-500 text-primary-500 bg-transparent hover:text-white hover:bg-primary-500 dark:text-primary-500 dark:border-primary-500 dark:hover:bg-primary-tints-900 dark:hover:border-primary-tints-900 dark:hover:text-white"
    : tertiary
    ? "border border-gray-tints-500 text-gray-shades-50 bg-transparent hover:text-gray-tints-50 hover:bg-gray-shades-50 dark:text-gray-tints-50 dark:border-gray-shades-500 dark:hover:bg-gray-tints-50 dark:hover:border-gray-tints-50 dark:hover:text-gray-shades-500"
    : warning
    ? "bg-transparent border border-red-400 text-red-400"
    : cancel
    ? "bg-gray-600 border border-gray-600 text-gray-100 hover:bg-gray-700 hover:border-gray-700"
    : success
    ? "bg-success border border-primary-500 text-gray-100 hover:border-primary-700 hover:bg-primary-700"
    : "";

  const loadingStyle = disabled
    ? disabledClassName ?? primary
      ? "border cursor-not-allowed bg-primary-tints-400 border-primary-tints-400 text-white dark:border-gray-shades-600 dark:bg-gray-shades-700 dark:text-gray-shades-600"
      : secondary
      ? "border cursor-not-allowed bg-transparent border-primary-tints-400 text-primary-tints-400 dark:bg-transparent-400 dark:border-gray-shades-400 dark:text-gray-shades-500"
      : tertiary
      ? "border cursor-not-allowed bg-transparent border-gray-tints-400 text-gray-tints-400 dark:bg-transparent-400 dark:border-gray-shades-400 dark:text-gray-shades-500"
      : "cursor-not-allowed dark:bg-[#1D222A] bg-gray-500 text-gray-100 dark:text-[#3A4554]"
    : loading
    ? variant + " cursor-not-allowed"
    : variant + " cursor-pointer";

  const LinkWrapper = ({ href, children }: { href?: string; children: JSX.Element }) =>
    href ? (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      children
    );

  return (
    <LinkWrapper href={href}>
      <button
        disabled={disabled || loading}
        type={type}
        className={`flex justify-center rounded-full py-3 px-5 ${className} ${loadingStyle}`}
        onClick={disabled || loading ? undefined : onClick}
        {...args}
      >
        {text}
      </button>
    </LinkWrapper>
  );
};

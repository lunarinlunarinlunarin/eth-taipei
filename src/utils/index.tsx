import { useCallback } from "react";

export function truncate(text?: string, [h, t]: [number, number] = [6, 4]): string {
  if (!text) return "";
  const head = text.slice(0, h);
  const tail = text.slice(-1 * t, text.length);
  return text.length > h + t ? [head, tail].join("...") : text;
}

/**
 * @description given a string value and a regular expression, return string with all matches against the regex removed
 * @param value
 * @param regex
 * @returns string with matching characters replaced
 */
export const toValidInput = (value: string, regex: RegExp) => {
  return value.replace(regex, "");
};

export function constuctExplorerUrl(txHash: string) {
  return "https://gnosisscan.io/tx/" + txHash;
}

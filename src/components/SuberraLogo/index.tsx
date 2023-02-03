import React, { useEffect, useState } from "react";
import Image from "next/image";
import darkLogo from "../../../public/suberra_logo_dark.png";
import lightLogo from "../../../public/suberra_logo_light.png";
import darkIcon from "../../../public/suberra_icon_dark.png";
import lightIcon from "../../../public/suberra_icon_light.png";
import { useThemeMode } from "../../hooks/useThemeMode";

export default function BrandLogo({ icon = false, dark = false }) {
  const { isDarkMode } = useThemeMode();
  const brandLogoSrc = isDarkMode || dark ? (icon ? darkIcon : darkLogo) : icon ? lightIcon : lightLogo;

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return <Image src={brandLogoSrc} alt="Brand Logo" />;
}

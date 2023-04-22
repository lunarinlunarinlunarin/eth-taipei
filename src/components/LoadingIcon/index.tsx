import Image from "next/image";

export const LoadingIcon = () => {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute">
        <Image height={65} width={42} src="/suberra_icon.webp" alt="Brand Logo" className="hover:cursor-pointer" />
      </span>
      <div className="suberra-loader"></div>
    </div>
  );
};

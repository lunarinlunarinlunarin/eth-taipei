import Image from "next/image";

export const LoadingIcon = () => {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute">
        <Image height={100} width={100} src="/logo.png" alt="Brand Logo" className="hover:cursor-pointer" />
      </span>
      <div className="suberra-loader"></div>
    </div>
  );
};

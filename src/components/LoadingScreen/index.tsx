import { LoadingIcon } from "../LoadingIcon";

const LoadingScreen = ({ error }: { error?: Error }) => {
  return (
    <div className="flex w-full min-h-[calc(100vh-225px)] sm:min-h-[calc(100vh-180px)] items-center">
      <div className="flex flex-col gap-8 text-sm text-text-theme-alt items-center justify-center w-full h-[30rem]">
        {error ? <div className="text-red-400">{error.message || "An error occurred"}</div> : <LoadingIcon />}
      </div>
    </div>
  );
};

export default LoadingScreen;

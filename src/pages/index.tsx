import BaseLayout from "../layouts/base";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen py-2">
      <div className="mx-8 flex h-[calc(100vw-100px)] w-full flex-col items-center">
        <div className="flex flex-col items-center py-24 space-y-1">Skeleton</div>
      </div>
    </div>
  );
}

Home.getLayout = (currentPage) => <BaseLayout>{currentPage}</BaseLayout>;

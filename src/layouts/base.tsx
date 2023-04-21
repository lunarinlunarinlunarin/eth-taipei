export default function BaseLayout({ children }) {
  return (
    <div className="flex flex-auto w-full h-screen">
      <div className="flex-grow-1 flex max-h-screen w-full flex-col overflow-auto bg-[#F6F7F9]">{children}</div>
    </div>
  );
}

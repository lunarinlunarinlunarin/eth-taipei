export default function LoadingDots({ size = 1, className = "" }) {
  let style = "w-1 h-1";

  if (size == 2) {
    style = "w-2 h-2";
  }
  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      <div className={`animate-pulse rounded-full bg-gray-300 ${style}`}></div>
      <div className={`animate-delay-50 animate-pulse rounded-full bg-gray-300 ${style}`}></div>
      <div className={`animate-delay-100 animate-pulse rounded-full bg-gray-300 ${style}`}></div>
    </div>
  );
}

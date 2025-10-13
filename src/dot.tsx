
export default function Dot ({
  className
} : { className?: string }) {
  return (
    <span className={`w-[3px] h-[3px] flex bg-black rounded-full ${className}`}></span>
  )
}

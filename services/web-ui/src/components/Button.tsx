export function Button({ label, type="default", onClick, className="" }: { label: string, type?:"default"|"outline", onClick: ()=>void, className?:string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-12 py-4 outline outline-4 outline-offset-[-4px] outline-primary ${type=="default"&&"bg-primary"} flex justify-center items-center gap-2.5 text-white text-2xl font-bold font-['Playfair_Display'] cursor-pointer ${className}`} 
    >
      {label}
    </button>
  )
}
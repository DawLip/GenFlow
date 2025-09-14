import { useRouter } from 'next/navigation';
import { SettingsMenuItem } from "./SettingsMenuItem";

export const SettingsMenu = ({settingsPath, settingsOptions}) => {
  const router = useRouter();
  
  return (
    <div className="w-64 self-stretch border-r-2 border-br inline-flex flex-col justify-start items-start">
      <div className="self-stretch flex-1 p-4 flex flex-col justify-start items-start gap-4">
        <div className="justify-start text-zinc-500 text-base font-bold font-['Inter'] leading-none">
          {settingsPath.map((segment) => (
            <span 
            key={segment} 
            className="hover:underline cursor-pointer"
            onClick={()=>{
              router.push(`/${settingsPath.slice(0, settingsPath.indexOf(segment)+1).join('/')}`);
            }}
            >
              {segment.charAt(0).toUpperCase() + segment.slice(1)}
            </span>
          )).reduce((prev, curr) => [prev, ' / ', curr])}
        </div>
        {/* <div className="self-stretch px-4 py-2 rounded-[32px] outline outline-2 outline-offset-[-2px] outline-br inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-on_bg_gray/50 text-base font-normal font-['Inter'] leading-none">
            Find...
          </div>
        </div> */}
        <div className="self-stretch flex flex-col justify-start items-start gap-1">
          {settingsOptions && settingsOptions.map((option) => (
            <SettingsMenuItem key={option.name} item={option} settingsPath={settingsPath} />
          ))}
        </div>
      </div>
    </div>
  );
};
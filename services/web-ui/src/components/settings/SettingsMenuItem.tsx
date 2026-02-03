import { useRouter } from 'next/navigation';

export const SettingsMenuItem = ({ item, settingsPath }: { item: { name: string}, settingsPath: string[] }) => {
  const router = useRouter();
  return (
    <div 
      className="self-stretch py-2 inline-flex justify-start items-start gap-2.5 hover:bg-[white]/10  cursor-pointer" 
      onClick={() => {router.push(`/${settingsPath.join('/')}/${item.name.toLowerCase()}`)}}
    >
      <div className="justify-start text-on_bg_gray/50 text-base font-normal font-['Inter'] leading-none">
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </div>
    </div>
  );
};
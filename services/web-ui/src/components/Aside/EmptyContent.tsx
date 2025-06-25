'use client';

export function EmptyContent({ children}: any) { 
  return (
    <div className="justify-start text-on_bg_gray/50 font-['Inter'] leading-none">
      {children}
    </div>
  );
}
'use client';

import { CSSProperties } from "react";

export function Icon({ name, extension, style, className, onClick }: { name: string, extension?: string, style?:CSSProperties, className?:string, onClick?: () => void }) {
  return (
    <img src={`/images/icons/${name}${extension||'_icon.svg'}`} alt={name} style={style} className={className} onClick={onClick} />
  );
}

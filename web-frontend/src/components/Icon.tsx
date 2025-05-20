'use client';

import { CSSProperties } from "react";

export function Icon({ name, extension, style, className }: { name: string, extension?: string, style?:CSSProperties, className?:string }) {
  return (
    <img src={`/images/icons/${name}${extension||'_icon.svg'}`} alt={name} style={style} className={className} />
  );
}

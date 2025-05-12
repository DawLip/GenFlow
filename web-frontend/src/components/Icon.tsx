'use client';

export function Icon({ name, extension }: { name: string, extension?: string }) {
  return (
    <img src={`/images/icons/${name}${extension||'_icon.svg'}`} alt={name} />
  );
}

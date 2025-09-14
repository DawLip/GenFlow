export function Icon({ name, color = '#fff', size = 16, className="", style= {}, onClick= () => {} }) {
  const url = `/images/icons/${name}_icon.svg`;
  return (
    <span
      className={className}
      onClick={onClick}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMask: `url(${url}) center / contain no-repeat`,
        mask: `url(${url}) center / contain no-repeat`,
        ...style,
      }}
    />
  );
}

const LineInputWidget = ({ data:{label, placeholder, value, setValue, password }}: {
  data: {
    label: string,
    placeholder: string,
    value: string,
    setValue: (value: string) => void,
    password?: boolean
  }
}) => {
  return (
    <div className="justify-start items-center gap-4 w-full">
      <label className="justify-start text-white text-m font-['Playfair_Display']">{label}</label>
      <input
        type={password ? 'password' : 'text'}
        placeholder={placeholder ||". . ."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 h-8 relative border-b border-primary w-full text-white"
      />
    </div>
  )
}

export default LineInputWidget
const TextInput = ({ label, placeholder, value, setValue, password }: {
  label: string,
  placeholder: string,
  value: string,
  setValue: (value: string) => void,
  password?: boolean
}) => {
  return (
    <div className="inline-flex flex-col justify-start items-start gap-2 w-full">
      <label className="justify-start text-white text-2xl font-bold font-['Playfair_Display']">{label}</label>
      <input
        type={password ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-8 relative border-b border-primary w-full text-white"
      />
    </div>
  )
}

export default TextInput
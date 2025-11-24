const TextAreaInputWidget = ({ data:{label, placeholder, value, setValue, password }}: {
  data: {
    label: string,
    placeholder: string,
    value: string,
    setValue: (value: string) => void,
    password?: boolean
  }
}) => {
  return (
    <div className="flex-col justify-start items-start w-full" draggable={false}>
      <label className="justify-start text-white text-sm">{label}</label>
      <textarea
        placeholder={placeholder ||". . ."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 min-h-32 relative border-b border-primary w-full text-gray-300 bg-transparent no-scrollbar text-sm "
      />
    </div>
  )
}

export default TextAreaInputWidget
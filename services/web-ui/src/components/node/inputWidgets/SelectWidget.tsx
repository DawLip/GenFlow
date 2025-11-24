const SelectWidget = ({ data:{label, value, setValue, options }}: {
  data: {
    label: string,
    value: string,
    setValue: (value: string) => void,
    options: any[]
  }
}) => {
  return (
    <div className="justify-start items-center gap-4 w-full" draggable={false}>
      <label className="justify-start text-white text-sm">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 h-8 relative border-b border-primary w-full text-white bg-black"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectWidget
const NumberInputWidget = ({ data:{label, value, setValue }}: {
  data: {
    label: string,
    value: string,
    setValue: (value: string) => void
  }
}) => {
  return (
    <div className="justify-start items-center gap-4 w-full">
      <label className="justify-start text-white text-sm">{label}</label>
      <input
        type={'number'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 h-8 relative border-b border-primary w-full text-white"
      />
    </div>
  )
}

export default NumberInputWidget
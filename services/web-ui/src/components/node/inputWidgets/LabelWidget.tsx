const LabelWidget = ({ data:{label, value, setValue }}: {
  data: {
    label: string,
    value: string,
    setValue: (value: string) => void
  }
}) => {
  return (
    <div className="justify-start items-center gap-4 w-full">
      <label className="justify-start text-white text-sm">{label}</label>
    </div>
  )
}

export default LabelWidget
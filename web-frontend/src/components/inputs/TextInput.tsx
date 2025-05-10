const TextInput = ({label, placeholder, value, setValue, password}: {
  label: string, 
  placeholder: string, 
  value: string, 
  setValue: (value: string) => void, 
  password?:boolean
}) => {
  return (
    <div className='flex flex-col'>
      <label>{label}</label>
      <input 
        type={password?'password':'text'} 
        placeholder={placeholder} 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
      />
    </div>
  )
}

export default TextInput
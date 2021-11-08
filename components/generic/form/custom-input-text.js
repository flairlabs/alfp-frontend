const CustomInputText = ({type, name, id, value, placeholder}) => (
    <input type={type} name={name} id={id} value={value} placeholder={placeholder}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
)

export {CustomInputText}

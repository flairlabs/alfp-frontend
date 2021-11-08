const CustomSelect = ({options, name, id, selected}) => (
    <select name={name} id={id} className="w-full border bg-white rounded px-3 py-2 outline-none">
        <option></option>
        {options.map(opt => (
            <option value={opt.id}>
                {opt.title}
            </option>
        ))}
    </select>
)

export {CustomSelect}

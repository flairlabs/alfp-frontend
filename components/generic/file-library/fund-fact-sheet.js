const FundFactSheetItems = (props) => (
    <ul className="divide-y divide-gray-300">
        {props.items.map(item => (
            <li className="p-4 hover:bg-gray-50 cursor-pointer" key={item.id}>
                <a href={item.fileLibraryItem.file.sourceUrl}>
                    {item.title}
                </a>
            </li>
        ))}
    </ul>
)

export {FundFactSheetItems}

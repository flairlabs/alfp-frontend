const FundFactSheetItems = (props) => (
    <ul className="file-library-item-group grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props.items.map(item => (
            <a href={item?.fileLibraryItem.file?.sourceUrl} key={item.id} className="file-library-item hover:bg-accent-1">
                {item.title}
            </a>
        ))}
    </ul>
)

export {FundFactSheetItems}

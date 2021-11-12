const  GenericListItem = ({item}) => (
    <a href={item?.fileLibraryItem.file?.sourceUrl} key={item.id} className="file-library-item hover:bg-accent-1">
        {item.title}
    </a>
)

export {GenericListItem}

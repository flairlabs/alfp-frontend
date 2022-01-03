const  GenericListItem = ({item}) => (
    <a href={item?.fileLibraryItem.file?.sourceUrl ? item?.fileLibraryItem.file?.sourceUrl : item?.fileLibraryItem.file?.mediaItemUrl} key={item.id} className="file-library-item hover:bg-accent-1">
        {item.title}
    </a>
)

export {GenericListItem}

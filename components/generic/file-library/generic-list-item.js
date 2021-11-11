const  GenericListItem = ({item}) => (
    <a href={item?.fileLibraryItem.file?.sourceUrl} key={item.id}>
        {item.title}
    </a>
)

export {GenericListItem}

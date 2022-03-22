const  FileLibraryItem = (props) => (
    <a href={props.props.fileLibraryItem.file.sourceUrl ? props.props.fileLibraryItem.file.sourceUrl : props.props.fileLibraryItem.file.mediaItemUrl} key={props.id} className="file-library-item hover:bg-accent-1">
        {props.props.title}
    </a>
)

export {FileLibraryItem}

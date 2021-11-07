const  FileLibraryItem = (props) => (
    <a href={props.props.fileLibraryItem.file.sourceUrl} key={props.id}>
        {props.props.title}
    </a>
)

export {FileLibraryItem}

import {FileLibraryItem} from "./file-library-items";

const FileLibraryItemGroup = (props) => (
    <>
        <h3 className="file-library-item-group-header">{props.props.name}</h3>
        <div className="file-library-item-group">
            {props.props.fileLibraryItems.nodes.map( node => <FileLibraryItem props={node} key={props.slug}/>)}
        </div>
    </>
)

export {FileLibraryItemGroup}

import {FileLibraryItem} from "./file-library-items";

const FileLibraryItemGroup = (props) => (
    <>
        <div className="file-library-item-group">
            {props.props[0].fileLibraryItems.nodes.map( node => <FileLibraryItem props={node} key={props.slug}/>)}
        </div>
    </>
)

export {FileLibraryItemGroup}

import {FileLibraryItem} from "./file-library-items";

const FileLibraryItemGroup = (props) => (
    <>
        <div className="file-library-item-group grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {props.props[0].fileLibraryItems.nodes.map( node => <FileLibraryItem props={node} key={props.slug}/>)}
        </div>
    </>
)

export {FileLibraryItemGroup}

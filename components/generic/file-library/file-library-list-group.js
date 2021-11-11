import {FileLibraryItem} from "./file-library-items";

const FileLibraryListGroup = (props) => (
    <>
        <ul className="file-library-item-group">
            {props.props[0].fileLibraryItems.nodes.map( node => <li><FileLibraryItem props={node} key={props.slug}/></li>)}
        </ul>
    </>
)

export {FileLibraryListGroup}

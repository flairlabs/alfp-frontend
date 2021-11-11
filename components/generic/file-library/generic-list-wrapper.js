import {GenericListItem} from "./generic-list-item";

const GenericListWrapper = ({items}) => (
    <>
        <div className="file-library-item-group">
            {items.map( item => <GenericListItem item={item} key={item?.id} />)}
        </div>
    </>
)

export {GenericListWrapper}

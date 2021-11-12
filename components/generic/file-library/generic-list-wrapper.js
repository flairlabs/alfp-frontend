import {GenericListItem} from "./generic-list-item";

const GenericListWrapper = ({items}) => (
    <>
        <div className="file-library-item-group grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map( item => <GenericListItem item={item} key={item?.id} />)}
        </div>
    </>
)

export {GenericListWrapper}

import {GenericListItem} from "./generic-list-item";

const GenericListWrapper = ({items, wrapAround = true}) => (
    <>
        {wrapAround ?
            <div
                className="my-2 max-w-sm w-full lg:max-w-full border-r border-t border-l border-b border-gray-200 rounded-b p-4 ">
                <h4 className="text-gray-900 font-bold text-xl mb-2 mb-3 border-b">Results</h4>
                <div className="file-library-item-group grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
                    {items.map(item => <GenericListItem item={item} key={item?.id}/>)}
                </div>
            </div>
            :
            <div className="file-library-item-group grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
                {items.map(item => <GenericListItem item={item} key={item?.id}/>)}
            </div>
        }
    </>
)

export {GenericListWrapper}

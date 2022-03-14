import {OtherFileLibraryItemsByYear} from "./others-by-year";

const OtherFileLibraryItems = ({items}) => (
    <div className="flex flex-wrap -mx-2 overflow-auto ">
        <div className="my-2 px-2 w-full overflow-auto">
            <OtherFileLibraryItemsByYear items={items.byYear} />
        </div>
    </div>
)

export {OtherFileLibraryItems}

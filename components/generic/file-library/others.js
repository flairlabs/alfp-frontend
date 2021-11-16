import {OtherFileLibraryItemsByYear} from "./others-by-year";

const OtherFileLibraryItems = ({items}) => (
    <div className="flex flex-wrap -mx-2 overflow-hidden">
        <div className="my-2 px-2 w-full overflow-hidden md:w-1/2 lg:w-1/2 xl:w-1/2">
            <OtherFileLibraryItemsByYear items={items.byYear} />
        </div>
    </div>
)

export {OtherFileLibraryItems}

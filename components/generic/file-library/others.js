import {OtherFileLibraryItemsByYear} from "./others-by-year";

const OtherFileLibraryItems = ({items}) => (
    <div className="flex">
        <div className="md:w-full lg:w-1/2">
            <h3>By Year</h3>
            <OtherFileLibraryItemsByYear items={items.byYear} />
        </div>
        <div className="md:w-full lg:w-1/2">
            <h3>Misc</h3>
        </div>
    </div>
)

export {OtherFileLibraryItems}

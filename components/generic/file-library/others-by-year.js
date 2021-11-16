import {GenericListWrapper} from "./generic-list-wrapper";

const OtherFileLibraryItemsByYear = (props) => (
    <>
        {Object.keys(props.items).map((k, idx) => (
            <div key={idx}>
                <h4 className="text-2xl border-b my-1">{k}</h4>
                <ul className="ml-2">
                {Object.keys(props.items[k]).map(m => (
                    <li>
                        <span className="text-xl border-b">{m}</span>
                        <div className="ml-3">
                            <GenericListWrapper items={props.items[k][m]} wrapAround={false} />
                        </div>
                    </li>
                ))}
                </ul>
            </div>
        ))}
    </>
)

export {OtherFileLibraryItemsByYear}

import {GenericListWrapper} from "./generic-list-wrapper";

const OtherFileLibraryItemsByYear = (props) => (
    <>
        {Object.keys(props.items).map((k, idx) => (
            <div key={idx}>
                <h4>{k}</h4>
                <ul>
                {Object.keys(props.items[k]).map(m => (
                    <li>
                        {m}
                        <GenericListWrapper items={props.items[k][m]} />

                    </li>
                ))}
                </ul>
            </div>
        ))}
    </>
)

export {OtherFileLibraryItemsByYear}

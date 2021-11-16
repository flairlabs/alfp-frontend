function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function InfoTable({data, theme}) {
    let topLinkNormal = "text-gray-600 hover:bg-accent-1"
    let topLinkHover = "bg-accent-1 text-gray-800"

    if(theme === "350c"){
        topLinkNormal = "text-gray-600 hover:text-white hover:bg-accent-2"
        topLinkHover = "bg-accent-2 text-white"
    }
    return (
        <>
            <table className="table-auto w-full border-separate">
                <tbody>
                {data.map( (d, idx) => (
                    <tr key={d[0]} className="my-1">
                        <td className={classNames(topLinkHover, "text-sm font-semibold px-3 py-2")}>{d[0]}</td>
                        <td className={classNames(idx % 2 === 0 ? "bg-gray-300" : "", "text-sm px-3 py-2")}>{d[1]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

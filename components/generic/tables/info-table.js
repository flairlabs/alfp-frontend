function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function InfoTable({data, theme}) {
    let topLinkHover = "bg-gray-300 text-gray-800"
    let topLinkNormal = topLinkHover // "text-gray-600 hover:bg-accent-1"
    return (
        <>
            <table className="table-auto w-full border-separate">
                <tbody>
                {data.map( (d, idx) => (
                    <tr key={d[0]} className="my-1">
                        <td className={classNames(idx % 2 === 0 ? topLinkHover : topLinkNormal, "text-sm font-semibold px-3 py-2 w-1/2")}>{d[0]}</td>
                        <td className={classNames(idx % 2 === 0 ? "bg-gray-100" : "", "text-sm px-3 py-2 w-1/2")}>{d[1]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

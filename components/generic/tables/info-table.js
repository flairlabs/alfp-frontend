function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function InfoTable({data}) {
    return (
        <>
            <table className="table-auto w-full border-separate">
                <tbody>
                {data.map( (d, idx) => (
                    <tr key={d[0]} className="my-1">
                        <td className="text-sm font-semibold bg-gray-800 text-white px-3 py-2">{d[0]}</td>
                        <td className={classNames(idx % 2 === 0 ? "bg-gray-300" : "", "text-sm px-3 py-2")}>{d[1]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

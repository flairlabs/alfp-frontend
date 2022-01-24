
export default function FundTable({chartData}) {
    return (
        <>
            <table className="table-fixed w-full">
                <thead>
                <tr>
                    <th className="w-1/2 text-left">Date</th>
                    <th className="w-1/2 text-left">Price</th>
                </tr>
                </thead>
                <tbody>
                {chartData.map( (d) => (
                    <tr key={d[0]}>
                        <td>{d[0]}</td>
                        <td>{d[1]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

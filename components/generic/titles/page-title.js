export default function PageTitle({title, center=false, allCaps=false}) {
    return (
        <h1 className="page-title">
            {allCaps ? title.toUpperCase() : title}
        </h1>
    )
}

export default function PageTitle({title, center=false, allCaps=false, extraClasses="text-accent-2"}) {
    const classNames = "page-title " + extraClasses
    return (
        <h1 className={classNames}>
            {allCaps ? title.toUpperCase() : title}
        </h1>
    )
}

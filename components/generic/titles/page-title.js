function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PageTitle({title, center=false}) {
    return (
        <h1 className="page-title">
            {title}
        </h1>
    )
}

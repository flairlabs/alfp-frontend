function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PageTitle({title, center=false}) {
    return (
        <h1 className={classNames(
            center ? 'text-center' : '',
            'font-bold sm:text-3xl md:text-5xl sm:my-3 md: my-7'
        )}>
            {title}
        </h1>
    )
}

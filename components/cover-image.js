import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

export default function CoverImage({title, coverImage, slug}) {
    const src = coverImage?.sourceUrl
    return (
        <div className="sm:mx-0">
            {src ? (
                <Image
                    width={2000}
                    height={1000}
                    alt={`Cover Image for ${title}`}
                    src={coverImage?.sourceUrl}
                    className={cn('shadow-small', {
                        'hover:shadow-medium transition-shadow duration-200': slug,
                    })}
                />
            ) : (
                <span>no image</span>
            )}
        </div>
    )
}

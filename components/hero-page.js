import CoverImage from '../components/cover-image'
import Link from 'next/link'

export default function HeroPage({
                                     title,
                                     coverImage,
                                     excerpt,
                                     slug,
                                     url
                                 }) {
    return (
        <section>
            <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
                        <Link href={`${url}`}>
                            <a
                                className="hover:underline"
                                dangerouslySetInnerHTML={{__html: title}}
                            />
                        </Link>
                    </h3>
                    {coverImage && (
                        <Link href={`${url}`}>
                            <CoverImage title={title} coverImage={coverImage} slug={slug}/>
                        </Link>
                    )}
                </div>
                <div>
                    <div
                        className="text-lg leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{__html: excerpt}}
                    />
                </div>
            </div>
        </section>
    )
}

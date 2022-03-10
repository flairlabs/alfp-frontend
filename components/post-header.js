import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Categories from '../components/categories'

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar author={author} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
          {/*<img src={coverImage?.sourceUrl} width="100%"/>*/}
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div>
          Posted <Date dateString={date} />
      </div>
    </>
  )
}

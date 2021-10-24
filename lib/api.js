const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, {variables} = {}) {
    const headers = {'Content-Type': 'application/json'}

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers[
            'Authorization'
            ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    }

    const res = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
    const data = await fetchAPI(
        `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
        {
            variables: {id, idType},
        }
    )
    return data.post
}

export async function getAllPostsWithSlug() {
    const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
    return data?.posts
}

export async function getAllPages(preview) {
    const data = await fetchAPI(
        `
      query AllPages {
          pages {
            edges {
              node {
                id
                title
                slug
                content
              }
            }
          }
        }
      `,
        {
            variables: {
                onlyEnabled: !preview,
                preview,
            },
        }
    )

    return data?.pages
}

export async function getPagePreview(id) {
    try {
        const data = await fetchAPI(
            `
       query PageQuery ($id: ID!) {
          page(id: $id) {
            id
            title
            slug
            featuredImage {
                node {
                 sourceUrl
                }
            }
          }
        }
        `, {
                variables: {
                    id: id
                }
            }
        )
        const page = data?.page;
        console.log(page)
        if (page) {
            const isDraft = data.page.status === "publish";
            if (!isDraft) {
                return page
            }
        } else {
            return {
                id: null
            }
        }
    } catch (e) {
        return {
            id: null
        }
    }
}

export async function getFund(slug) {
    const query = `
    query FundQuery {
      fundBy(slug: "${slug}") {
        id
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        link
        slug
        title
        funds {
          infoTable
          video
        }
      }
    }
    `
    try {
        const data = await fetchAPI(query)
        const page = data?.fundBy;
        if (page) {
            const isDraft = data.fundBy.status === "publish";
            if (!isDraft) {
                return page
            }
        } else {
            return {
                id: null
            }
        }
    } catch(e){
        return null
    }
}

export async function getPage(id) {
    let is404 = true;
    try {
        const data = await fetchAPI(
            `
       query PageQuery ($id: ID!) {
          page(id: $id) {
            id
            title
            content
            slug
            featuredImage {
                node {
                 sourceUrl
                }
            }
          }
        }
        `, {
                variables: {
                    id: id
                }
            }
        )
        const page = data?.page;
        if (page) {
            const isDraft = data.page.status === "publish";
            if (!isDraft) {
                return page
            }
        } else {
            return {
                id: null
            }
        }
    } catch (e) {
        return {
            id: null
        }
    }
}

export async function getPageByURI(uri) {
    let is404 = true;
    try {
        const data = await fetchAPI(
            `
       query PageBy {
          pageBy(uri: "${uri}") {
            id
            title
            content
            slug
            featuredImage {
                node {
                 sourceUrl
                }
            }
          }
        }
        `)
        const page = data?.pageBy;
        if (page) {
            const isDraft = page.status === "publish";
            if (!isDraft) {
                return page
            }
        } else {
            return {
                id: null
            }
        }
    } catch (e) {
        return {
            id: null
        }
    }
}

export async function getMainCarouselItems() {
    const data = await fetchAPI(
        `
        query MainCarouselItems {
            mainCarouselItems {
                nodes {
                  mainCarouselItem {
                    url
                  }
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                }
              }
        }
        `
    )
    return data?.mainCarouselItems?.nodes
}


export async function getAllPostsForHome(preview) {
    const data = await fetchAPI(
        `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
        {
            variables: {
                onlyEnabled: !preview,
                preview,
            },
        }
    )

    return data?.posts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
    const postPreview = preview && previewData?.post
    // The slug may be the id of an unpublished post
    const isId = Number.isInteger(Number(slug))
    const isSamePost = isId
        ? Number(slug) === postPreview.id
        : slug === postPreview.slug
    const isDraft = isSamePost && postPreview?.status === 'draft'
    const isRevision = isSamePost && postPreview?.status === 'publish'
    const data = await fetchAPI(
        `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
            // Only some of the fields of a revision are considered as there are some inconsistencies
            isRevision
                ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
                : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
        {
            variables: {
                id: isDraft ? postPreview.id : slug,
                idType: isDraft ? 'DATABASE_ID' : 'SLUG',
            },
        }
    )

    // Draft posts may not have an slug
    if (isDraft) data.post.slug = postPreview.id
    // Apply a revision (changes in a published post)
    if (isRevision && data.post.revisions) {
        const revision = data.post.revisions.edges[0]?.node

        if (revision) Object.assign(data.post, revision)
        delete data.post.revisions
    }

    // Filter out the main post
    data.posts.edges = data.posts.edges.filter(({node}) => node.slug !== slug)
    // If there are still 3 posts, remove the last one
    if (data.posts.edges.length > 2) data.posts.edges.pop()

    return data
}

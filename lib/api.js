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
        throw new Error('Failed to fetch API: ' + query)
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
      posts(first: 10000, where: {status: PUBLISH}) {
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
          pages(first: 10000, where: {status: PUBLISH}) {
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
       query PageQuery ($id: ID!, where: {status: PUBLISH}) {
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
            mediaItemUrl
          }
        }
        link
        slug
        title
        funds {
          
          fundValueName
          infoTable
          factSheet {
              sourceUrl
              mediaItemUrl
            }
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
    } catch (e) {
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
            pageExtras {
              includeOtherFunds
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

export async function getFactSheet(uri) {
    let is404 = true;
    try {
        const data = await fetchAPI(
            `
       query FactSheetBy {
          factSheetBy(uri: "${uri}, where: {status: PUBLISH}") {
            id
            title
            content
            slug            
          }
        }
        `)
        const page = data?.factSheetBy;
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

export async function getBoardMembers() {
    let query = `
    query BoardMemberQuery {
      boardMembers(first: 10000, where: {status: PUBLISH}) {
        nodes {
          boardMemberFields {
            name
            position
            displayOrder
            description
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
    try {
        const data = await fetchAPI(query)
        return data.boardMembers.nodes
    } catch (e) {
        console.log("error: ", e)
        return []
    }
}

export async function getFundManagerBoardMembers() {
    let query = `
    query FundManagerBoardMemberQuery {
      fundManagerBoardMembers(first: 10000, where: {status: PUBLISH}) {
        nodes {
          fundManagerBoardMemberFields {
            name
            position
            displayOrder
            description
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
    try {
        const data = await fetchAPI(query)
        return data.fundManagerBoardMembers.nodes
    } catch (e) {
        console.log("error: ", e)
        return []
    }
}

export async function getDistributors() {
    let query = `
    query DistributorQuery {
        distributors(first: 10000, where: {status: PUBLISH}) {
            nodes {
              featuredImage {
                node {
                  sourceUrl
                }
              }
              distributorFields {
                name
                contactDetails
                displayOrder
              }
            }
          }
    }
    `
    try {
        const data = await fetchAPI(query)
        return data.distributors.nodes
    } catch (e) {
        console.log("error: ", e)
        return []
    }
}

export async function getFAQs() {
    let query = `
        query faqQuery {
          fAQs(first: 10000, where: {status: PUBLISH}) {
            nodes {
              faqFields {
                question
                displayOrder
                answer
              }
            }
          }
        }

    `
    try {
        const data = await fetchAPI(query)
        return data.fAQs.nodes
    } catch (e) {
        console.log("error: ", e)
        return []
    }
}

export async function getFunds() {
    let query = `
        query FundsQuery {
          funds(first: 10000, where: {status: PUBLISH}) {
            nodes {
              title
              slug
              id
              featuredImage {
                node {
                  sourceUrl
                }
              }
              excerpt
            }
          }
        }

    `
    try {
        const data = await fetchAPI(query)
        return data.funds.nodes
    } catch (e) {
        console.log("error: ", e)
        return []
    }
}

export async function getFileLibraryItems() {
    let query = `
    query FileLibraryItems {
        fileLibraryItemTypes(first: 10000, where: {status: PUBLISH}) {
            nodes {
              name
              slug
              children {
                nodes {
                  count
                  name
                  children {
                    nodes {
                      count
                      children {
                        nodes {
                          name
                          fileLibraryItems {
                            nodes {
                              id
                              title
                              fileLibraryItem {
                                document
                                fund {
                                  ... on Fund {
                                    id
                                    title
                                  }
                                }
                                month
                                year
                                file {
                                  sourceUrl
                                }
                              }
                            }
                          }
                          fileLibraryTaxonomyFields {
                            fileLibraryType
                            order
                          }
                        }
                      }
                    }
                  }
                }
              }
              fileLibraryItems {
                nodes {
                  id
                  title
                  fileLibraryItem {
                    document
                    fund {
                      ... on Fund {
                        id
                        title
                      }
                    }
                    month
                    year
                    file {
                      sourceUrl
                    }
                  }
                }
              }
              fileLibraryTaxonomyFields {
                fileLibraryType
                order
              }
            }
          }
    }

    `

    try {
        const data = await fetchAPI(query)
        return data.fileLibraryItemTypes.nodes
    } catch (e) {
        console.log("error: ", e)
        return []
    }
}

export async function getFileLibraryItemByTypeSlug(slug) {
    let query = `
        query FileLibraryItems {
            fileLibraryItemTypes(first: 1000000, where: {slug: "${slug}"}) {
                nodes {
                  name
                  slug
                  
                  fileLibraryItems(
                      first: 1000000
                      where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}
                  ) {
                    nodes {
                      id
                      title
                      fileLibraryItem {
                        document
                        fund {
                          ... on Fund {
                            id
                            title
                          }
                        }
                        month
                        year
                        file {
                          sourceUrl
                          mediaItemUrl
                        }
                      }
                    }
                  }
                  fileLibraryTaxonomyFields {
                    fileLibraryType
                    order
                  }
                }
              }
        }    
    `
    try {
        const data = await fetchAPI(query)
        return data.fileLibraryItemTypes.nodes
    } catch (e) {
        console.log("error: ", e)
        return []
    }
}

export async function getRelatedSitesMenu() {
    let query = `query RelatedSites {
          menu($id: "dGVybTo0MTA=") {
            menuItems {
              nodes {
                url
                label
              }
            }
          }
        }
        `
    try {
        const data = await fetchAPI(query)
        return data.data?.menu?.menuItems?.nodes
    }catch(e) {
        return []
    }
}


export async function getFundValues(count = 2) {
    if( !count ){
        count = 10000
    }
    let query = `query FundValueQuery {
      fundValues(first: ${count}, where: {status: PUBLISH}) {
        nodes {
          title
          slug
          fundValueFields {
            alfmDollarBondFund
            alfmEuroBondFund
            alfmGlobalMultiAssetIncomeFund
            alfmGlobalMultiAssetIncomeFundPhp
            alfmGrowthFund
            alfmMoneyMarketFund
            alfmMoneyMarketFundUnits
            alfmPesoBondFund
            alfmPhilippineStockIndexFund
            alfmPhilippineStockIndexFundUnits      
            ekklesiaMutualFund
            alfmRealEstateIncomeFund
            date
          }
        }
      }
    }
    `
    try {
        const data = await fetchAPI(query)
        return data.fundValues.nodes
    } catch (e) {
        console.log("error: ", e)
        return []
    }
}

export async function getFileLibrary(uri) {
    let is404 = true;
    try {
        const data = await fetchAPI(
            `
       query FileLibraryBy {
          fileLibraryBy(uri: "${uri}", where: {status: PUBLISH}) {
            id
            title
            content
            slug            
          }
        }
        `)
        const page = data?.fileLibraryBy;
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
            mainCarouselItems(first: 10000, where: {status: PUBLISH}) {
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

export async function getOtherFunds() {
    const data = await fetchAPI(
        `
        query OtherFundsQuery {
          otherFunds(first: 10000, where: {status: PUBLISH}) {
            nodes {
              title
              otherFundFields {
                link
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

    return data?.otherFunds?.nodes
}

export async function getAllPostsForHome(preview) {
    const data = await fetchAPI(
        `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }) {
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

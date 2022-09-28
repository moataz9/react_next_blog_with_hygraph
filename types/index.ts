type author = {
  bio: string
  id: string
  name: string
  photo: photo
}
type photo = {
  url: string
}
type category = {
  name: string
  slug: string
}

export type post = {
  author: author
  excerpt: string
  createdAt: string
  slug: string
  title: string
  experct: string
  photo: photo
  featuredImage: photo
  categories: category[]
  node?: post
}

const blogs = [
  {
    likes: 2,
    author: 'Nuutti Sillankorva',
    title: 'Testataanpa taas',
    url: 'www.nuutti.fi',
    user: {
      username: 'apartanen',
      name: 'Antti',
      id: '5d18c8fbc25b09245cf9ff9c'
    },
    id: '5d1b99e5b171c305384fa482'
  },
  {
    likes: 0,
    author: 'J. Partanen',
    title: 'Toinen testi',
    url: 'www.blog.fi',
    user: {
      username: 'jpartanen',
      name: 'Joonas',
      id: '5d1a19ad64d4f72e24739110'
    },
    id: '5d1cc04e6f5819360c0ee526'
  },
  {
    likes: 0,
    author: 'Nuutti Sillankorva',
    title: 'Kolmas testi',
    url: 'www.fullstack.com',
    user: {
      username: 'jpartanen',
      name: 'Joonas',
      id: '5d1a19ad64d4f72e24739110'
    },
    id: '5d1cc0606f5819360c0ee527'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, token, setToken }

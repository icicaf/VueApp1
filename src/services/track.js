import platziMusicService from './platzi-music'

const trackService = {}

trackService.search = (q) => {
  const type = 'track'

  const resultado = platziMusicService.get('/search', { params: { q, type } })
    .then(res => res.data)
    .catch(err => console.error(err))

  return resultado
}

trackService.getById = (id) => {
  return platziMusicService.get(`/tracks/${id}`)
    .then(res => res.data)
}

export default trackService

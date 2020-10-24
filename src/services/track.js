import platziMusicService from './platzi-music'

const trackService = {}

trackService.search = function (q) {
  const type = 'track'

  const resultado = platziMusicService.get('/search', { params: { q, type } })
    .then(res => res.data)
    .catch(err => console.error(err))

  return resultado
}

export default trackService

const msToMn = {}

function convertMsToMn (ms) {
  const min = Math.floor(ms / 60000)
  const sec = ((ms % 60000 / 1000).toFixed(0))

  return `${min}: ${sec.padStart(2, 0)}`
}

msToMn.install = (Vue) => {
  Vue.filter('ms-to-mn', (val) => {
    return convertMsToMn(val)
  })
}

export default msToMn

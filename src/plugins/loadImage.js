export default {
  install(app) {
    // $loadImage 비동기방식
    app.config.globalProperties.$loadImage = src => {
      return new Promise(resolve => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load',() => {
          //완료!
          resolve()
        })
      })
    }
  }
}
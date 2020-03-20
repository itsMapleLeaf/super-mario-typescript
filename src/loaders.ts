export function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => {
      resolve(image)
    })

    image.addEventListener('error', event => {
      reject(`Could not load image from ${url}`)
    })

    image.src = url
  })
}

export function loadJSON<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json())
}

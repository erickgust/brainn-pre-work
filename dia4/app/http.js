const request = (url, options) =>
fetch(url, options)
  .then(res => res.json())
  .catch(err => ({ error: true, message: err.message }))

const createRequest = (method) => (url, data) => request(url, {
  method,
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(data)
})

export const get = url => request(url)
export const post = createRequest('POST')
export const del = createRequest('DELETE')

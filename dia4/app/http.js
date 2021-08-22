const request = (url, options) =>
fetch(url, options)
  .then(res => res.json())
  .catch(err => ({ error: true, message: err.message }))

export const get = url => request(url)
export const post = (url, data) => request(url, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(data)
})

export const del = () => {}

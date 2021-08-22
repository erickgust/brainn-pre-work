import './style.css'
import { del, get, post } from './http'

const form = document.querySelector('[data-js="cars-form"]')
const table = document.querySelector('[data-js="table"]')

const url = 'http://localhost:3333/cars'

const getFormElement = (event) => (elementName) => {
  return event.target.elements[elementName]
}

const elementTypes = {
  image: createImage,
  text: createText,
  color: createColor
}

function createImage({src, alt}) {
  const td = document.createElement('td')
  const img = document.createElement('img')
  img.src = src
  img.alt = alt
  img.width = 100
  td.appendChild(img)
  return td
}

function createText(value) {
  const td = document.createElement('td')
  td.textContent = value
  return td
}

function createColor(value) {
  const td = document.createElement('td')
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.backgroundColor = value
  td.appendChild(div)
  return td
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const getElement = getFormElement(event)

  const data = {
    image: getElement('image').value,
    brandModel: getElement('model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value
  }

  const result = await post(url, data)

  if (result.error) {
    callErrorToast(result.message)
    return
  }


  const noContent = document.querySelector('[data-js="no-content"]')
  if (noContent) {
    table.removeChild(noContent)
  }

  createTableRow(data)

  event.target.reset()
  image.focus()
})

function callErrorToast (message) {
  const errorToastExist = document.querySelector('[data-js="toast"]')

  if (!errorToastExist) {
    const errorToast = document.createElement('div')
    errorToast.dataset.js = 'toast'
    errorToast.classList = 'toast'
    errorToast.classList.add('-show')
    errorToast.textContent = message
    document.body.appendChild(errorToast)

    setTimeout(() => {
      errorToast.classList.remove('-show')
      document.body.removeChild(errorToast)
    }, 3000)
  }
}

function createTableRow (data) {
  const elements = [
    { type: 'image', value: {src: data.image, alt: data.brandModel} },
    { type: 'text', value: data.brandModel },
    { type: 'text', value: data.year },
    { type: 'text', value: data.plate },
    { type: 'color', value: data.color }
  ]

  const tr = document.createElement('tr')
  tr.dataset.plate = data.plate
  elements.forEach(element => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })

  const button = document.createElement('button')
  button.textContent = 'Excluir'
  button.dataset.plate = data.plate
  tr.appendChild(button)

  button.addEventListener('click', handleDelete)

  table.appendChild(tr)
}

async function handleDelete (event) {
  const button = event.target
  const plate = button.dataset.plate

  const result = await del(url, { plate })

  if (result.error) {
    return
  }

  const tr = document.querySelector(`tr[data-plate="${plate}"]`)
  table.removeChild(tr)
  button.removeEventListener('click', handleDelete)

  const allTrs = table.querySelector('tr')
  if (!allTrs) {
    createNoCarRow()
  }
}

function createNoCarRow() {
  const tr = document.createElement('tr')
  const td = document.createElement('td')
  const thsLength = document.querySelectorAll('table th').length
  td.setAttribute('colspan', thsLength)
  td.textContent = 'Nenhum carro encontrado'

  tr.dataset.js = 'no-content'
  tr.appendChild(td)
  table.appendChild(tr)
}

async function main () {
  const result = await get(url)

  if (result.error) {
    return
  }

  if (result.length === 0) {
    createNoCarRow()
    return
  }

  // passou
  result.forEach(createTableRow)
}

main()

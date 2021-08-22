import './style.css'

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

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const getElement = getFormElement(event)

  const data = {
    image: getElement('image').value,
    brandModel: getElement('model').value,
    year: getElement('year').value,
    plate: getElement('plate').value,
    color: getElement('color').value
  }

  createTableRow(data)

  event.target.reset()
  image.focus()
})

function createTableRow (data) {
  const elements = [
    { type: 'image', value: {src: data.image, alt: data.brandModel} },
    { type: 'text', value: data.brandModel },
    { type: 'text', value: data.year },
    { type: 'text', value: data.plate },
    { type: 'color', value: data.color }
  ]

  const tr = document.createElement('tr')
  elements.forEach(element => {
    const td = elementTypes[element.type](element.value)
    tr.appendChild(td)
  })

  table.appendChild(tr)
}

function createNoCarRow() {
  const tr = document.createElement('tr')
  const td = document.createElement('td')
  const thsLength = document.querySelectorAll('table th').length
  td.setAttribute('colspan', thsLength)
  td.textContent = 'Nenhum carro encontrado'

  tr.appendChild(td)
  table.appendChild(tr)
}

async function main () {
  const result = await fetch(url)
    .then(res => res.json())
    .catch(err => ({ error: true, message: err.message }))

  if (result.error) {
    console.log(`Erro ao buscar carros ${result.message}`)
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

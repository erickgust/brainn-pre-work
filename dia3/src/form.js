const inputName = document.querySelector('[data-js="name"]')
const keepLowerCase = ["de", "da", "do", "das", "dos"]

function toCapitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

inputName.addEventListener('input', (event) => {
  const inputValuesArr = event.target.value.split(/\s+/g)

  event.target.value = inputValuesArr.map(word => {
    return keepLowerCase.includes(word.toLowerCase())
    ? word.toLowerCase()
    : toCapitalize(word)
  }).join(' ')
})

const form = document.querySelector('[data-js="form"]')
const select = document.createElement('select')
const colors = [
  {roxo: "#4A1942"},
  {azul: "#228CDB"},
  {verde: "#2CDA9D"},
  {amarelo: "#FCFC62"},
  {laranja: "#EB5E28"},
]
const divContainer = document.createElement('div')
divContainer.style.display = 'flex'
divContainer.style.flexWrap = 'wrap'

function createOption(color) {
  const option = document.createElement('option')
  option.value = Object.values(color)
  option.textContent = toCapitalize(Object.keys(color)[0])
  return option
}

function createDiv(value) {
  const div = document.createElement('div')
  div.style.width = '100px'
  div.style.height = '100px'
  div.style.backgroundColor = value

  return div
}

colors.forEach(color => {
  const newOption = createOption(color)
  select.appendChild(newOption)
})

select.addEventListener('change', (event) => {
  divContainer.innerHTML = ''

  Array.from(event.target.selectedOptions).forEach(input => {
    const newDiv = createDiv(input.value)
    divContainer.appendChild(newDiv)
  })
})

select.setAttribute('multiple', '')
form.appendChild(select)
document.body.appendChild(divContainer)

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

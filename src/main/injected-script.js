alert('injected script')
let index = {
  id: ''
}

window.__API__.onActiveHandle((index)=>{
  console.log('active:', index)
  let elem;
  if(index.id) {
    elem = document.querySelector(`#${index.id}`)
  }
  console.log(elem)
  console.dir(elem)
  elem.click()

  var event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    clientX: 150,
    clientY: 150
  });
  elem.dispatchEvent(event); 
})

document.addEventListener('click', (event) => {
  event.preventDefault()

  console.dir(event.target)
  index.id = event.target.id
  window.__API__.sendIndexOnButton(index)
})

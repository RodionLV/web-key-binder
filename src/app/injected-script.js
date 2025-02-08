alert("injected-script")

let index = {
  id: ""
}

document.addEventListener('click', (event)=>{
  event.preventDefault()
  console.log(window)
  
  console.dir(event.target)
  index.id = event.target.id
  window.__API__.sendIndexOnButton(index)
})



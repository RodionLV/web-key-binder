const view = document.querySelector("#view")

document.addEventListener("DOMContentLoaded", ()=>{
  console.dir(view);
  view.style.width = __API__.getViewWidth() + 'px'
})
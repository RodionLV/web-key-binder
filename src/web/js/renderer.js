const view = document.querySelector("#view")
const btnUrl = document.querySelector("#btn-url")
const inputUrl = document.querySelector("#input-url")

btnUrl.onclick = () => {
  __API__.setViewUrl(inputUrl.value)
}

__API__.onSelectedBtn((value)=>{
  console.log(value)
})

console.dir(btnUrl)
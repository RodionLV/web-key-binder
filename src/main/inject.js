function exec(){
  console.log('injected script')
  const DEEP_SEARCH = 3
  const HANDLER_TYPES = ['INPUT', 'TEXTAREA', 'BUTTON']

  let options = {
    selectionMode: false
  }

  function Index(type = '', id = '', classes = '') {
    ;(this.id = id), (this.classes = classes), (this.type = type)
  } 
  
  function setupPage() {
    const elements = document.querySelectorAll('button, input, textarea')
    let i = 0;

    for(let elem of elements) {
      if(elem.id == "") {
        elem.id = `_uniq_id_${i++}`
      }
    }
  }
  setupPage()

  window.__API__.onActiveHandle((index) => {
    let elem = document.querySelector(index.id)
    console.log('active:', index, elem)
    if (elem) {
      elem.click()
    }
  })

  window.__API__.onChangeOptions(({ selectionMode }) => { 
    if(options.selectionMode != selectionMode){
      options.selectionMode = selectionMode

      document.body.classList.toggle('selectionMode', selectionMode)

      if( selectionMode ){  
      }else{
      }
    }
  })


  document.addEventListener(
    'click',
    (event) => {
      if( !options.selectionMode ) {
        return;
      }
      event.preventDefault()
      event.stopImmediatePropagation()
      let handleElem = event.target
      let index = new Index()

      for (let i = 0; i < DEEP_SEARCH; i++) {
        if (HANDLER_TYPES.indexOf(handleElem.nodeName) != -1) {
          index.type = handleElem.nodeName
          break
        }

        handleElem = handleElem.parentElement
      }

      if (index.type == '') {
        alert('Не найден соответсвующий элемент')
        return
      }

      index.id = handleElem.id  
      window.__API__.sendIndexOnButton(index)
    },
    { capture: true }
  )
}

function injectCSS() {
  return ` 
  button, input, textarea {
    position: relative !important;
    z-index: 20000 !important; 
  }
  body.selectionMode{
    cursor: pointer !important;
  }
  body.selectionMode button,
  body.selectionMode input,
  body.selectionMode textarea {
    border: 1px solid red !important;
  }
  .selectedElement{
    border: 1px solid green !important;
  } 
  `
}

function injectScript(){
  return `(${exec.toString()})()`;  
}

export {
  injectScript,
  injectCSS
};
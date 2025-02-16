// import type { ViewApi } from '../types/types'

declare const window: {
  __API__: ViewApi
} & Window

function exec() {
  console.log('injected script')

  const DEEP_SEARCH = 3
  const HANDLER_TYPES = ['INPUT', 'TEXTAREA', 'BUTTON']

  const checkElementIsBindable = (element: HTMLElement): boolean => {
    return HANDLER_TYPES.indexOf(element.nodeName) != -1
  }

  const options: ViewOptions = {
    selectionMode: false
  }

  function* generateElementId() {
    let id = 0
    while(true) {
      yield `_uniq_id_${id++}`
    }
  }
  const generatorId = generateElementId()

  function setupPage() {
    const elements = document.querySelectorAll('textarea, input, button')
    let i = 0

    for (const elem of elements) {
      if (elem.id == '') {
        elem.id = generatorId.next().value
      }
    }
  }
  setupPage()

  window.__API__.onActivate((index) => {
    const elem = document.querySelector<HTMLElement>(index.id)
    if (elem) {
      elem.click()
    }
  })

  window.__API__.onChangeOptions(({ selectionMode }) => {
    if (options.selectionMode != selectionMode) {
      options.selectionMode = selectionMode
      document.body.classList.toggle('selectionMode', selectionMode)
    }
  })

  document.addEventListener(
    'click',
    (event) => {
      if (!options.selectionMode) {
        return
      }
      event.preventDefault()
      event.stopImmediatePropagation()

      let handleElem = event.target as HTMLElement
      const element: BindingElement = { id: '' }

      for (let i = 0; i < DEEP_SEARCH; i++) {
        if ( checkElementIsBindable(handleElem) ) {
          element.type = handleElem.nodeName as BindableElementType
          break
        }
        if (handleElem.parentElement != null) {
          handleElem = handleElem.parentElement
        }
      }

      if (!element.type) {
        alert('Не найден соответсвующий элемент')
        return
      }
      
      element.id = handleElem.id
      if(!element.id) {
        element.id = generatorId.next().value
      }
     
      window.__API__.sendBindingElement(element)
    },
    { capture: true }
  )
}

function injectCSS(): string {
  return `
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

function injectScript(): string {
  return `(${exec.toString()})()`
}

export { injectScript, injectCSS }

import type { ViewApi } from '../preload/types/types.ts'

declare const window: {
  __API__: ViewApi
} & Window

function exec() {
  console.log('injected script')

  const DEEP_SEARCH = 3
  const HANDLER_TYPES: BindableElementType[] = ['INPUT', 'TEXTAREA', 'BUTTON']

  const checkElementIsBindable = (element: HTMLElement): boolean => {
    return HANDLER_TYPES.indexOf(element.nodeName as BindableElementType) != -1
  }

  const options: ViewOptions = {
    selectionMode: false
  }

  function setupPage() {
    const elements = document.querySelectorAll('button, input, textarea')
    let i = 0

    for (const elem of elements) {
      if (elem.id == '') {
        elem.id = `_uniq_id_${i++}`
      }
    }
  }
  setupPage()

  window.__API__.onActivate((index) => {
    const elem = document.querySelector<HTMLElement>(index.id)
    console.log('active:', index, elem)
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
      const index: BindingElement = { id: '' }

      for (let i = 0; i < DEEP_SEARCH; i++) {
        if (checkElementIsBindable(handleElem)) {
          index.type = handleElem.nodeName as BindableElementType
          break
        }

        if (handleElem.parentElement != null) {
          handleElem = handleElem.parentElement
        }
      }

      if (!index.type) {
        alert('Не найден соответсвующий элемент')
        return
      }

      index.id = handleElem.id
      window.__API__.sendIndexOnButton(index)
    },
    { capture: true }
  )
}

function injectCSS(): string {
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

function injectScript(): string {
  return `(${exec.toString()})()`
}

export { injectScript, injectCSS }

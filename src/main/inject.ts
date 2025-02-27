import type {
  ViewApi,
  ViewOptions,
  BindingElement,
  BindableElementType
} from '../types/types'

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

  function* generateElementId(): Generator<string, string, void> {
    let id = 0
    while (true) {
      yield `_uniq_id_${id++}`
    }
  }
  const generatorId = generateElementId()

  function setupPage() {
    const elements = document.querySelectorAll('textarea, input, button')

    for (const elem of elements) {
      if (elem.id == '') {
        elem.id = generatorId.next().value
      }
    }
  }
  setupPage()

  window.__API__.onActivate(({ element, clipboard = '' }) => {
    if (!element?.type) {
      return
    }
    console.log('activate')
    const elem = document.querySelector<HTMLElement>(`#${element.id}`)
    if (elem) {
      if (['INPUT', 'TEXTAREA'].indexOf(element.type) == -1) {
        elem.click()
        console.log('click')
      } else {
        console.log('paste clipboard')
        ;(elem as HTMLInputElement).value = clipboard
      }
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
        if (checkElementIsBindable(handleElem)) {
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
      if (!element.id) {
        element.id = generatorId.next().value
        handleElem.id = element.id
        // TODO: mark unreliable index
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

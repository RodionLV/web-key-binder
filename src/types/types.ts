/* eslint-disable @typescript-eslint/no-unused-vars */
type BindableElementType = 'BUTTON' | 'INPUT' | 'TEXTAREA'

type Shortcut = string[]

interface ElementBindType {
  _id?: string
  url?: string
  element?: BindingElement
  shortcut: Shortcut
}

interface BindingElement {
  id: string
  type?: BindableElementType
}

interface ViewOptions {
  selectionMode: boolean
}

interface ViewApi {
  sendBindingElement: (elem: BindingElement) => void
  onActivate: (cb: (elem: BindingElement) => void) => void
  onChangeOptions: (cb: (options: ViewOptions) => void) => void
}

interface MainApi {
  setViewUrl: (url: string) => void
  setShortcut: (bind: ElementBindType) => void
  setOptions: (options: ViewOptions) => void
  onSelectedElement: (cb: (elem: BindingElement) => void) => void
  getAllBindByUrl: (_url) => Promise<ElementBindType[]>
}

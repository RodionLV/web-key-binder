export type BindableElementType = 'BUTTON' | 'INPUT' | 'TEXTAREA'

export type Shortcut = string[]

export interface ElementBindType {
  _id?: string
  url?: string
  element?: BindingElement
  shortcut: Shortcut
}

export interface BindingElement {
  id: string
  type?: BindableElementType
}

export interface ViewOptions {
  selectionMode: boolean
}

export interface ViewApi {
  sendBindingElement: (elem: BindingElement) => void
  onActivate: (cb: (elem: BindingElement) => void) => void
  onChangeOptions: (cb: (options: ViewOptions) => void) => void
}

export interface MainApi {
  setViewUrl: (url: string) => void
  setShortcut: (url: string, element: BindingElement, shorcut: Shortcut) => void
  setOptions: (options: ViewOptions) => void
  onSelectedElement: (cb: (elem: BindingElement) => void) => void
  getAllBindByUrl: (url: string) => Promise<ElementBindType[]>
  deleteById: (id: string) => Promise<number>
}

export interface ViewWindow extends Window {
  __API__: ViewApi
}

export interface MainWindow extends Window {
  __API__: MainApi
}

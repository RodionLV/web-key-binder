/* eslint-disable @typescript-eslint/no-unused-vars */
type BindableElementType = 'BUTTON' | 'INPUT' | 'TEXTAREA'

type Shortcut = string[]

interface BindingElement {
  id: string
  type?: BindableElementType
}

interface ViewOptions {
  selectionMode: boolean
}

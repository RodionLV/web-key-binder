interface ViewApi {
  sendIndexOnButton: (elem: BindingElement) => void
  onActivate: (cb: (elem: BindingElement) => void) => void
  onChangeOptions: (cb: (options: ViewOptions) => void) => void
}

interface MainApi {
  setViewUrl: (url: string) => void
  setShortcut: (keys: Shortcut) => void
  setOptions: (options: ViewOptions) => void
  onSelectedElement: (cb: (elem: BindingElement) => void) => void
}

export type { ViewApi, MainApi }

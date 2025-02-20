import Datastore from 'nedb-promises'

import { ajv, Ajv } from './validation'
import type { BindingElement, Shortcut } from '../../types/types'

interface ElementBindType {
  _id?: string
  url: string
  element: BindingElement
  shortcut: Shortcut
}

class ElementBindStore {
  private validator: Ajv.ValidateFunction
  private store: Datastore<ElementBindType>

  constructor() {
    this.validator = ajv.getSchema(
      'element_bind_schema'
    ) as Ajv.ValidateFunction

    this.store = Datastore.create({
      filename: `${process.cwd()}/db/element_bind.db`
    })
  }

  validate(data) {
    return this.validator(data)
  }

  getAll(): ElementBindType[] {
    return []
  }

  getById(id: string): ElementBindType | null {
    return null
  }

  getAllByUrl(url: string): ElementBindType[] {
    return []
  }

  create(data: ElementBindType) {
    if (!this.validate(data)) {
      console.log('Error: invalid data')
      return // check promisses
    }

    return this.store.insert(data)
  }

  deleteById(id: string) {}

  deleteAllByUrl(url: string) {}
}

export const elementBindStore = new ElementBindStore()

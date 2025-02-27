import Datastore from 'nedb-promises'

import { ajv, Ajv } from './validation'

import { ElementBindType } from '../../types/types'

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

  getAll(): Promise<ElementBindType[]> {
    return this.store.find({}).exec()
  }

  getById(id: string): Promise<ElementBindType | null> {
    return this.store.findOne({ _id: id }).exec()
  }

  getByUrlAndElementId(
    url: string,
    elementId: string
  ): Promise<ElementBindType | null> {
    return this.store.findOne({ url: url, 'element.id': elementId }).exec()
  }

  getAllByUrl(url: string): Promise<ElementBindType[]> {
    return this.store.find({ url }).exec()
  }

  create(data: ElementBindType): Promise<ElementBindType | null> {
    if (!this.validate(data)) {
      console.log('Error: invalid data', data)
      return new Promise((resolve) => resolve(null))
    }

    return this.store.insert(data)
  }

  deleteById(id: string): Promise<number> {
    return this.store.removeOne({ _id: id }, { multi: false })
  }

  deleteAllByUrl(url: string): Promise<number> {
    return this.store.remove({ url }, { multi: true })
  }
}

const elementBindStore = new ElementBindStore()

export { elementBindStore, ElementBindStore }

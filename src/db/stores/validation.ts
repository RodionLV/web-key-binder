import Ajv from 'ajv'

import elementBindSchema from '../schemas/element_bind_schema.json'

const ajv = new Ajv()

ajv.addSchema(elementBindSchema, 'element_bind_schema')

export { ajv, Ajv }

import knexFactory from 'knex'
import bookshelfFactory from 'bookshelf'

import config from './config'

import {
  migrations,
} from './models'

const knex = knexFactory(config)
const bookshelf = bookshelfFactory(knex)

export const Migrations = bookshelf.Model.extend(migrations)

export default knex

import 'dotenv/config'
import debug from 'debug'
import { performance } from 'perf_hooks'

import Koa from 'koa'
import { Migrations } from './database'

const d = debug('tempos:boot')

const app = new Koa()

Migrations
  .forge()
  .orderBy('id', 'DESC')
  .fetch({ required: true })
  .then(m => d('latest migation: %s', m.get('name')))
  .catch(() => d('no migrations'))

app.use(async (ctx, next) => {
  const start = performance.now()
  await next()
  const ms = performance.now() - start
  ctx.set('X-Response-Time', `${ms.toFixed(2)}ms`)
})

const port = process.env.PORT || 3000
app.listen(port, () => d('listen on %d', port))

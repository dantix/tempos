const mustBeSet = v => `${v} env variable must be set`

const connectionVars = {
  host: 'POSTGRES_HOST',
  port: 'POSTGRES_PORT',
  user: 'POSTGRES_USER',
  password: 'POSTGRES_PASSWORD',
  database: 'POSTGRES_DATABASE',
}

Object
  .values(connectionVars)
  .map(cv => console.assert(process.env[cv], mustBeSet(cv)))

const connection = Object
  .entries(connectionVars)
  .reduce((result, [key, value]) => {
    result[key] = process.env[value]
    return result
  }, {})

const environment = process.env.NODE_ENV || 'development'

module.exports = {
  client: 'pg',
  connection,
  migrations: {
    directory: './src/database/migrations',
  },
  seeds: {
    directory: `./src/database/seeds/${environment}`,
  },
}

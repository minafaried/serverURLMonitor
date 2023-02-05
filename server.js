const express = require('express')
const URLAPIs = require('./Router/URLAPIs')
const userAPIs = require('./Router/userAPIs')


const body_parser = require('body-parser')

const app = express()
app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log(`Listening on port ${3000}`))
}
app.use(userAPIs);
app.use(URLAPIs)

app.use((req, res) => {
  res.status(404).send({ message: 'not found' })
})
module.exports = app

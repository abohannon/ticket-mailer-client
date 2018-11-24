import path from 'path'
import express from 'express'
import helmet from 'helmet'

const app = express()

app.use(helmet())
app.use(express.static(path.join(__dirname, 'build')))
app.set('port', process.env.PORT || 8080)

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port)
})

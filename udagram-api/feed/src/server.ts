import cors from 'cors'
import express from 'express'
import { sequelize } from './sequelize'

import { FeedRouter } from './controllers/v0/feed/routes/feed.router'

import bodyParser from 'body-parser'
import { config } from './config/config'
import { V0_FEED_MODELS } from './controllers/v0/model.index'
;(async () => {
  await sequelize.addModels(V0_FEED_MODELS)
  await sequelize.sync()

  const app = express()
  const port = process.env.PORT || 8080

  app.use(bodyParser.json())

  app.use(
    // @ts-ignore
    cors({
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization',
      ],
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: false,
    })
  )

  app.use('/', FeedRouter)

  // Start the Server
  app.listen(port, () => {
    console.log(`server running ${config.url}`)
    console.log(`press CTRL+C to stop server`)
  })
})()

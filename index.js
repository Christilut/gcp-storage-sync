require('dotenv').config()

const fs = require('fs')
const FirebaseAdmin = require('firebase-admin')
const express = require('express')
const app = express()

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert({
    clientEmail: process.env.GCP_CLIENT_EMAIL,
    privateKey: process.env.GCP_CLIENT_KEY,
    projectId: process.env.PROJECT_ID
  }),
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`
})

async function firebaseSave(filepath, data) {
  await FirebaseAdmin.storage()
    .bucket()
    .file(filepath)
    .save(data)
}

app.get('/', (req, res) => {
  fs.readFile('./empty.xml', async (err, data) => {
    const xml = data.toString()

    await firebaseSave('test/testfile', xml)
  })
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})

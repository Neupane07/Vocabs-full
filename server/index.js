import express from 'express'
import cors from 'cors'
import expressGraphql from 'express-graphql'
import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { Vocab } from './models/vocab.js'
import axios from 'axios'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express()
dotenv.config()


const url = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@bimalneupane.c5mls.mongodb.net/${process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database: ${err}`);
    })

const PORT = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/allwords', async (req, res) => {
    try {
        const allWords = await Vocab.find({})
        res.json(allWords)
    } catch (error) {
        res.json(error)
    }
})


app.post('/verifyword', async (req, res) => {

    let { word } = req.body


    try {
        let lemmaData = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/lemmas/en-us/${word}?fields=definitions,examples,etymologies`, {
            headers: {
                app_id: process.env.OXFORD_APP_ID,
                app_key: process.env.OXFORD_APP_KEY,
            },
        })

        lemmaData.data.results[0].lexicalEntries.map(items => {
            if (word !== items.inflectionOf[0].id) {
                word = items.inflectionOf[0].id
            }
        })

        const { data } = await axios.get(
            `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word}?fields=definitions,examples,etymologies`,
            {
                headers: {
                    app_id: process.env.OXFORD_APP_ID,
                    app_key: process.env.OXFORD_APP_KEY,
                },
            }
        );
        console.log(word)
        console.log('Check here', typeof data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.subsenses)
        const newWord = new Vocab({
            key: data.id,
            category: data.results[0]?.lexicalEntries[0]?.lexicalCategory.id,
            etymology: typeof data.results[0]?.lexicalEntries[0]?.entries[0]?.etymologies === 'undefined' ? console.log('undefined field') : data.results[0]?.lexicalEntries[0]?.entries[0]?.etymologies[0],
            definition: data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.definitions[0],
            example: typeof data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.examples === 'undefined' ? console.log('undefined field') : data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.examples[0]?.text,
            shortDef: typeof data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.subsenses === 'undefined' ? console.log('undefined field') : data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.subsenses[0]?.definitions[0],
            subExample: typeof data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.subsenses === 'undefined' ? console.log('undefined field') : data.results[0]?.lexicalEntries[0]?.entries[0]?.senses[0]?.subsenses[0]?.examples[0]?.text,
        })

        const savedWord = await newWord.save()
        console.log(savedWord)
        res.json(newWord)

    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`)
})
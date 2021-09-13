import mongoose from 'mongoose'
const Schema = mongoose.Schema

const vocabSchema = Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    category: {
        type: String,
        required: true,
        default: ''
    },
    etymology: {
        type: String,
        default: ''
    },
    definition: {
        type: String,
        default: ''
    },
    example: {
        type: String,
        default: ''
    },
    shortDef: {
        type: String,
        default: ''
    },
    subExample: {
        type: String,
        default: ''
    }
},
    { timestamps: true },
)

const Vocab = mongoose.model("Vocab", vocabSchema)
export { Vocab }




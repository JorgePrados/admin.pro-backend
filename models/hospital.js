const { Schema, model } = require('mongoose')


const hospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

hospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    object.id = _id

    return object;
}, { collection: 'hospitales' });

module.exports = model('Hospital', hospitalSchema);
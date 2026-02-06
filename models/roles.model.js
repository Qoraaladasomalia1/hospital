const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Role', RoleSchema);

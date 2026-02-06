const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    route: { type: String, required: true },
    icon: { type: String, required: true },
    parent_id: {
        type: Number,
        default: null,
        ref: 'Menu',
        validate: {
            validator: async function (v) {
                if (v === null) return true;
                const Menu = mongoose.model('Menu');
                const menu = await Menu.findOne({ id: v });
                return !!menu;
            },
            message: props => `Menu with id ${props.value} does not exist`
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for parent menu
MenuSchema.virtual('parent', {
    ref: 'Menu',
    localField: 'parent_id',
    foreignField: 'id',
    justOne: true
});

// Virtual for child menus (submenus)
MenuSchema.virtual('children', {
    ref: 'Menu',
    localField: 'id',
    foreignField: 'parent_id'
});

module.exports = mongoose.model('Menu', MenuSchema);

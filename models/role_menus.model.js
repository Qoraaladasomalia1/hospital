const mongoose = require('mongoose');

const RoleMenuSchema = new mongoose.Schema({
    role_id: {
        type: Number,
        required: true,
        ref: 'Role',
        validate: {
            validator: async function (v) {
                const Role = mongoose.model('Role');
                const role = await Role.findOne({ id: v });
                return !!role;
            },
            message: props => `Role with id ${props.value} does not exist`
        }
    },
    menu_id: {
        type: Number,
        required: true,
        ref: 'Menu',
        validate: {
            validator: async function (v) {
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

// Composite unique index
RoleMenuSchema.index({ role_id: 1, menu_id: 1 }, { unique: true });

// Virtuals
RoleMenuSchema.virtual('role', {
    ref: 'Role',
    localField: 'role_id',
    foreignField: 'id',
    justOne: true
});

RoleMenuSchema.virtual('menu', {
    ref: 'Menu',
    localField: 'menu_id',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('RoleMenu', RoleMenuSchema);

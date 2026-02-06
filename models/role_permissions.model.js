const mongoose = require('mongoose');

const RolePermissionSchema = new mongoose.Schema({
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
    permission_id: {
        type: Number,
        required: true,
        ref: 'Permission',
        validate: {
            validator: async function (v) {
                const Permission = mongoose.model('Permission');
                const permission = await Permission.findOne({ id: v });
                return !!permission;
            },
            message: props => `Permission with id ${props.value} does not exist`
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Composite unique index
RolePermissionSchema.index({ role_id: 1, permission_id: 1 }, { unique: true });

// Virtuals
RolePermissionSchema.virtual('role', {
    ref: 'Role',
    localField: 'role_id',
    foreignField: 'id',
    justOne: true
});

RolePermissionSchema.virtual('permission', {
    ref: 'Permission',
    localField: 'permission_id',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('RolePermission', RolePermissionSchema);

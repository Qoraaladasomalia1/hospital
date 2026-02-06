const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const roleRoutes = require('./routes/roles.routes');
const userRoutes = require('./routes/users.routes');
const menuRoutes = require('./routes/menus.routes');
const permissionRoutes = require('./routes/permissions.routes');
const rolePermissionRoutes = require('./routes/role_permissions.routes');
const roleMenuRoutes = require('./routes/role_menus.routes');
const departmentRoutes = require('./routes/departments.routes');
const doctorRoutes = require('./routes/doctors.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const doctorAvailabilityRoutes = require('./routes/doctor_availability.routes');
const patientRoutes = require('./routes/patients.routes');
const appointmentRoutes = require('./routes/appointments.routes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/role-permissions', rolePermissionRoutes);
app.use('/api/role-menus', roleMenuRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/doctor-availability', doctorAvailabilityRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

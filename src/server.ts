import app from './app';
import { sequelize } from './models';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try { 
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log('server is running on http://localhost:${PORT}');
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
    }
};

startServer
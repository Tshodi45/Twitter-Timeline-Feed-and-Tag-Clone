//set up the application to use the routes

import express from 'express';
import bodyParser from 'body-parser';
import timelineRoutes from './routes/timeline';
import feedRoutes from './routes/feed';

const app = express();

app.use(bodyParser.json());
app.use('/api', timelineRoutes);
app.use('/api', feedRoutes);

export default app;
import express from 'express';
import check from '../controllers/health.controller.js';

const healthRoutes = express.Router();

healthRoutes.get('/', check);

export default healthRoutes;
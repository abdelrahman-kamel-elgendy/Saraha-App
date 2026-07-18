import express from 'express';
import messagesController from '../controllers/messages.controller';
import { requireAuth } from '../middleware/auth.middleware';

export const messagesRouter = express.Router();

messagesRouter.get('/user/:username', messagesController.getPublicProfile);
messagesRouter.post('/send/:username', messagesController.sendMessage);

messagesRouter.get('/inbox', requireAuth, messagesController.getInbox);
messagesRouter.delete('/inbox/:id', requireAuth, messagesController.deleteMessage);
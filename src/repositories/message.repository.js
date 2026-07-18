import { getClient } from '../config/db.js';

export const createMessage = async (message) => await getClient().db().collection('messages').insertOne(message);


export const getMessages = async () => await getClient().db().collection('messages').find().toArray();


export const getMessageById = async (id) => await getClient().db().collection('messages').findOne({ _id: id });

export const deleteMessage = async (id) => await getClient().db().collection('messages').deleteOne({ _id: id });


export const getMessagesByUserId = async (userId) => await getClient().db().collection('messages').find({ userId }).toArray();

export const deleteMessagesByUserId = async (userId) => await getClient().db().collection('messages').deleteMany({ userId });
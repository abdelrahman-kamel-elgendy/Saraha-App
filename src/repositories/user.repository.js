import mongoose from "mongoose";
import userModel from '../models/user.model.js'

export const getAll = async () => await userModel.find();

export const createUser = async (user) => await getClient().db().collection("users").insertOne(user);

export const getUserById = async (id) => await getClient().db().collection("users").findOne({ _id: id });

export const getUserByEmail = async (email) => await getClient().db().collection("users").findOne({ email });

export const getUserByUsername = async (email) => await getClient().db().collection("users").findOne({ username });



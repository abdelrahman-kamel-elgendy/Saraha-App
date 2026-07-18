import { getUsers } from '../services/user.service.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAllUsers = async (req, res) => {
    return ApiResponse.success(res, {
        message: 'Users retrieved successfully',
        data: getUsers()
    });
}
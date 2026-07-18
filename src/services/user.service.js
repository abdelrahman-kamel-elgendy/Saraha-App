import { getAll } from '../repositories/user.repository.js';
import { userDto } from '../dto/user/usre.dto.js';


export const getUsers = async () => (await getAll()).map(user => new UserDto(user));

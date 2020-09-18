import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  avatar: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatar }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('somente usuarios autenticados podem alterar o avatar');
    }

    if (user.avatar) {
      const userActualAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userActualAvatarFileExists = await fs.promises.stat(userActualAvatarFilePath);

      if (userActualAvatarFileExists) {
        await fs.promises.unlink(userActualAvatarFilePath);
      }
    }

    user.avatar = avatar;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;

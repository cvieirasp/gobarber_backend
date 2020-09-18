import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email }
    });

    if (checkUserExists) {
      throw new AppError('endereco de e-mail ja esta sendo utilizado');
    }

    const encryptedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;

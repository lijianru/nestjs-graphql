import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { NewUserInput } from './new-user.model';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private users: User[]

  constructor() {
    this.users = []
  }

  async findOneById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id)

    return user
  }

  async createUser(user: NewUserInput): Promise<User> {
    const newUser: User = {
      ...user,
      createDate: new Date(),
      id: randomUUID()
    }
    this.users.push(newUser)

    return newUser
  }
}

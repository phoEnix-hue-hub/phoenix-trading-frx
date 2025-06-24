import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  balance: number;
}

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: { name: string; phone: string; email: string; password: string }) {
    const hashedPassword = await hash(user.password, 10);
    const newUser = new this.userModel({ ...user, password: hashedPassword, balance: 0 });
    return newUser.save();
  }

  async validateUser(identifier: string, password: string) {
    const user = await this.userModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (user && await compare(password, user.password)) {
      return { name: user.name, email: user.email, phone: user.phone, balance: user.balance };
    }
    return null;
  }

  async findByUsername(identifier: string) {
    return this.userModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(data: {
    email: string;
    password: string;
    name?: string;
    profession?: string;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = new this.userModel({ ...data, password: hashed });
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}

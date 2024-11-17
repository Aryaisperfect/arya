import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoClient } from 'mongodb';



@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {

    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    try {
      const database = client.db('arya-db');
      const usersColection = database.collection('users');
      const users = await usersColection.find({}).toArray();
      return users;
    } finally {
      await client.close();

    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

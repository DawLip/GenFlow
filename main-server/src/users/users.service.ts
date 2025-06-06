import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { RegisterInput, GetUserInput } from "./dto/user.input";
import { UserWithToken } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

export type U = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async create(input: RegisterInput): Promise<User> {
    const createdUser = new this.userModel(input);
    return await createdUser.save();
  }
  async register(input: RegisterInput):Promise<UserWithToken|null> {
    const user = await this.create(input);
    const access_token = await this.jwtService.sign({_id: user._id})
    return { status: "SUCCESS", access_token, user };
  }
  
  async findOne({_id, email}:GetUserInput): Promise<U | undefined | null> {
    if(_id)   return this.findOneById(_id);
    if(email) return this.findOneByEmail(email);
    return null;
  }
  async findOneById(_id: string): Promise<U | undefined> {
    console.log(_id)
    return await this.userModel.findOne({_id: _id}).exec();
  }
  async findOneByEmail(email: string): Promise<U | undefined> {
    return await this.userModel.findOne({email: email}).exec();
  }
  async findById(users:string[]): Promise<U | undefined> {
    return await this.userModel.find({_id:{"$in": users}}).exec();
  }
}

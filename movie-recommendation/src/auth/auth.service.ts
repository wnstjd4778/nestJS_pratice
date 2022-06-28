import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from '../schema/auth.schema';
import { Model } from 'mongoose';
import { LogInDto } from './dto/log-in.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  async checkEmailAndPassword(dto: LogInDto): Promise<AuthDocument> {
    const auth = await this.authModel.findOne({ email: dto.email }).exec();
    if (!auth) {
      throw new NotFoundException('아이디 또는 비밀번호가 다릅니다.');
    }
    if (await this.checkHashPassword(dto.password, auth.password)) {
      return auth;
    } else {
      throw new BadRequestException('아이디 또는 비밀번호가 다릅니다.');
    }
  }

  async register(dto: RegisterDto): Promise<AuthDocument> {
    if (
      (await this.checkDuplicateEmail(dto.email)) ||
      (await this.checkDuplicateName(dto.name))
    ) {
      throw new BadRequestException('이메일 또는 이름이 중복됩니다.');
    } else {
      dto.password = await this.getHashedPassword(dto.password);
      return await this.authModel.create(dto);
    }
  }

  async getHashedPassword(plainText: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(plainText, saltOrRounds);
  }

  async checkHashPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async checkDuplicateEmail(email: string): Promise<boolean> {
    const auth: AuthDocument = await this.authModel.findOne({ email: email });
    if (auth) {
      return true;
    } else {
      return false;
    }
  }

  async checkDuplicateName(name: string): Promise<boolean> {
    const auth: AuthDocument = await this.authModel.findOne({ name: name });
    if (auth) {
      return true;
    } else {
      return false;
    }
  }
}

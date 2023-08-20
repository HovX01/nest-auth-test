import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role, UserDto } from './dto/user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

export interface jwtPayload {
  access_token: string;
  user: object;
}

enum PostgresErrorCode {
  UniqueViolation = '23505',
  CheckViolation = '23514',
  NotNullViolation = '23502',
  ForeignKeyViolation = '23503',
}
@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDto) {
    const hast = await argon2.hash(userDto.password);
    userDto.role = [Role.Student];
    const user = plainToClass(User, {
      ...userDto,
      password: hast,
    });
    // const user = this.userRepository.create({
    //   ...userDto,
    //   password: hast,
    // });
    await this.userRepository.save(user);
    user.password = undefined;
    return user;
    // try {
    //   userDto.role = [Role.Student];
    //   const user = plainToClass(User, {
    //     ...userDto,
    //     password: hast,
    //   });
    //   // const user = this.userRepository.create({
    //   //   ...userDto,
    //   //   password: hast,
    //   // });
    //   await this.userRepository.save(user);
    //   user.password = undefined;
    //   return user;
    // } catch (e) {
    //   if (e?.code === PostgresErrorCode.UniqueViolation) {
    //     throw new HttpException('User with that emails already exists', 200);
    //   }
    //   throw new BadRequestException(e.message);
    // }
  }
  async login(userDto: UserDto): Promise<jwtPayload> {
    const { email, password } = userDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await argon2.verify(user.password, password))) {
      user.password = undefined;
      const { id, ...rest } = user;
      const payload = {
        sub: id,
        ...rest,
      };
      const token = await this.jwtService.signAsync(payload);
      return {
        access_token: token,
        user: user,
      };
    }
    throw new NotFoundException('User not found');
  }
  async getUser(id: number, rela: boolean) {
    // const user = await this.userRepository.find({
    //   relations: {
    //     profile: rela,
    //   },
    //   where: {
    //     id: id,
    //   },
    // });
    // if (user) {
    //   user[0].password = undefined;
    //   return user;
    // }
    throw new NotFoundException('User Not Found');
  }
}

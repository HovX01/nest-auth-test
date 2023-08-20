import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Role, UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { JwtGuard } from './guard/jwt.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from '../../common/decorator/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() userDto: UserDto) {
    return await this.authService.register(userDto);
  }
  @Post('login')
  async login(@Body() userDto: UserDto) {
    return await this.authService.login(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  @Roles(Role.Student)
  async me(@Req() req: Request, @Query() query) {
    const id = req.user['sub'];
    return req.user;
  }
}

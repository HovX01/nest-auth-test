import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { Request } from 'express';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('update')
  @UseGuards(JwtGuard)
  async update(@Req() req: Request, @Body() profileDto: ProfileDto) {
    const id: number = req.user['sub'];
    return this.profileService.update(id, profileDto);
  }
}

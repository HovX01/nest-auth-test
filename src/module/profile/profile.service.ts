import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async update(id: number, profileDto: ProfileDto) {
    // const user = await this.userRepository.findOne({
    //   relations: {
    //     profile: true,
    //   },
    //   where: {
    //     id: id,
    //   },
    // });
    // if (user.profile) {
    //   const { id } = user.profile;
    //   const profile = await this.profileRepository.findOneBy({ id });
    //   profile.bio = profileDto.bio;
    //   profile.phone = profileDto.phone;
    //   return await this.profileRepository.save(profile);
    // } else if (!user.profile) {
    //   const profile = new Profile();
    //   profile.bio = profileDto.bio || '';
    //   profile.phone = profileDto.phone || '';
    //   profile.user = user;
    //   return await this.profileRepository.save(profile);
    // }
    // throw new UnauthorizedException();
  }
}

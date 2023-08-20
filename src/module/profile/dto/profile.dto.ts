import { IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  phone: string;
  @IsString()
  bio: string;
}

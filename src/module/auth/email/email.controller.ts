import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('auth/emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post()
  async test(@Body('email') email: string) {
    await this.emailService.sendMail(email);
  }
}

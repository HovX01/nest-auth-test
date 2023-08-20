import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailModule } from '../../mail/mail.module';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  imports: [MailModule],
})
export class EmailModule {}

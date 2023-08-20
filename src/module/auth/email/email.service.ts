import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailService) {}
  async sendMail(email: string) {
    try {
      await this.mailService.sendMail({
        from: 'noreply@seksa.today.com',
        to: email,
        subject: 'Is You ThyNoob ✔',
        text: 'Is You ThyNoob',
        template: 'index',
        context: {
          title: 'Is You ThyNoob',
          description: 'Is You ThyNoob',
          link: 'thynoob.com',
        },
      });
      Logger.log('[MailService] Forgot Password: Send Mail successfully!');
    } catch (err) {
      Logger.error('[MailService] Forgot Password: Send Mail Failed!', err);
    }
  }
}

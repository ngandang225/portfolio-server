import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailBodyType } from './types/mailBodyType';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-email')
  async sendEmail(@Body() body: MailBodyType) {
    return this.appService.sendEmail(body);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailBodyType } from './types/mailBodyType';

@Injectable()
export class AppService {
  async sendEmail(body: MailBodyType) {
    const { firstName, lastName, email, phoneNumber, message } = body;

    const user = process.env.USER_EMAIL;
    const pass = process.env.EMAIL_APP_PASSWORD;

    if (!user || !pass) {
      throw new Error('Missing email credentials.');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: `New message from ${firstName} ${lastName}`,
      text: `Email: ${email}\n\nPhone number: ${phoneNumber}\n\nMessage:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { message: 'Message sent successfully.', success: true };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Sending error:', error.message);
        throw new InternalServerErrorException('Failed to send the message.');
      }
      console.error('Unknown error:', error);
      throw new InternalServerErrorException('An unexpected error occurred while sending the message.');
    }
  }
}

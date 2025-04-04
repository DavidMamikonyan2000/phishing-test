import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as process from 'node:process';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPhishingEmail(to: string, emailContent: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: 'Security Awareness Test',
        html: emailContent,
      });

      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
      throw new Error('Failed to send email');
    }
  }
}

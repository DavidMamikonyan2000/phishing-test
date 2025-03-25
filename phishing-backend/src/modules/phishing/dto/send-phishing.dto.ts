import { IsEmail } from 'class-validator';

export class SendPhishingDto {
  @IsEmail({}, { message: 'Invalid recipient email format' })
  email: string;
}

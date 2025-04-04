import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SendPhishingDto } from './dto/send-phishing.dto';
import { PhishingDto } from './dto/output.phishing.dto';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() sendPhishingDto: SendPhishingDto) {
    return this.phishingService.sendPhishingEmail(sendPhishingDto.email);
  }

  @Get('click')
  async markClick(@Query('email') email: string) {
    return this.phishingService.markAttemptAsClicked(email);
  }

  @Get('attempts')
  @UseGuards(JwtAuthGuard)
  async getAllAttempts() {
    const data = await this.phishingService.getAllAttempts();
    return data.map((attempt) => new PhishingDto(attempt));
  }
}

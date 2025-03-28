import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../common/schemas/user.schema';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserDto } from './dto/output.user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    const data = await this.usersService.getProfile(user.email);
    return new UserDto(data);
  }
}

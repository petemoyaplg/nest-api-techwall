import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginCredentialDto, UserSubscribeDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/login')
  async login(@Body() credentiels: LoginCredentialDto) {
    return await this.userService.login(credentiels);
  }

  @Post()
  async register(
    @Body() userData: UserSubscribeDto,
  ): Promise<Partial<UserEntity>> {
    return await this.userService.register(userData);
  }
}

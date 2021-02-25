import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto, SignUpDto } from 'dtos';
import { AuthService } from 'services';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    signUpDto.email = signUpDto.email.toLowerCase();

    const { accessToken, refreshToken } = await this.authService.createUser(
      signUpDto,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  @Post('login')
  async logIn(@Body() { email, password }: LogInDto) {
    const { accessToken, refreshToken } = await this.authService.login(
      email.toLowerCase(),
      password,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

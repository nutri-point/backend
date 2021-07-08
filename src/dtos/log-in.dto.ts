import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @IsEmail({}, { message: 'Email is invalid.' })
  email: string;

  @IsNotEmpty()
  password: string;
}

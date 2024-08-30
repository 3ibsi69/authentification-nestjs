import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  @ApiProperty({ example: 'John' })
  firstName?: string;

  @IsString()
  @ApiProperty({ example: 'Doe' })
  lastName?: string;

  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com' })
  email?: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'Password  needs to be at least 6 characters long and contain at least one letter and one number',
  })
  @ApiProperty({ example: 'Test1234' })
  password?: string;
}
export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com' })
  email?: string;

  @IsString()
  @ApiProperty({ example: 'Test1234' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'Password  needs to be at least 6 characters long and contain at least one letter and one number',
  })
  password?: string;
}

export class refreshDto {
  @IsString()
  @ApiProperty({ example: 'refreshToken' })
  refreshToken?: string;
}

export class ChangePasswordDto {
  @IsString()
  @ApiProperty({ example: 'Test1234' })
  password?: string;

  @IsString()
  @ApiProperty({ example: 'Test1234' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'Password  needs to be at least 6 characters long and contain at least one letter and one number',
  })
  newPassword?: string;
}
export class forgotPasswordDto {
  @IsEmail()
  @ApiProperty({ example: 'test@gmail.com' })
  email?: string;
}
export class resetPasswordDto {
  @IsString()
  @ApiProperty({ example: 'EWUDHWUDWDWGDWUYDWDWGDUWYDYWGBDUYGWYUGDWYGDWYUG ' })
  token?: string;

  @IsString()
  @ApiProperty({ example: 'Test1234' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'Password  needs to be at least 6 characters long and contain at least one letter and one number',
  })
  newPassword?: string;
}

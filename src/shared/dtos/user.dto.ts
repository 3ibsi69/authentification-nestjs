import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  Matches,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp',
  })
  avatar?: string;

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

  @IsString()
  @ApiProperty({ example: '08012345678' })
  phoneNumber?: string;

  @IsBoolean()
  @ApiProperty({ example: false })
  isBanned?: boolean;

  @IsBoolean()
  @ApiProperty({ example: false })
  isConnected?: boolean;
}

import { Controller, Post, Body, UseGuards, Req, Put } from '@nestjs/common';

import {
  SignupDto,
  LoginDto,
  refreshDto,
  ChangePasswordDto,
  forgotPasswordDto,
  resetPasswordDto,
} from 'src/shared/dtos/create-auth.dto';
import { AuthenticationGuard } from '../../guards/authentification.guard';
import { AdminAuthService } from '../services/admin.auth.service';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminService: AdminAuthService) {}

  @Post('signup')
  async signup(@Body() createAuthDto: SignupDto) {
    return await this.adminService.signup(createAuthDto);
  }

  @Post('login')
  async login(@Body() createAuthDto: LoginDto) {
    return await this.adminService.login(createAuthDto);
  }
  @Post('refresh')
  async refreshUserTokens(@Body() createAuthDto: refreshDto) {
    return await this.adminService.refreshUserTokens(
      createAuthDto.refreshToken,
    );
  }

  @UseGuards(AuthenticationGuard)
  @Put('change-password')
  async changePassword(
    @Body() createAuthDto: ChangePasswordDto,
    @Req() req: any,
  ) {
    return await this.adminService.changePassword(req.user.id, createAuthDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() createAuthDto: forgotPasswordDto) {
    return await this.adminService.forgotPassword(createAuthDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() createAuthDto: resetPasswordDto) {
    return await this.adminService.resetPassword(createAuthDto);
  }
}

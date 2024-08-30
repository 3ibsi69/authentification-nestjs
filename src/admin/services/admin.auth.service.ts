import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginDto,
  SignupDto,
  ChangePasswordDto,
  forgotPasswordDto,
  resetPasswordDto,
} from 'src/shared/dtos/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { CrudService } from 'src/utils/generic.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { Auth, ResetToken } from 'src/shared/entities/auth.entity';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { Role } from 'src/utils/Type.enum';
@Injectable()
export class AdminAuthService extends CrudService<Admin> {
  constructor(
    @InjectRepository(Admin)
    private AdminRepository: Repository<Admin>,
    @InjectRepository(Auth) private AuthRepository: Repository<Auth>,
    @InjectRepository(ResetToken)
    private ResetTokenRepository: Repository<ResetToken>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {
    super(AdminRepository);
  }
  async signup(createAuthDto: SignupDto) {
    const { email, password, lastName, firstName } = createAuthDto;

    const AdminEmailInUse = await this.AdminRepository.findOne({
      where: { email },
    });

    if (AdminEmailInUse) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = this.AdminRepository.create({
      email,
      password: hashedPassword,
      lastName,
      firstName,
    });

    await this.AdminRepository.save(admin);

    return admin;
  }

  async login(createAuthDto: LoginDto) {
    const { email, password } = createAuthDto;
    const admin = await this.AdminRepository.findOne({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.generateUserToken(admin.id, admin.role);
    return {
      userId: admin.id,
      role: admin.role,
      ...tokens,
    };
  }

  async generateUserToken(id: number, role: Role) {
    const accessToken = this.jwtService.sign({ id, role }, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, id, role);
    return {
      accessToken,
      refreshToken,
    };
  }
  async storeRefreshToken(refreshToken: string, userId: number, role: Role) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    const auth = this.AuthRepository.create({
      token: refreshToken,
      userId,
      role,
      expiryDate,
    });
    await this.AuthRepository.delete({ userId: userId });
    await this.AuthRepository.save(auth);
  }

  async refreshUserTokens(refreshToken: string) {
    const token = await this.AuthRepository.findOne({
      where: {
        token: refreshToken,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    await this.AuthRepository.delete(token.id);
    return this.generateUserToken(token.userId, token.role);
  }

  async changePassword(userId: number, createAuthDto: ChangePasswordDto) {
    const { password, newPassword } = createAuthDto;

    const admin = await this.AdminRepository.findOne({ where: { id: userId } });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.AdminRepository.update(admin.id, { password: hashedPassword });

    return { message: 'Password changed successfully' };
  }
  async forgotPassword(createAuthDto: forgotPasswordDto) {
    const { email } = createAuthDto;

    const admin = await this.AdminRepository.findOne({ where: { email } });

    if (admin) {
      const resetToken = nanoid(64);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      this.ResetTokenRepository.create({
        token: resetToken,
        userId: admin.id,
        expiryDate: expiryDate,
      });

      await this.ResetTokenRepository.save({
        token: resetToken,
        userId: admin.id,
        expiryDate: expiryDate,
      });
      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset',
        template: 'forgot-password',
        context: {
          token: resetToken,
        },
        html: `<a href="http://localhost:3000/reset-password?token=${resetToken}">Reset Password</a>`,
      });
    }
    return {
      message: 'If the email exists, a password reset link will be sent',
    };
  }
  async resetPassword(createAuthDto: resetPasswordDto) {
    const token = await this.ResetTokenRepository.findOne({
      where: {
        token: createAuthDto.token,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });
    if (!token) {
      throw new UnauthorizedException('Invalid Link');
    }
    const admin = await this.AdminRepository.findOne({
      where: { id: token.userId },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid Link');
    }

    const hashedPassword = await bcrypt.hash(createAuthDto.newPassword, 10);

    await this.AdminRepository.update(admin.id, { password: hashedPassword });

    await this.ResetTokenRepository.delete(token.id);

    return { message: 'Password reset successfully' };
  }

  async populate(entity: Admin): Promise<Admin> {
    return entity;
  }
}

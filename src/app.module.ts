import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingMiddleWare } from './middlewares/logger.interceptor';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads', // This makes files accessible under '/uploads'
      serveStaticOptions: {
        index: false,
        cacheControl: true,
        extensions: ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'doc', 'csv', 'webp'],
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.PORT, 10),
      username: process.env.NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'abbassi2002ahmed.4@gmail.com',
          pass: 'nhpx skan porz mqtn',
        },
      },
      defaults: {
        from: '"No Reply" <abbassi2002ahmed.4@gmail.com>',
      },
    }),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleWare).forRoutes('*');
  }
}

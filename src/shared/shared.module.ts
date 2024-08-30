import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MulterModuleOptions } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}${extname(file.originalname)}`;
          console.log('Saving file to:', './uploads', 'as:', filename);
          callback(null, filename);
        },
      }),
    } as MulterModuleOptions),
  ],
  exports: [MulterModule],
})
export class SharedModule {}

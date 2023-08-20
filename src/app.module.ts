import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './module/auth/auth.module';
import { ProfileModule } from './module/profile/profile.module';
import { TwoFactorAuthenticationModule } from './module/two-factor-authentication/two-factor-authentication.module';
import * as Joi from '@hapi/joi';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './module/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeorm],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.required(),
        POSTGRES_PASSWORD: Joi.required(),
        POSTGRES_DB: Joi.required(),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.required(),
        JWT_EXPIRATION_TIME: Joi.required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    TwoFactorAuthenticationModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get('typeorm'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

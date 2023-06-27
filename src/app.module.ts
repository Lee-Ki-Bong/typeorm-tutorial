import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 이 설정으로 프로젝트 전역에서 구성모듈을 다시 가져올 필요가 없음을 의미함.
    DatabaseModule,
  ],
  providers: [],
})
export class AppModule {}

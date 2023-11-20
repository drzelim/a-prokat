import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BpService} from "./bp/bp.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local'
    }),
  ],
  controllers: [AppController],
  providers: [AppService, BpService],
})
export class AppModule {
}

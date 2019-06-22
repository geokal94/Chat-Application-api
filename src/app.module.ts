import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    MessagesModule,
    MongooseModule.forRoot('mongodb://localhost/nest', {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

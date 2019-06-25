import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    MessagesModule,
    MongooseModule.forRoot(
      'mongodb+srv://geokal94:chrispaul3dr1@mycluster-xgalj.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

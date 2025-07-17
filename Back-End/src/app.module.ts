import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperienciaModule } from './experiencia/experiencia.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FechasExperienciaModule } from './fechas-experiencia/fechas-experiencia.module';
import { ReservaModule } from './reserva/reserva.module';
import { AuthModule } from './auth/auth.module';
import { CaracteristicaModule } from './caracteristica/caracteristica.module';
import { ImagenModule } from './imagen/imagen.module';
import { CancelacionModule } from './cancelacion/cancelacion.module';
import { ReprogramacionModule } from './reprogramacion/reprogramacion.module';

@Module({
  imports: [ExperienciaModule, UsuarioModule, ProveedorModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')!),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    FechasExperienciaModule,
    ReservaModule,
    AuthModule,
    CaracteristicaModule,
    ImagenModule,
    CancelacionModule,
    ReprogramacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

## CRIANDO PROJETO

npx @nestjs/cli new loja

PARA VALIDAÇÃO:
npm i class-validator class-transformer

PARA GERAR ID:
Biblioteca: uuid
npm i uuid
npm i @types/uuid -D

## CONFIGURANDO O TYPEORM

npm i @nestjs/typeorm typeorm

criar pasta ./src/config

criar arquivo bancodedados.config.service.ts. Exemplo: postgres.config.service.ts

COLOCAR ISSO DENTRO:

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get('POSTGRES_HOST'),
            port: this.configService.get('POSTGRES_PORT'),
            username: this.configService.get('POSTGRES_USER'),
            password: this.configService.get('POSTGRES_PASSWORD'),
            database: this.configService.get('POSTGRES_DB'),
            entities: [],
            synchronize: true
        }
    }
}

LEMBRAR DE CRIAR ARQUIVO .env com as atribuições e colocar no gitignore

ATUALIZAR APP.MODULE:

import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        UsuarioModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
            inject: [PostgresConfigService]
        })
    ]
})
export class AppModule { }

## REFATORANDO A CONFIGURAÇÃO

npm i @nestjs/config

npm i pg
import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repositoy";
import { EmailUnicoValidator } from "./validator/emailUnico.validator";

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioRepository, EmailUnicoValidator]
})
export class UsuarioModule {}
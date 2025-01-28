/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailUnico } from "../validator/emailUnico.validator";

export class AtualizaUsuarioDTO {

    id: string;
    
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @IsOptional()
    nome: string;

    @IsEmail(undefined, { message: 'E-mail informado é inválido' })
    @EmailUnico({ message: 'E-mail já cadastrado' })
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    @IsOptional()
    senha: string;
}
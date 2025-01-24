/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailUnico } from "../validator/emailUnico.validator";

export class CriaUsuarioDTO {

    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsEmail(undefined, { message: 'E-mail informado é inválido' })
    @EmailUnico({ message: 'E-mail já cadastrado' })
    email: string;

    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    senha: string;
}
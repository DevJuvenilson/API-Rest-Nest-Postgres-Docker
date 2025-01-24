/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repositoy";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async validate(email: string): Promise<boolean> {
        const usuario = await this.usuarioRepository.buscarPorEmail(email);
        return !usuario;
    }

}

export const EmailUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailUnicoValidator
        });
    }
}
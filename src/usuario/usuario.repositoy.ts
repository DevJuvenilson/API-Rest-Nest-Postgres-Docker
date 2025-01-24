import { Injectable } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";

/* eslint-disable @typescript-eslint/require-await */
@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar (usuario: UsuarioEntity): Promise<UsuarioEntity[] | void> {
        this.usuarios.push(usuario)
    }

    async listar(): Promise<CriaUsuarioDTO[] | void> {
        return this.usuarios;
    }

    async buscarPorEmail(email: string): Promise<CriaUsuarioDTO | void> {
        const possivelUsuario = this.usuarios.find(usuario => usuario.email === email);

        if (possivelUsuario !== undefined) {
            return possivelUsuario;
        } else {
            return undefined;
        }
    }
}
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

    async listar(): Promise<CriaUsuarioDTO[]> {
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

    private buscarPorId(id: string): UsuarioEntity | void {
        const usuario = this.usuarios.find(usuario => usuario.id === id);

        if (!usuario) {
            throw new Error('Usuário não existe')
        }

        return usuario;
    };

    async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>): Promise<CriaUsuarioDTO | void> {
        const usuario = this.buscarPorId(id);

        Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {

            if(chave === 'id') {
                return;
            }

            usuario[chave] = valor;
        });

        return usuario;
    }

    async remove(id: string) {
        const usuario = this.buscarPorId(id);

        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);

        return usuario;
    }
}
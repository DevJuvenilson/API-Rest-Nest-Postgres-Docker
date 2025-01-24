import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repositoy';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {

        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.nome = dadosUsuario.nome;
        usuarioEntity.email = dadosUsuario.email;
        usuarioEntity.senha = dadosUsuario.senha;
        usuarioEntity.id = uuid();

        await this.usuarioRepository.salvar(usuarioEntity);
        return { id: usuarioEntity.id, mensagem: 'Usuário criado com sucesso!' };
    }

    @Get()
    async listUsuarios() {
        return await this.usuarioRepository.listar()
    }
}

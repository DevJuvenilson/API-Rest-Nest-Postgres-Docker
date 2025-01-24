import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repositoy';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
        await this.usuarioRepository.salvar(dadosUsuario);
        return dadosUsuario;
    }

    @Get()
    async listUsuarios() {
        return await this.usuarioRepository.listar()
    }
}

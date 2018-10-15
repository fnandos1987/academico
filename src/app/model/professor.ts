export class Professor {

    id: number;
    nome: string;
    data_nascto: Date;
    foto: string;
    curriculo: string;
    status: number;

    constructor(id, nome, nascimento, foto, curriculo, stat) {
        this.id = id;
        this.nome = nome;
        this.data_nascto = nascimento;
        this.foto = foto;
        this.curriculo = curriculo;
        this.status = stat;
    }
}
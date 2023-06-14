export class Collection {
    private _id_utilizador: string;
    private _lista_ler: Array<any>;
    private _lista_ja_leu: Array<any>;
    private _lista_a_ler: Array<any>;

    constructor(id_utilizador: string) {
        this._id_utilizador = id_utilizador;
        this._lista_ler = [];
        this._lista_ja_leu = [];
        this._lista_a_ler = [];
    }

    get id_utilizador(): string {
        return this._id_utilizador;
    }

    get lista_ler(): Array<any> {
        return this._lista_ler;
    }

    get lista_ja_leu(): Array<any> {
        return this._lista_ja_leu;
    }

    get lista_a_ler(): Array<any> {
        return this._lista_a_ler;
    }

    set lista_ler(lista_ler: Array<any>) {

        this._lista_ler = lista_ler.filter((str) => str !== '');
    }

    set lista_ja_leu(lista_ja_leu: Array<any>) {
        this._lista_ja_leu = lista_ja_leu.filter((str) => str !== '');
    }

    set lista_a_ler(lista_a_ler: Array<any>) {
        this._lista_a_ler = lista_a_ler.filter((str) => str !== '');
    }

    adicionar_lista_ler(livro_colecao: string): void {
        if (!this._lista_ler.includes(livro_colecao) && livro_colecao && livro_colecao.length != 0) {
            this._lista_ler.push(livro_colecao);
        }
    }

    adicionar_lista_ja_leu(livro_colecao: string): void {
        if (!this._lista_ja_leu.includes(livro_colecao) && livro_colecao && livro_colecao.length != 0) {
            this._lista_ja_leu.push(livro_colecao);
        }
    }

    adicionar_lista_a_ler(livro_colecao: string): void {
        if (!this._lista_a_ler.includes(livro_colecao) && livro_colecao.length != 0) {
            this._lista_a_ler.push(livro_colecao);
        }
    }

}
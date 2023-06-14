
export class Book {
    private _id_book: string;
    private _title: string | null;
    private _autor: string | null;
    private _genre: string | null;
    private _classif: number | null;
    private _num_pag: number | null;
    private _desc: string | null;
    private _ref_foto: string | null;
  
    constructor(id_book: string, title: string | null = null, autor: string | null = null, genre: string | null = null,
         classif: number | null = null, num_pag: number | null = null, desc: string | null = null, ref_foto: string | null = null) {
      this._id_book = id_book;
      this._title = title;
      this._autor = autor;
      this._genre = genre;
      this._classif = classif;
      this._num_pag = num_pag;
      this._desc = desc;
      this._ref_foto = ref_foto;
    }

  
  
    get id_book(): string {
      return this._id_book;
    }
  
    get title(): string | null {
      return this._title;
    }
  
    get autor(): string | null {
      return this._autor;
    }
  
    get genre(): string | null {
      return this._genre;
    }
  
    get classif(): number | null {
      return this._classif;
    }
  
    get num_pag(): number | null {
      return this._num_pag;
    }
  
    get desc(): string | null {
      return this._desc;
    }
  
    get ref_foto(): string | null {
      return this._ref_foto;
    }

    setId_book(value: string) {
      this._id_book = value;
    }
    
    setTitle(value: string | null) {
      this._title = value;
    }
    
    setAutor(value: string | null) {
      this._autor = value;
    }
    
    setGenre(value: string | null) {
      this._genre = value;
    }
    
    setClassif(value: number | null) {
      this._classif = value;
    }
    
    setNum_pag(value: number | null) {
      this._num_pag = value;
    }
    
    setDesc(value: string | null) {
      this._desc = value.replace(/<.*?>/g, "");
    }
    
    setRef_foto(value: string | null) {
      this._ref_foto = value;
    }
  }
export class Critic {

  private _id_critic: string;
  private _text: string | null;
  private _crit_data: string | null;
  private _num_likes: number | null;
  private _id_book: string | null;
  private _id_user: string | null;
  private _classif: number | null;

  constructor(id_critic: string, text: string | null = null, num_likes: number | null = null, id_book: string | null = null, id_user: string | null = null, classif: number | null = null,
    crit_data: string | null = null) {
    this._id_critic = id_critic;
    this._text = text;
    this._num_likes = num_likes;
    this._id_book = id_book;
    this._id_user = id_user;
    this._classif = classif;
    this._crit_data = crit_data;
  }


  get id_critic(): string {
    return this._id_critic;
  }

  get text(): string {
    return this._text;
  }


  get num_likes(): number {
    return this._num_likes;
  }

  get id_book(): string {
    return this._id_book;
  }

  get id_user(): string {
    return this._id_user;
  }

  get classif(): number {
    return this._classif;
  }

  get crit_data(): string {
    return this._crit_data;
  }


  set id_critic(value: string) {
    this._id_critic = value;
  }

  set text(value: string) {
    this._text = value;
  }

  set num_likes(value: number) {
    this._num_likes = value;
  }

  set id_book(value: string) {
    this._id_book = value;
  }

  set id_user(value: string) {
    this._id_user = value;
  }

  set classif(value: number) {
    this._classif = value;
  }

  set crit_data(value: string) {
    this.crit_data = value;
  }



}
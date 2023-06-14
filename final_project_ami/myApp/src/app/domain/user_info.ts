export class UserInfo {
  private _id_user: string;
  private _name_user: string;
  private _ref_foto: string;
  private _desc: string;

  constructor(
    id_user: string,
    name_user: string,
    ref_foto: string,
    desc: string
  ) {
    this._id_user = id_user;
    this._name_user = name_user;
    this._ref_foto = ref_foto;
    this._desc = desc;
  }

  get id_user(): string {
    return this._id_user;
  }

  get name_user(): string {
    return this._name_user;
  }

  get desc(): string {
    return this._desc;
  }

  get ref_foto(): string {
    return this._ref_foto;
  }
}

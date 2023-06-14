export class Comment {
    private _id_comment: string;
    private _id_critic: string;
    private _id_user: string;
    private _text: string;
    private _data;

    constructor(
        id_comment: string,
        id_critic: string,
        id_user: string,
        text: string,
        data
    ) {
        this._id_comment = id_comment;
        this._id_critic = id_critic;
        this._id_user = id_user;
        this._text = text;
        this._data = data;
    }

    get id_comment(): string {
        return this._id_comment;
    }

    get id_critic(): string {
        return this._id_critic;
    }

    get id_user(): string {
        return this._id_user;
    }

    get text(): string {
        return this._text;
    }

    get data(): string {
        return this._data;
    }
}
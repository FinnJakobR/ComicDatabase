import TokenKind from "./kind.js";

export default class Token {
    public kind: TokenKind;
    public value: string;

    constructor(kind: TokenKind, value: string){
        this.kind = kind;
        this.value = value;
    }

}
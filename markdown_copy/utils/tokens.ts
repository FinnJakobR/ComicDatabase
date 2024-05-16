import { TokenKind } from "./kind.js";

export default class Token {
    public kind: TokenKind;
    private literal: string;

    constructor(kind: TokenKind, literal: string){
        this.kind = kind;
        this.literal = literal;
    }
}
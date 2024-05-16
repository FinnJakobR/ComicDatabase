export enum TokenKind {
    HEADER,
    TEXT,
    HR,
    PARAGRAPH,
    CODE
}




export const Token_hash: Map<TokenKind, string> = new Map(
[
 [TokenKind.HEADER, "#"],
 [TokenKind.HR, "-"],
 [TokenKind.PARAGRAPH, "p"],
 [TokenKind.CODE, "`"]
]) 
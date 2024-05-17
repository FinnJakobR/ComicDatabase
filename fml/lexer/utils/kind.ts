enum TokenKind {
    
    EOF,
    NEWLINE,
    INDENT,
    WHITESPACE,

    GT,
    LT,
    HASH,
    TEXT,
    INT,
    POINT,
    FENCE,

    STAR,
    PLUS,
    MINUS,
    UNDER_SCORE,
    EQUAL,
    SPILE,
    OR,
    COLON,
    OPENPAREN,
    CLOSEPAREN,
    
    OPENCURLYPAREN,
    CLOSECURLYPAREN,
    OPENSQUAREPAREN,
    CLOSESQUAREPAREN,


    SLASH,
    MARK,
    DOUBLE_QUOTES,
    SEMICOLON,
    UP,
    DEDENT,
    AT


}


export default TokenKind;

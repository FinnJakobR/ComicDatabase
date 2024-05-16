/**
* checkt ob ein gegebender character space ist oder nicht.
* - \u0020 - Leerzeichen
* - \u0009 - Horizontaler Tabulator
* - \u000A - Zeilenumbruch
* - \u000D - Wagenrücklauf
* - \u000B - Vertikaler Tabulator
* - \u000C - Formularvorschub
 * @param {string} c der character der untersucht werden soll.
 * @returns {boolean} handelt es sich um space oder nicht
 */

export default function is_space(c:string){
    return /[ \t]/.test(c)
}

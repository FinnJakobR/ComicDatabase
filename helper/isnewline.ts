/**
* checkt ob ein gegebender character space ist oder nicht.
* - \n
* - \r
 * @param {string} c der character der untersucht werden soll.
 * @returns {boolean} handelt es sich um newline oder nicht
 */

export default function isnewline(c:string){
    return c === '\n' || c === '\r';
}

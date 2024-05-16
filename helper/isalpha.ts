/**
 * Überprüft, ob das übergebene Zeichen ein alphabetisches Zeichen ist.
 * @param {string} char - Das zu überprüfende Zeichen.
 * @returns {boolean} Gibt true zurück, wenn das Zeichen alphabetisch ist, sonst false.
 */
export default function isalpha(char:string) {
    return /^[a-zA-Z]$/.test(char);
  }
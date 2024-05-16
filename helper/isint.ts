/**
 * Überprüft, ob der übergebene String eine gültige Ganzzahl darstellt.
 * @param {string} c - Der zu überprüfende String.
 * @returns {boolean} Gibt true zurück, wenn der String eine Ganzzahl darstellt, sonst false.
 */
export default function isint(c:string) {
    return /^-?[0-9]+$/.test(c);
  }
/**
 * Разделяет строку на первое слово и остальную часть.
 * @param {string} text - Строка, которую нужно разделить.
 * @returns {object} { firstWord: string, secondPart: string }
 */
export function splitTitle(text: string) {
  if (!text) return { firstWord: '', secondPart: '' }; // Обработка пустой строки или undefined
  const [firstWord, ...restWords] = text.split(' ');
  return {
    firstWord,
    secondPart: restWords.join(' '), // Остальные слова объединяем в строку
  };
}

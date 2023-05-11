import { avatarBgMap } from '../../model/avatarBg';

const MIN_LETTER_NUMBER = 1;
const MAX_LETTER_NUMBER = 26;
const DEFAULT_LETTER_NUMBER = 13;
const MIN_CHAR_CODE = 64;

function normalizeLetterCode(letterCode: number): number {
  let letterCopy = letterCode;
  if (letterCopy < MIN_LETTER_NUMBER) {
    letterCopy = MIN_LETTER_NUMBER;
  } else if (letterCopy > MAX_LETTER_NUMBER) {
    letterCopy = MAX_LETTER_NUMBER;
  }

  return letterCopy;
}

export function getBgHex(initials: string): string {
  const bgVariantsLength = Object.keys(avatarBgMap).length;
  let firstLetter =
    initials.toUpperCase().charCodeAt(0) - MIN_CHAR_CODE ||
    DEFAULT_LETTER_NUMBER;
  let secondLetter =
    initials.toUpperCase().charCodeAt(1) - MIN_CHAR_CODE ||
    DEFAULT_LETTER_NUMBER;

  firstLetter = normalizeLetterCode(firstLetter);
  secondLetter = normalizeLetterCode(secondLetter);

  const maxCodesMulti = MAX_LETTER_NUMBER * MAX_LETTER_NUMBER;
  const stepLength = bgVariantsLength
    ? maxCodesMulti / bgVariantsLength
    : maxCodesMulti;
  const letterPosition = firstLetter * secondLetter;
  const resultIndex = Math.ceil(letterPosition / stepLength) - 1;

  return Object.values(avatarBgMap)[resultIndex];
}

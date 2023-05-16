export function rusToLat(str: string): string {
  const ru: { [letter: string]: string } = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'j',
    з: 'z',
    и: 'i',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ы: 'y',
    э: 'e',
    ю: 'u',
    я: 'ya',
    ъ: 'ie',
    ь: '',
    й: 'i',
  };

  return [...str]
    .map((l) => {
      let latL = ru[l.toLocaleLowerCase()];

      if (!latL) {
        latL = l;
      }

      if (l !== l.toLocaleLowerCase()) {
        latL = latL.charAt(0).toLocaleUpperCase() + latL.slice(1);
      }

      return latL;
    })
    .join('');
}

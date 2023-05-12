const gap = 'var(--spacing-8)';
const checkboxWidth = 'var(--spacing-16)';
const pictureWidth = '(2 * var(--spacing-22))';
const leftIconWidth = 'var(--spacing-16)';
const rightIconWidth = 'var(--spacing-16)';

export function getTextBlockWidth(attrs: {
  checkbox: boolean;
  picture: boolean;
  leftIcon: boolean;
  rightIcon: boolean;
}): string {
  const { checkbox, picture, leftIcon, rightIcon } = attrs;

  const checkboxValue = checkbox ? `${checkboxWidth} + ${gap}` : '0px';
  const pictureValue = picture ? ` + ${pictureWidth} + ${gap}` : '0px';
  const leftIconValue = leftIcon ? ` + ${leftIconWidth} + ${gap}` : '0px';
  const rightIconValue = rightIcon ? ` + ${rightIconWidth} + ${gap}` : '0px';

  return `calc(100% - (${checkboxValue} ${pictureValue} ${leftIconValue} ${rightIconValue}))`;
}

export const humanReadable = (string) =>
  string
    .split(/[-_]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const formatInput = (input = '') => {
  let tidyInput = input.trim();

  tidyInput = tidyInput.replace(/\s+/g, ' ');

  tidyInput = tidyInput.replace(/([.,!?])(?=\S)/g, '$1 ');

  tidyInput = tidyInput.replace(/(^\w|[.?!]\s+\w)/g, (match) =>
    match.toUpperCase()
  );

  if (!/[.!?]$/.test(tidyInput)) {
    tidyInput += '.';
  }

  return tidyInput;
};

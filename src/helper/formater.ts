export function convertDuration(min: number, minEach: number): string {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  return `${hours} hours, ${minutes} minutes (${minEach} minutes each)`;
}

export function formatNumber(nun: number): string {
  const model = new Intl.NumberFormat("en-US", {
    style: "decimal",
    localeMatcher: "best fit",
  });

  return model.format(nun);
}

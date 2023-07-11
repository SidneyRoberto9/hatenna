import { AniDate } from '@/@Types/AniList';

export function convertDuration(min: number, minEach: number): string {
  if (min == null || minEach == null) return '';
  const time = min * minEach;
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours} hours, ${minutes} minutes (${minEach} minutes each)`;
}

export function formatNumber(nun: number): string {
  const model = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    localeMatcher: 'best fit',
  });

  return model.format(nun);
}

export function removeListDuplicates(arr: any[]) {
  let unique: any[] = [];
  arr.forEach((element) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
}

export function formatAniListSearchDate(date: AniDate): string | null {
  if (date.day == null || date.month == null || date.year == null) {
    return null;
  }

  const month = date.month < 10 ? `0${date.month}` : date.month;
  const day = date.day < 10 ? `0${date.day}` : date.day;

  return `${date.year}-${month}-${day}`;
}

export function textFormatter(text: string) {
  if (text == null) return '';
  const arr = text.replace(/_/g, ' ').toLowerCase().split(' ');

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const formatted = arr.join(' ');

  return formatted;
}

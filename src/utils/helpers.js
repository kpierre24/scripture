export const backgrounds = [
  "https://source.unsplash.com/1600x900/?church,light",
  "https://source.unsplash.com/1600x900/?nature,calm",
  "https://source.unsplash.com/1600x900/?sky,clouds",
  "https://source.unsplash.com/1600x900/?water,peaceful",
  "https://source.unsplash.com/1600x900/?forest,green",
  "https://source.unsplash.com/1600x900/?mountains,serene",
  "https://source.unsplash.com/1600x900/?sunset,sky",
  "https://source.unsplash.com/1600x900/?sunrise,light",
  "https://source.unsplash.com/1600x900/?beach,sand",
  "https://source.unsplash.com/1600x900/?flowers,garden",
];

export function getDailyIndex(scriptures) {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return dayOfYear % scriptures.length;
}

export function mean(array: number[]) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

export function variance(array: number[]) {
  const meanValue = mean(array);
  return Math.sqrt(array.map(x => Math.pow(x - meanValue, 2)).reduce((a, b) => a + b) / array.length);
}

export function shuffleArray<T>(array: T[], random: () => number): T[] {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// mulberry32
export function seedRandom(seed: number) {
  return function() {
    var t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export function round(x: number, decimals=1) {
  const mult = Math.pow(10, decimals);
  return Math.round(x * mult) / mult;
}

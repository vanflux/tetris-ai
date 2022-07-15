"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = exports.seedRandom = exports.sleep = exports.shuffleArray = exports.variance = exports.mean = void 0;
function mean(array) {
    return array.reduce((a, b) => a + b, 0) / array.length;
}
exports.mean = mean;
function variance(array) {
    const meanValue = mean(array);
    return Math.sqrt(array.map(x => Math.pow(x - meanValue, 2)).reduce((a, b) => a + b) / array.length);
}
exports.variance = variance;
function shuffleArray(array, random) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
exports.shuffleArray = shuffleArray;
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function seedRandom(seed) {
    return function () {
        var t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
exports.seedRandom = seedRandom;
function round(x, decimals = 1) {
    const mult = Math.pow(10, decimals);
    return Math.round(x * mult) / mult;
}
exports.round = round;

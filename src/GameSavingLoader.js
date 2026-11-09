import read from './reader.js';
import json from './parser.js';
import GameSaving from './GameSaving.js';

export default class GameSavingLoader {
  static async load() {
    const buffer = await read();
    const jsonString = await json(buffer);
    const parsedData = JSON.parse(jsonString);

    return new GameSaving(parsedData);
  }
}

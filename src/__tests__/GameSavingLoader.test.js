import GameSavingLoader from '../GameSavingLoader.js';
import GameSaving from '../GameSaving.js';
import read from '../reader.js';
import json from '../parser.js';

jest.mock('../reader.js');
jest.mock('../parser.js');

describe('GameSavingLoader', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should load and parse game saving correctly (resolve)', async () => {
    const mockBuffer = new ArrayBuffer(10);
    read.mockResolvedValue(mockBuffer);
    json.mockResolvedValue('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}');

    const saving = await GameSavingLoader.load();

    expect(saving).toBeInstanceOf(GameSaving);
    expect(saving.id).toBe(9);
    expect(saving.created).toBe(1546300800);
    expect(saving.userInfo).toEqual({
      id: 1,
      name: 'Hitman',
      level: 10,
      points: 2000,
    });
  });

  test('should throw an error if read fails (reject)', async () => {
    read.mockRejectedValue(new Error('Ошибка чтения файла'));
    await expect(GameSavingLoader.load()).rejects.toThrow('Ошибка чтения файла');
  });

  test('should throw an error if json fails (reject)', async () => {
    const mockBuffer = new ArrayBuffer(10);
    read.mockResolvedValue(mockBuffer);
    json.mockRejectedValue(new Error('Ошибка парсинга JSON'));
    await expect(GameSavingLoader.load()).rejects.toThrow('Ошибка парсинга JSON');
  });
});

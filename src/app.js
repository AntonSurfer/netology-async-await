import GameSavingLoader from './GameSavingLoader.js';

(async () => {
  try {
    console.log('Начинаем загрузку сохранения...');
    const saving = await GameSavingLoader.load();
    console.log('Сохранение успешно загружено:', saving);
  } catch (error) {
    console.error('Произошла ошибка при загрузке сохранения:', error.message);
  }
})();

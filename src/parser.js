export default function json(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(String.fromCharCode(...new Uint16Array(data)));
    }, 500);
  });
}

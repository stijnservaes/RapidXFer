export function generateCode() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (array[0] % 900000 + 100000).toString()
}
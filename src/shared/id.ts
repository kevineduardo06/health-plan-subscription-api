let sequence = 1;

export function nextId(prefix: string) {
  const value = `${prefix}_${sequence.toString().padStart(4, '0')}`;
  sequence += 1;
  return value;
}

export function resetIdsForTests() {
  sequence = 1;
}

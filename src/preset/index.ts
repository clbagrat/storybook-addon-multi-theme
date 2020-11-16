export function managerEntries(entry: any[] = [], options: any) {
  return [...entry, require.resolve('../register')];
}

export function config(entry: any[] = [], { addDecorator = true }: { addDecorator: boolean}) {
  const config = [];
  if (addDecorator) {
    config.push(require.resolve('./addDecorator'));
  }
  return [...entry, ...config];
}
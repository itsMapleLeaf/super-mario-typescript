// helper function to raise errors in expressions, makes some things nicer
export function raise(errorMessage: string): never {
  throw new Error(errorMessage)
}

/**
 * Capitalizes the first letter of a name.
 * @param {string} name - The name to modify.
 * @returns {string} - The name with the first letter capitalized.
 */
export function capitalize(name: string): string {
  return name.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

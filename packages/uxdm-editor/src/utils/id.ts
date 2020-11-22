import { customAlphabet } from 'nanoid';

/**
 * @internal
 */
const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * @internal
 */
export const generateID = customAlphabet(alphabet, 10);

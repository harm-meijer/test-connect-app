import * as dotenv from 'dotenv';
dotenv.config();

import { describe, expect, test } from '@jest/globals';

describe('Testing Job', () => {
  test('Mock Job testing', async () => {
    expect(process.env.HELLO).toBe('world');
    expect(1).toBe(1);
  });
});

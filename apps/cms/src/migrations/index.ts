import * as migration_20260402_073026_init from './20260402_073026_init';

export const migrations = [
  {
    up: migration_20260402_073026_init.up,
    down: migration_20260402_073026_init.down,
    name: '20260402_073026_init'
  },
];

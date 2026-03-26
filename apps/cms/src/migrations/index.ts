import * as migration_20260318_151218 from './20260318_151218';
import * as migration_20260326_000000_add_media_prefix from './20260326_000000_add_media_prefix';

export const migrations = [
  {
    up: migration_20260318_151218.up,
    down: migration_20260318_151218.down,
    name: '20260318_151218'
  },
  {
    up: migration_20260326_000000_add_media_prefix.up,
    down: migration_20260326_000000_add_media_prefix.down,
    name: '20260326_000000_add_media_prefix'
  },
];

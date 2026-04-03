import * as migration_20260402_073026_init from './20260402_073026_init';
import * as migration_20260403_150426_trails_update from './20260403_150426_trails_update';
import * as migration_20260403_155627_blog_block from './20260403_155627_blog_block';
import * as migration_20260403_163008_influencers from './20260403_163008_influencers';

export const migrations = [
  {
    up: migration_20260402_073026_init.up,
    down: migration_20260402_073026_init.down,
    name: '20260402_073026_init',
  },
  {
    up: migration_20260403_150426_trails_update.up,
    down: migration_20260403_150426_trails_update.down,
    name: '20260403_150426_trails_update',
  },
  {
    up: migration_20260403_155627_blog_block.up,
    down: migration_20260403_155627_blog_block.down,
    name: '20260403_155627_blog_block',
  },
  {
    up: migration_20260403_163008_influencers.up,
    down: migration_20260403_163008_influencers.down,
    name: '20260403_163008_influencers'
  },
];

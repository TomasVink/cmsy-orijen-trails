import * as migration_20260402_073026_init from './20260402_073026_init';
import * as migration_20260403_150426_trails_update from './20260403_150426_trails_update';
import * as migration_20260403_155627_blog_block from './20260403_155627_blog_block';
import * as migration_20260403_163008_influencers from './20260403_163008_influencers';
import * as migration_20260404_000000_fix_submit_trail_intro from './20260404_000000_fix_submit_trail_intro';
import * as migration_20260404_000001_fix_blog_intro from './20260404_000001_fix_blog_intro';
import * as migration_20260406_104449_related_content from './20260406_104449_related_content';
import * as migration_20260406_120122_icons_update from './20260406_120122_icons_update';
import * as migration_20260406_151215_events from './20260406_151215_events';
import * as migration_20260413_094315 from './20260413_094315';
import * as migration_20260413_125927_patch_requests from './20260413_125927_patch_requests';
import * as migration_20260413_133705_faq from './20260413_133705_faq';
import * as migration_20260423_133216_section_bg from './20260423_133216_section_bg';

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
    name: '20260403_163008_influencers',
  },
  {
    up: migration_20260404_000000_fix_submit_trail_intro.up,
    down: migration_20260404_000000_fix_submit_trail_intro.down,
    name: '20260404_000000_fix_submit_trail_intro',
  },
  {
    up: migration_20260404_000001_fix_blog_intro.up,
    down: migration_20260404_000001_fix_blog_intro.down,
    name: '20260404_000001_fix_blog_intro',
  },
  {
    up: migration_20260406_104449_related_content.up,
    down: migration_20260406_104449_related_content.down,
    name: '20260406_104449_related_content',
  },
  {
    up: migration_20260406_120122_icons_update.up,
    down: migration_20260406_120122_icons_update.down,
    name: '20260406_120122_icons_update',
  },
  {
    up: migration_20260406_151215_events.up,
    down: migration_20260406_151215_events.down,
    name: '20260406_151215_events',
  },
  {
    up: migration_20260413_094315.up,
    down: migration_20260413_094315.down,
    name: '20260413_094315',
  },
  {
    up: migration_20260413_125927_patch_requests.up,
    down: migration_20260413_125927_patch_requests.down,
    name: '20260413_125927_patch_requests',
  },
  {
    up: migration_20260413_133705_faq.up,
    down: migration_20260413_133705_faq.down,
    name: '20260413_133705_faq',
  },
  {
    up: migration_20260423_133216_section_bg.up,
    down: migration_20260423_133216_section_bg.down,
    name: '20260423_133216_section_bg'
  },
];

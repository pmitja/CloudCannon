/**
 * Sections that CloudCannon can re-render live in the browser while editing.
 * To add a section: create the component, add it here, add a structure in cloudcannon.config.yml.
 */
import Hero from './Hero.astro';
import LogoStrip from './LogoStrip.astro';
import MediaFeature from './MediaFeature.astro';
import CaseStudies from './CaseStudies.astro';
import Intro from './Intro.astro';
import TabsSection from './TabsSection.astro';
import Principles from './Principles.astro';
import Statement from './Statement.astro';
import Features from './Features.astro';
import Callout from './Callout.astro';
import CtaBanner from './CtaBanner.astro';

export const editableBlocks = {
  hero: Hero,
  logo_strip: LogoStrip,
  media_feature: MediaFeature,
  case_studies: CaseStudies,
  intro: Intro,
  tabs: TabsSection,
  principles: Principles,
  statement: Statement,
  features: Features,
  callout: Callout,
  cta_banner: CtaBanner,
} as const;

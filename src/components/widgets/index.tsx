import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { WidgetId } from '../../content/types';

/** Each widget lives in its own file with a default export and is code-split. */
export const WIDGETS: Record<WidgetId, LazyExoticComponent<ComponentType>> = {
  'team-to-agent': lazy(() => import('./TeamToAgent')),
  'request-journey': lazy(() => import('./RequestJourney')),
  'stack-layers': lazy(() => import('./StackLayers')),
  'dns-lookup': lazy(() => import('./DnsLookup')),
  'git-playground': lazy(() => import('./GitPlayground')),
  'storage-picker': lazy(() => import('./StoragePicker')),
  'chat-vs-agent': lazy(() => import('./ChatVsAgent')),
  'agent-loop': lazy(() => import('./AgentLoop')),
  'setup-checklist': lazy(() => import('./SetupChecklist')),
  'token-builder': lazy(() => import('./TokenBuilder')),
  'brief-builder': lazy(() => import('./BriefBuilder')),
  'prompt-lab': lazy(() => import('./PromptLab')),
  'vibe-loop': lazy(() => import('./VibeLoop')),
  'bug-report': lazy(() => import('./BugReport')),
  pipeline: lazy(() => import('./Pipeline')),
  'nameserver-switch': lazy(() => import('./NameserverSwitch')),
  'hero-finale': lazy(() => import('./HeroFinale')),
  'agent-picker': lazy(() => import('./AgentPicker')),
  'design-flaws': lazy(() => import('./DesignFlaws')),
  'secret-hunt': lazy(() => import('./SecretHunt')),
  'platform-compare': lazy(() => import('./PlatformCompare')),
  'other-businesses': lazy(() => import('./OtherBusinesses')),
};

import { envConfigs } from '..';

export const localeNames: Record<string, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
};

export const locales = ['en', 'zh', 'es'];

export const defaultLocale = envConfigs.locale;

export const localePrefix = 'as-needed';

export const localeDetection = false;

export const localeMessagesRootPath = '@/config/locale/messages';

export const localeMessagesPaths = [
  'common',
  'landing',
  'settings/sidebar',
  'settings/profile',
  'settings/security',
  'settings/billing',
  'settings/payments',
  'settings/credits',
  'settings/apikeys',
  'admin/sidebar',
  'admin/users',
  'admin/roles',
  'admin/permissions',
  'admin/categories',
  'admin/posts',
  'admin/payments',
  'admin/subscriptions',
  'admin/credits',
  'admin/settings',
  'admin/apikeys',
  'admin/ai-tasks',
  'admin/chats',
  'ai/chat',
  'activity/sidebar',
  'activity/ai-tasks',
  'activity/chats',
  'pages/deal',
  'pages/scope',
  'pages/payment',
  'pages/pricing',
  'pages/guides',
  'pages/guides/client-not-paying',
  'pages/guides/scope-creep',
  'pages/guides/how-to-price-freelance-work',
  'pages/guides/client-asking-for-discount',
  'pages/guides/client-keeps-asking-for-revisions',
  'pages/guides/scope-creep-freelancer',
  'pages/guides/how-many-revisions-should-you-offer',
  'pages/guides/client-asking-for-extra-work',
  'pages/guides/freelance-revision-policy',
  'pages/templates',
  'pages/templates/revision-policy',
  'pages/templates/payment-reminder',
  'pages/templates/pricing-quote',
  'pages/industries',
  'pages/industries/designers',
  'pages/industries/video-editors',
  'pages/industries/copywriters',
  'pages/blog',
  'pages/updates',
  'pages/create',
  'admin/prompts',
];

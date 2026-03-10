import rawHubPageData from '../../../content/pricing/hub.json';

import { hubPageDataSchema, type HubPageData } from '@/types/content';

const pricingHubPageData = hubPageDataSchema.parse(rawHubPageData);

export function getPricingHub(): HubPageData {
  return pricingHubPageData;
}

import { hubPageDataSchema, type HubPageData } from '@/types/content';

import rawHubPageData from '../../../content/pricing/hub.json';

const pricingHubPageData = hubPageDataSchema.parse(rawHubPageData);

export function getPricingHub(): HubPageData {
  return pricingHubPageData;
}

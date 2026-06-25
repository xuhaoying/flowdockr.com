import {
  FLOWDOCKR_PUBLIC_SUPPORT_EMAIL,
  resolvePublishedContactEmail,
} from '@/lib/trust';

import { getAllConfigs } from '@/shared/models/config';

export async function getPublicContactDetails() {
  const configs = await getAllConfigs();

  const supportEmail =
    resolvePublishedContactEmail([
      process.env.SUPPORT_EMAIL,
      process.env.CONTACT_EMAIL,
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
      configs.support_email,
      configs.contact_email,
      configs.resend_sender_email,
    ]) || FLOWDOCKR_PUBLIC_SUPPORT_EMAIL;

  const privacyEmail = resolvePublishedContactEmail([
    process.env.PRIVACY_EMAIL,
    process.env.LEGAL_EMAIL,
    process.env.NEXT_PUBLIC_PRIVACY_EMAIL,
    configs.privacy_email,
    configs.legal_email,
    supportEmail,
  ]);

  return {
    supportEmail,
    privacyEmail,
  };
}

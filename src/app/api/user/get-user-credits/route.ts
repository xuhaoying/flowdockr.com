import { getCredits } from '@/lib/credits';

import { respData, respErr } from '@/shared/lib/resp';
import { getUserInfo } from '@/shared/models/user';

export async function POST(req: Request) {
  try {
    const user = await getUserInfo();
    if (!user) {
      return respErr('no auth, please sign in');
    }

    const credits = await getCredits(user.id);

    return respData({ remainingCredits: credits });
  } catch (e) {
    console.log('get user credits failed:', e);
    return respErr('get user credits failed');
  }
}

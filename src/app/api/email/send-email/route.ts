import { PERMISSIONS, requirePermission } from '@/core/rbac';
import { VerificationCode } from '@/shared/blocks/email/verification-code';
import { getEmailService } from '@/shared/services/email';

export async function POST(req: Request) {
  try {
    await requirePermission({ code: PERMISSIONS.ADMIN_ACCESS });

    const { emails, subject } = (await req.json()) as {
      emails?: unknown;
      subject?: unknown;
    };
    const recipients = Array.isArray(emails)
      ? emails.filter((item): item is string => typeof item === 'string')
      : typeof emails === 'string'
        ? [emails]
        : [];
    const normalizedRecipients = recipients
      .map((email) => email.trim().toLowerCase())
      .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const safeSubject =
      typeof subject === 'string' ? subject.trim().slice(0, 140) : '';

    if (normalizedRecipients.length === 0 || !safeSubject) {
      return Response.json(
        { message: 'Invalid email request.' },
        { status: 400 }
      );
    }

    const emailService = await getEmailService();

    const result = await emailService.sendEmail({
      to: normalizedRecipients,
      subject: safeSubject,
      react: VerificationCode({ code: '123455' }),
    });

    return Response.json({ result });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'send email failed';
    const status =
      message.includes('authenticated') || message.includes('Permission')
        ? 403
        : 500;

    return Response.json({ message: 'send email failed' }, { status });
  }
}

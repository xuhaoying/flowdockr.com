import { Link } from '@/core/i18n/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

export function BillingPolicy() {
  return (
    <Card className="border-border/80 bg-white py-0 shadow-sm">
      <CardHeader className="gap-2 px-6 py-5 md:px-8">
        <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          Billing trust
        </p>
        <CardTitle className="text-2xl tracking-tight text-slate-900">
          Billing &amp; refund policy
        </CardTitle>
        <p className="max-w-3xl text-sm leading-6 text-slate-700">
          Flowdockr currently sells one-time credit packs through checkout. We
          keep the billing policy simple and conservative so it matches the
          product as it exists today.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 px-6 pb-6 md:grid-cols-2 md:px-8">
        <div className="rounded-[18px] border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Credits and renewals
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>Flowdockr offers a free trial plus one-time paid credit packs.</li>
            <li>The current public checkout flow is not an auto-renewing subscription.</li>
            <li>Credits unlock different support levels and do not expire.</li>
          </ul>
        </div>

        <div className="rounded-[18px] border border-slate-200 bg-slate-50/80 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Refunds and billing issues
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>Purchases are generally final unless required otherwise by law.</li>
            <li>Duplicate charges or technical checkout problems are reviewed manually.</li>
            <li>
              If you need help with billing, credits, or account access, use our{' '}
              <Link
                href="/contact"
                className="font-medium text-slate-900 underline underline-offset-2"
              >
                contact page
              </Link>
              .
            </li>
          </ul>
        </div>

        <div className="rounded-[18px] border border-slate-200 bg-white p-4 md:col-span-2">
          <p className="text-sm font-semibold text-slate-900">Policy links</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700">
            <Link
              href="/terms"
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Contact
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

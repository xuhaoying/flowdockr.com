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
          FlowDockr currently sells one-time credit packs through checkout. We
          keep the billing policy simple and conservative so it matches the
          product as it exists today.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 px-6 pb-6 md:grid-cols-2 md:px-8">
        <div className="border-brand-lavender/20 bg-brand-bg/55 rounded-[18px] border p-4">
          <p className="text-sm font-semibold text-slate-900">
            Credits and renewals
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>
              FlowDockr offers a free trial plus one-time paid credit packs.
            </li>
            <li>
              The current public checkout flow is not an auto-renewing
              subscription.
            </li>
            <li>
              Payments are processed by checkout providers such as Stripe when
              enabled; FlowDockr does not store full card numbers.
            </li>
            <li>Credits unlock different support levels and do not expire.</li>
            <li>
              Credits are delivered digitally inside the product after
              successful checkout.
            </li>
          </ul>
        </div>

        <div className="border-brand-lavender/20 bg-brand-bg/55 rounded-[18px] border p-4">
          <p className="text-sm font-semibold text-slate-900">
            Refunds and billing issues
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>
              Purchases are generally final unless required otherwise by law.
            </li>
            <li>
              Unused paid credits may be reviewed for refund within 14 days of
              purchase.
            </li>
            <li>
              Duplicate charges or technical checkout problems are reviewed
              manually.
            </li>
            <li>
              If you need help with billing, credits, or account access, use our{' '}
              <Link
                href="/contact"
                className="text-brand-primary -mx-2 inline-flex min-h-11 items-center px-2 font-medium underline underline-offset-2"
              >
                contact page
              </Link>
              .
            </li>
          </ul>
        </div>

        <div className="border-brand-lavender/20 bg-brand-bg/55 rounded-[18px] border p-4 md:col-span-2">
          <p className="text-sm font-semibold text-slate-900">
            Digital product delivery
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>
              FlowDockr sells software access and in-app credits, not physical
              goods.
            </li>
            <li>
              There are no shipping fees, customs charges, or physical
              fulfillment timelines.
            </li>
            <li>
              If credits do not appear after a successful checkout, contact
              support so we can investigate the purchase record.
            </li>
          </ul>
        </div>

        <div className="border-brand-lavender/20 rounded-[18px] border bg-white p-4 md:col-span-2">
          <p className="text-sm font-semibold text-slate-900">Policy links</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-700">
            <Link
              href="/terms"
              className="text-brand-primary -mx-2 inline-flex min-h-11 items-center px-2 font-medium underline underline-offset-2"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-brand-primary -mx-2 inline-flex min-h-11 items-center px-2 font-medium underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            <Link
              href="/refund"
              className="text-brand-primary -mx-2 inline-flex min-h-11 items-center px-2 font-medium underline underline-offset-2"
            >
              Refund Policy
            </Link>
            <Link
              href="/contact"
              className="text-brand-primary -mx-2 inline-flex min-h-11 items-center px-2 font-medium underline underline-offset-2"
            >
              Contact
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

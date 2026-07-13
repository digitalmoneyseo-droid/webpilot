import { unlockSite } from "@/app/access/actions";
import { BrandMark } from "@/components/brand-mark";

export default async function AccessPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="access-page"><div className="access-card"><BrandMark /><span>Private preview</span><h1>Enter the studio.</h1><p>This private deployment is protected. Enter the shared access password to continue.</p><form action={unlockSite}><label htmlFor="password">Access password</label><input id="password" type="password" name="password" autoComplete="current-password" required autoFocus placeholder="••••••••••••" />{error && <small role="alert">That password was not recognized.</small>}<button type="submit">Continue ↗</button></form></div></main>;
}


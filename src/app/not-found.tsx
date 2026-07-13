import Link from "next/link";

export default function NotFound() { return <main className="not-found"><span>404</span><h1>That signal got lost.</h1><p>The page you’re looking for does not exist or has moved.</p><Link href="/">Back to the studio</Link></main>; }


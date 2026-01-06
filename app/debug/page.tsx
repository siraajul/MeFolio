
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export const revalidate = 0; // Force no cache

export default async function DebugPage() {
  const data = await client.fetch(siteSettingsQuery);

  return (
    <div className="p-10 font-mono text-xs whitespace-pre-wrap bg-white text-black">
      <h1>Debug Data</h1>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

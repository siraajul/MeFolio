"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Database, Check, X, Code2 } from "lucide-react";

export function ApiDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const runApiTest = () => {
    if (status === "loading") return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  const codeSnippet = `// playwright/tests/api.spec.ts
test('GET /api/users/1 should return valid schema', async ({ request }) => {
  const response = await request.get('/api/users/1');
  
  // Assert status code
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  
  // Assert JSON schema
  expect(data).toMatchObject({
    id: expect.any(Number),
    name: expect.any(String),
    role: 'admin',
    isActive: true
  });
});`;

  const jsonResponse = `{
  "id": 1,
  "name": "Sirajul Islam",
  "email": "contact@siraajul.com",
  "role": "admin",
  "isActive": true,
  "lastLogin": "2024-05-04T10:00:00Z"
}`;

  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Code & Controls */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-800">
            <div className="bg-neutral-950 px-4 py-2 border-b border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-mono flex items-center gap-2">
                <Code2 size={14} /> api.spec.ts
              </span>
              <button
                onClick={runApiTest}
                disabled={status === "loading"}
                className="bg-brand text-white text-xs px-3 py-1.5 rounded-md font-semibold hover:bg-brand/90 transition flex items-center gap-2 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <Send size={12} /> Send Request
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs text-blue-300 font-mono overflow-x-auto">
              <code>{codeSnippet}</code>
            </pre>
          </div>

          {/* Test Results Panel */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h4 className="text-sm font-bold mb-3 text-neutral-900 dark:text-white uppercase tracking-wider">Test Assertions</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${status === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800'}`}>
                  {status === "success" ? <Check size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300 font-mono">Status is 200 OK</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${status === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800'}`}>
                  {status === "success" ? <Check size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300 font-mono">JSON matches expected schema</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${status === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800'}`}>
                  {status === "success" ? <Check size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
                <span className="text-sm text-neutral-700 dark:text-neutral-300 font-mono">Response time &lt; 200ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Server Response */}
        <div className="w-full lg:w-1/2 flex flex-col">
           <div className="bg-neutral-50 dark:bg-neutral-950 rounded-xl overflow-hidden shadow-inner border border-neutral-200 dark:border-neutral-800 flex-grow relative">
             <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
               <Database size={16} className="text-brand" />
               <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Server Response</span>
             </div>
             
             {status === "idle" && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 z-10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm mt-12">
                 <Send size={32} className="mb-2 opacity-50" />
                 <p className="text-sm">Awaiting request...</p>
               </div>
             )}

             {status === "loading" && (
               <div className="absolute inset-0 flex flex-col items-center justify-center text-brand z-10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm mt-12">
                 <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mb-2" />
                 <p className="text-sm font-medium">Fetching /api/users/1...</p>
               </div>
             )}

             <div className="p-4">
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded">200 OK</span>
                  <span className="px-2 py-0.5 bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 text-xs rounded font-mono">42ms</span>
                </div>
                <pre className="text-xs text-green-600 dark:text-green-400 font-mono overflow-x-auto">
                  <code>{jsonResponse}</code>
                </pre>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

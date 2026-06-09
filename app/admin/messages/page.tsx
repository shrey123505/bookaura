"use client";

import { useEffect, useState } from "react";
import { AdminShell, useAdminApi } from "@/components/admin/admin-shell";
import { ContactMessage } from "@/lib/types";

function MessagesContent() {
  const { fetchAdmin } = useAdminApi();
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    async function loadMessages() {
      const response = await fetchAdmin("/api/admin/messages");
      const result = await response.json();
      setMessages(result.messages || []);
    }

    loadMessages();
  }, [fetchAdmin]);

  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Messages</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Contact inbox</h2>
      <div className="mt-8 grid gap-4">
        {messages.map((message) => (
          <div key={message.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <h3 className="font-black text-ink">{message.first_name} {message.last_name}</h3>
                <p className="mt-1 text-sm text-slate-600">{message.email}</p>
              </div>
              <span className="h-fit rounded-full bg-mist px-3 py-1 text-xs font-black text-ocean">
                {message.topic}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">{message.message}</p>
          </div>
        ))}
        {!messages.length && <p className="rounded-[1.5rem] bg-white p-6 text-sm font-bold text-slate-600 shadow-sm">No messages yet.</p>}
      </div>
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <AdminShell>
      <MessagesContent />
    </AdminShell>
  );
}

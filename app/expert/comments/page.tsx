"use client";
import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button, Card, EmptyState, PageHeader } from "@/components/ui";
import { applications } from "@/mock/applications";
import { startupById } from "@/mock/startups";
import { useStore } from "@/lib/store";

export default function ExpertComments() {
  const { user, toast, addAudit } = useStore();
  const seed = applications.flatMap((a) => a.expertComments.map((c) => ({ ...c, startup: startupById(a.startupId).name })));
  const [list, setList] = useState(seed);
  const [text, setText] = useState("");
  return (
    <div className="space-y-6">
      <PageHeader title="Comments" subtitle="Your comments on assigned applications. Comments are visible to the approving officer." />
      <Card>
        <label className="label mb-2 block" htmlFor="c">Add a general comment on EcoTech Solutions (APP-2041)</label>
        <textarea id="c" className="input min-h-[80px]" value={text} onChange={(e) => setText(e.target.value)} />
        <Button className="mt-3" disabled={text.trim().length < 5} onClick={() => {
          setList((l) => [{ expert: user?.name ?? "Expert", comment: text.trim(), score: 0, date: "2026-10-02", startup: "EcoTech Solutions" }, ...l]);
          addAudit({ actor: user?.name ?? "Expert", role: "Expert Reviewer", action: "Expert comment added on APP-2041", kind: "human" });
          toast("success", "Comment posted"); setText("");
        }}><Send className="h-4 w-4" /> Post comment</Button>
      </Card>
      {list.length === 0 ? <EmptyState title="No comments yet." /> : list.map((c, i) => (
        <Card key={i} className="flex gap-3">
          <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-saffron-300" />
          <div><p className="text-sm text-white">{c.startup} <span className="text-xs text-slate-500">· {c.date}{c.score ? ` · score ${c.score}` : ""}</span></p><p className="mt-1 text-sm text-slate-300">{c.comment}</p></div>
        </Card>
      ))}
    </div>
  );
}

"use client";
import { useState } from "react";
import { FileText, Upload, ShieldCheck, Search, Loader2, Lock } from "lucide-react";
import { PageHeader, Card, StatusBadge, Badge, Button, Modal, Field, Alert } from "@/components/ui";
import { vaultDocuments } from "@/mock/startupExtra";
import { useStore } from "@/lib/store";

type Doc = (typeof vaultDocuments)[number];

export default function DocumentsPage() {
  const { toast } = useStore();
  const [docs, setDocs] = useState<Doc[]>(vaultDocuments);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [cat, setCat] = useState("Past Work");

  const upload = () => {
    if (!file) return;
    const d: Doc = { name: file.replace(/\.[^.]+$/, ""), category: cat, uploaded: "02 Oct 2026", status: "Pending", scan: "Scanning", size: "—" };
    setDocs((x) => [d, ...x]); setOpen(false); setFile("");
    toast("info", "Uploaded — scanning", "Malware scan and AI verification in progress.");
    setTimeout(() => {
      setDocs((x) => x.map((y) => (y.name === d.name ? { ...y, scan: "Clean", status: "Verified", size: "820 KB" } : y)));
      toast("success", "Document verified", `${d.name} passed malware scan and verification.`);
    }, 2500);
  };

  const list = docs.filter((d) => (d.name + d.category).toLowerCase().includes(q.toLowerCase()));
  const counts = { v: docs.filter((d) => d.status === "Verified").length, f: docs.filter((d) => d.status === "Flagged").length };

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Document Vault" title="Documents" subtitle="Private, encrypted storage. Every upload is malware-scanned and verified before reviewers see it."
        actions={<Button onClick={() => setOpen(true)}><Upload className="h-4 w-4" /> Upload document</Button>} />
      <div className="grid gap-4 md:grid-cols-3">
        <Alert tone="success" title={`${counts.v} documents verified`} icon={ShieldCheck}>Checked against DigiLocker, DPIIT and GST registries.</Alert>
        <Alert tone="error" title={`${counts.f} document flagged`}>SPPU letter could not be matched to an issuing authority. Upload a signed copy.</Alert>
        <Alert tone="info" title="Encrypted at rest" icon={Lock}>India-hosted, AES-256 encryption. Only assigned reviewers can view.</Alert>
      </div>
      <Card className="p-0">
        <div className="flex items-center gap-3 border-b border-white/[0.06] p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input className="input pl-9" placeholder="Search documents" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search documents" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="border-b border-white/[0.06]">{["Document", "Category", "Uploaded", "Malware scan", "Verification"].map((h) => <th key={h} className="table-head px-5 py-3">{h}</th>)}</tr></thead>
            <tbody>
              {list.map((d) => (
                <tr key={d.name} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5"><span className="flex items-center gap-2 text-white"><FileText className="h-4 w-4 text-setu-300" />{d.name}</span><span className="ml-6 text-xs text-slate-500">{d.size}</span></td>
                  <td className="px-5 py-3.5"><Badge tone="slate">{d.category}</Badge></td>
                  <td className="px-5 py-3.5 text-slate-400">{d.uploaded}</td>
                  <td className="px-5 py-3.5">{d.scan === "Scanning" ? <span className="inline-flex items-center gap-1.5 text-xs text-ai-300"><Loader2 className="h-3.5 w-3.5 animate-spin" />Scanning</span> : <Badge tone="green">Clean</Badge>}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && <p className="p-8 text-center text-sm text-slate-400">No documents match “{q}”.</p>}
        </div>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title="Upload document"
        footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={upload} disabled={!file}>Upload & scan</Button></>}>
        <div className="space-y-4">
          <Field label="Category">
            <select className="input" value={cat} onChange={(e) => setCat(e.target.value)}>{["Registration", "Tax", "Past Work", "Compliance", "Financial"].map((c) => <option key={c}>{c}</option>)}</select>
          </Field>
          <Field label="File">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 px-4 py-6 text-sm text-slate-400 hover:border-setu-400/40">
              <Upload className="h-5 w-5" /><span>{file || "Choose a PDF or image"}</span>
              <input type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
            </label>
          </Field>
        </div>
      </Modal>
    </div>
  );
}

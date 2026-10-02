"use client";

/** StartupSetu Assistant — floating, multilingual, fully hardcoded (no API). */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Languages } from "lucide-react";
import { cn } from "@/lib/format";

type Lang = "en" | "hi" | "mr";
type Topic = "eligible" | "documents" | "payment" | "score" | "flagged";

const langs: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिन्दी" },
  { id: "mr", label: "मराठी" },
];

const questions: Record<Lang, Record<Topic, string>> = {
  en: {
    eligible: "Am I eligible?",
    documents: "What documents are required?",
    payment: "When will my payment be released?",
    score: "How is my AI score calculated?",
    flagged: "Why was my application flagged?",
  },
  hi: {
    eligible: "क्या मैं पात्र हूँ?",
    documents: "कौन से दस्तावेज़ चाहिए?",
    payment: "मेरा भुगतान कब जारी होगा?",
    score: "मेरा AI स्कोर कैसे निकाला जाता है?",
    flagged: "मेरा आवेदन फ़्लैग क्यों हुआ?",
  },
  mr: {
    eligible: "मी पात्र आहे का?",
    documents: "कोणती कागदपत्रे लागतात?",
    payment: "माझे पेमेंट कधी मिळेल?",
    score: "माझा AI स्कोअर कसा ठरतो?",
    flagged: "माझा अर्ज फ्लॅग का झाला?",
  },
};

const answers: Record<Lang, Record<Topic, string>> = {
  en: {
    eligible:
      "Any DPIIT-recognised startup with a valid PAN/GST and completed DigiLocker or Aadhaar e-KYC can apply. There is no minimum turnover requirement — each problem lists its own technical criteria. For Plastic Recycling (Maharashtra), your match score is 94%.",
    documents:
      "You need: DPIIT recognition certificate, Certificate of Incorporation, PAN/GST registration, a short solution proposal (PDF), proof of past work (completion letters), and a 30-second demo video. Identity is verified through DigiLocker — raw Aadhaar is never stored.",
    payment:
      "Pilot budgets are locked in escrow before work starts. Each milestone payment is released after the department approves your evidence and, where required, an independent validator confirms the result. Your next milestone (5-tonne weekly target, ₹5,00,000) is awaiting department approval. DEMO MODE — no real payments are processed.",
    score:
      "Seven AI agents evaluate your application. The score is a weighted mix: Solution Fit 30%, Feasibility 25%, Track Record 20%, Scalability 15%, Risk 10%. Every score comes with a reason, evidence and a confidence level. The AI only recommends — officers and experts make the final decision.",
    flagged:
      "Applications are flagged when the Verification or Track Record agent finds an inconsistency — for example a past-work letter that can't be matched, or a GST number that differs from your registration. A flag is not a rejection: a human officer reviews it and you can upload clarifications from My Applications.",
  },
  hi: {
    eligible:
      "कोई भी DPIIT-मान्यता प्राप्त स्टार्टअप जिसके पास वैध PAN/GST है और जिसने DigiLocker या आधार e-KYC पूरा किया है, आवेदन कर सकता है। कोई न्यूनतम टर्नओवर शर्त नहीं है। प्लास्टिक रीसाइक्लिंग (महाराष्ट्र) के लिए आपका मैच स्कोर 94% है।",
    documents:
      "आवश्यक दस्तावेज़: DPIIT प्रमाणपत्र, निगमन प्रमाणपत्र, PAN/GST पंजीकरण, समाधान प्रस्ताव (PDF), पिछले कार्य का प्रमाण और 30 सेकंड का डेमो वीडियो। पहचान DigiLocker से सत्यापित होती है — आधार नंबर संग्रहीत नहीं किया जाता।",
    payment:
      "पायलट का बजट काम शुरू होने से पहले एस्क्रो में लॉक हो जाता है। हर माइलस्टोन का भुगतान विभाग की मंज़ूरी और स्वतंत्र सत्यापन के बाद जारी होता है। आपका अगला माइलस्टोन (₹5,00,000) विभाग की स्वीकृति की प्रतीक्षा में है। डेमो मोड — कोई वास्तविक भुगतान नहीं।",
    score:
      "सात AI एजेंट आपके आवेदन का मूल्यांकन करते हैं: समाधान उपयुक्तता 30%, व्यवहार्यता 25%, पिछला रिकॉर्ड 20%, स्केलेबिलिटी 15%, जोखिम 10%। हर स्कोर के साथ कारण, साक्ष्य और विश्वास स्तर दिखाया जाता है। अंतिम निर्णय अधिकारी और विशेषज्ञ लेते हैं।",
    flagged:
      "जब सत्यापन एजेंट किसी दस्तावेज़ में असंगति पाता है — जैसे पिछले कार्य का पत्र मेल न खाना या GST नंबर अलग होना — तब आवेदन फ़्लैग होता है। फ़्लैग अस्वीकृति नहीं है: एक अधिकारी इसकी समीक्षा करता है और आप स्पष्टीकरण अपलोड कर सकते हैं।",
  },
  mr: {
    eligible:
      "वैध PAN/GST असलेला आणि DigiLocker किंवा आधार e-KYC पूर्ण केलेला कोणताही DPIIT-मान्यताप्राप्त स्टार्टअप अर्ज करू शकतो. किमान उलाढालीची अट नाही. प्लास्टिक पुनर्वापर (महाराष्ट्र) साठी तुमचा जुळणी स्कोअर 94% आहे.",
    documents:
      "आवश्यक कागदपत्रे: DPIIT प्रमाणपत्र, नोंदणी प्रमाणपत्र, PAN/GST, उपाय प्रस्ताव (PDF), पूर्वीच्या कामाचा पुरावा आणि 30 सेकंदांचा डेमो व्हिडिओ. ओळख DigiLocker द्वारे पडताळली जाते — आधार क्रमांक साठवला जात नाही.",
    payment:
      "पायलटचे बजेट काम सुरू होण्यापूर्वी एस्क्रोमध्ये लॉक केले जाते. प्रत्येक टप्प्याचे पेमेंट विभागाच्या मंजुरीनंतर आणि स्वतंत्र पडताळणीनंतर दिले जाते. तुमचा पुढील टप्पा (₹5,00,000) विभागाच्या मंजुरीच्या प्रतीक्षेत आहे. डेमो मोड — कोणतेही खरे पेमेंट नाही.",
    score:
      "सात AI एजंट तुमच्या अर्जाचे मूल्यमापन करतात: उपाय सुसंगतता 30%, व्यवहार्यता 25%, पूर्वीचा अनुभव 20%, विस्तारक्षमता 15%, जोखीम 10%. प्रत्येक स्कोअरसोबत कारण, पुरावा आणि विश्वास पातळी दाखवली जाते. अंतिम निर्णय अधिकारी व तज्ज्ञ घेतात.",
    flagged:
      "पडताळणी एजंटला कागदपत्रात विसंगती आढळल्यास — उदा. पूर्वीच्या कामाचे पत्र न जुळणे किंवा GST क्रमांक वेगळा असणे — अर्ज फ्लॅग होतो. फ्लॅग म्हणजे नकार नाही: अधिकारी त्याचे पुनरावलोकन करतात आणि तुम्ही स्पष्टीकरण अपलोड करू शकता.",
  },
};

const greeting: Record<Lang, string> = {
  en: "Namaste! I'm the StartupSetu Assistant. Ask me about eligibility, documents, payments or your AI score.",
  hi: "नमस्ते! मैं StartupSetu सहायक हूँ। पात्रता, दस्तावेज़, भुगतान या AI स्कोर के बारे में पूछें।",
  mr: "नमस्कार! मी StartupSetu सहाय्यक आहे. पात्रता, कागदपत्रे, पेमेंट किंवा AI स्कोअरबद्दल विचारा.",
};

const fallback: Record<Lang, string> = {
  en: "I'm a demo assistant with a fixed set of answers. Try one of the suggested questions below — or contact your department's nodal officer for anything else.",
  hi: "मैं सीमित उत्तरों वाला डेमो सहायक हूँ। कृपया नीचे दिए गए सुझाए गए प्रश्नों में से कोई चुनें।",
  mr: "मी मर्यादित उत्तरे असलेला डेमो सहाय्यक आहे. कृपया खालील सुचवलेल्या प्रश्नांपैकी एक निवडा.",
};

/** Keyword match across all three languages. */
const keywords: Record<Topic, string[]> = {
  eligible: ["eligib", "qualif", "can i apply", "पात्र", "योग्य"],
  documents: ["document", "docs", "paper", "certificate", "upload", "दस्तावेज़", "दस्तावेज", "कागद"],
  payment: ["pay", "money", "release", "escrow", "milestone", "भुगतान", "पैसा", "पेमेंट", "रक्कम"],
  score: ["score", "rank", "calculat", "ai", "स्कोर", "स्कोअर", "रैंक"],
  flagged: ["flag", "reject", "why", "fake", "फ़्लैग", "फ्लॅग", "फ्लैग", "अस्वीकार", "नकार"],
};

function match(text: string): Topic | null {
  const t = text.toLowerCase();
  let best: Topic | null = null;
  let bestHits = 0;
  (Object.keys(keywords) as Topic[]).forEach((k) => {
    const hits = keywords[k].filter((w) => t.includes(w)).length;
    if (hits > bestHits) { best = k; bestHits = hits; }
  });
  return best;
}

interface Msg { from: "bot" | "user"; text: string }

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: greeting.en }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const switchLang = (l: Lang) => {
    setLang(l);
    setMsgs((m) => [...m, { from: "bot", text: greeting[l] }]);
  };

  const ask = (text: string, topic: Topic | null) => {
    if (!text.trim() || typing) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: topic ? answers[lang][topic] : fallback[lang] }]);
    }, 900);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }}
            className="glass glow-border fixed bottom-24 right-4 z-[90] flex h-[min(560px,calc(100vh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden bg-ink-850/95 p-0 md:right-6"
            role="dialog" aria-label="StartupSetu Assistant"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-setu-gradient text-ink-950"><Sparkles className="h-5 w-5" /></span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">StartupSetu Assistant</p>
                <p className="flex items-center gap-1 text-[11px] text-mint-400"><span className="h-1.5 w-1.5 rounded-full bg-mint-400" /> Online · demo answers</p>
              </div>
              <button onClick={() => setOpen(false)} className="focus-ring rounded-lg p-1 text-slate-400 hover:text-white" aria-label="Close assistant"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex items-center gap-1 border-b border-white/[0.06] px-3 py-2" role="radiogroup" aria-label="Language">
              <Languages className="mr-1 h-4 w-4 text-slate-500" />
              {langs.map((l) => (
                <button
                  key={l.id} role="radio" aria-checked={lang === l.id} onClick={() => switchLang(l.id)}
                  className={cn("focus-ring rounded-lg px-2.5 py-1 text-xs transition", lang === l.id ? "bg-setu-500/20 text-white ring-1 ring-setu-400/30" : "text-slate-400 hover:text-white")}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {msgs.map((m, i) => (
                <div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.from === "user" ? "rounded-br-md bg-setu-500 text-white" : "rounded-bl-md border border-white/[0.06] bg-white/[0.04] text-slate-200",
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-4 py-3" aria-label="Assistant is typing">
                    {[0, 1, 2].map((d) => (
                      <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-ai-300" animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-white/[0.06] px-3 pb-3 pt-2">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                {(Object.keys(questions[lang]) as Topic[]).map((t) => (
                  <button
                    key={t} onClick={() => ask(questions[lang][t], t)}
                    className="focus-ring shrink-0 rounded-full border border-setu-400/25 bg-setu-500/10 px-3 py-1 text-xs text-setu-200 hover:bg-setu-500/20"
                  >
                    {questions[lang][t]}
                  </button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); ask(input, match(input)); }} className="flex gap-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder={lang === "en" ? "Type your question…" : lang === "hi" ? "अपना प्रश्न लिखें…" : "तुमचा प्रश्न लिहा…"}
                  className="input h-10 py-0" aria-label="Your question"
                />
                <button type="submit" className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-setu-500 text-white hover:bg-setu-400" aria-label="Send">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring fixed bottom-5 right-4 z-[90] flex h-14 items-center gap-2 rounded-full bg-setu-gradient pl-4 pr-5 font-medium text-ink-950 shadow-glow transition hover:brightness-110 md:right-6"
        aria-label={open ? "Close StartupSetu Assistant" : "Open StartupSetu Assistant"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        <span className="hidden text-sm sm:inline">{open ? "Close" : "Ask StartupSetu"}</span>
      </button>
    </>
  );
}

import SentimentDivideChart from "@/components/SentimentDivideChart";
import { QueryState } from "@/components/ui/QueryState";
import { useState } from "react";

import { useIntelligenceKpis, useQuotes } from "@/lib/api/hooks";
import { fmtRelative, fullName } from "@/lib/api/format";
import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Funnel,
  Search,
} from "lucide-react";

function DeepDive() {
  const [search, setSearch] = useState("");
  const intelQ = useIntelligenceKpis();
  const quotesQ = useQuotes({ per_page: 20, search: search || undefined });

  const k = intelQ.data;
  const quotes = quotesQ.data?.data ?? [];

  return (
    <section className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Deep Dive
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            Browse all session quotes, speakers and key moments from the summit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-white rounded-md p-2 flex items-center gap-2 min-w-70">
            <Search className="w-4 h-4 text-white shrink-0" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search quotes..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1 bg-transparent"
            />
          </div>
          <button className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
            <Funnel className="w-5 h-5 text-white" />
          </button>
          <button className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>
      </section>

      <SentimentDivideChart
        positive={k?.positive_pct}
        neutral={k?.neutral_pct}
        negative={k?.negative_pct}
      />

      <section className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
            KEY QUOTES
          </h4>
          <span className="text-cyan font-semibold font-lexend text-sm sm:text-base">
            {quotesQ.data?.total ?? 0} total
          </span>
        </div>
        <QueryState
          isLoading={quotesQ.isLoading}
          isError={quotesQ.isError}
          error={quotesQ.error as { message?: string } | null}
          isEmpty={quotes.length === 0}
          emptyLabel="No quotes captured yet."
        >
          <div className="flex flex-col gap-5 divide-y divide-white/20">
            {quotes.map((q) => (
              <div key={q.id} className="pb-5 flex flex-col gap-2">
                <p className="text-white font-lexend text-sm sm:text-base">
                  “{q.body}”
                </p>
                <div className="flex items-center justify-between text-xs font-dmSans text-white/70">
                  <span>
                    {fullName(q.speaker) || "Anonymous"}
                    {q.session ? ` • ${q.session.title}` : ""}
                  </span>
                  <span>{fmtRelative(q.recorded_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </QueryState>
      </section>
      <SentimentDivideChart />

      <section className="border border-white/55 rounded-2xl p-5 md:px-7.5 flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h5 className="font-dmSans text-cyan text-base uppercase font-semibold">SECTOR</h5>
            <h5 className="font-dmSans text-cyan text-base uppercase font-semibold">KEY QUOTE</h5>
          </div>
          <div className="flex flex-col gap-6">
            {
              [1,2,3,4].map(i => <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarDays className="text-white w-4 h-4"/>
                  <span className="text-white font-dmSans text-sm">Infrastructure</span>
                </div>
                <span className="text-white font-dmSans text-sm">We are removing every barrier except excellence.”</span>
              </div>)
            }
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-lexend text-white">
            <span>Showing</span>
            <span>1 to 5 of 120</span>
            <span>deals</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="w-6 h-6 border border-white rounded-lg flex items-center justify-center">
              {" "}
              <ChevronsLeft className="text-white w-4 h-4" />
            </button>
            <button className="w-6 h-6 border border-white rounded-lg flex items-center justify-center">
              <ChevronsRight className="text-white w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="border border-white/55 rounded-2xl p-5 md:px-7.5 flex flex-col gap-6">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h5 className="font-dmSans text-cyan text-base uppercase font-semibold">SECTOR</h5>
            <h5 className="font-dmSans text-cyan text-base uppercase font-semibold">RESOLUTION / OUTCOME</h5>
          </div>
          <div className="flex flex-col gap-6">
            {
              [1,2,3,4].map(i => <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarDays className="text-white w-4 h-4"/>
                  <span className="text-white font-dmSans text-sm">Infrastructure</span>
                </div>
                <span className="text-white font-dmSans text-sm">Launch portal by September</span>
              </div>)
            }
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-lexend text-white">
            <span>Showing</span>
            <span>1 to 5 of 120</span>
            <span>deals</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="w-6 h-6 border border-white rounded-lg flex items-center justify-center">
              {" "}
              <ChevronsLeft className="text-white w-4 h-4" />
            </button>
            <button className="w-6 h-6 border border-white rounded-lg flex items-center justify-center">
              <ChevronsRight className="text-white w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default DeepDive;

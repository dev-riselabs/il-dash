import { useState } from "react";
import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Ellipsis,
  Pencil,
  Search,
  Star,
  Trash,
} from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import {
  useFeedback,
  useFeedbackKpis,
  useDeleteFeedback,
} from "@/lib/api/hooks";
import { fmtDateTime, fmtNumber, fmtPercent } from "@/lib/api/format";
import { Link } from "react-router-dom";
import { DownloadModal } from "@/components/ui/DownloadModal";
import { DeleteConfirmationModal } from "@/components/ui/DeleteConfirmationModal";
import { FeedbackEditModal } from "@/components/ui/FeedbackEditModal";
import { exportFeedbackToExcel, exportFeedbackToPDF } from "@/lib/api/export";
import type { FeedbackSubmission } from "@/lib/api/types";

const PER_PAGE = 10;
const SENTIMENTS = ["", "positive", "neutral", "negative"] as const;

function AudienceFeedback() {
  const [page, setPage] = useState(1);
  const [sentiment, setSentiment] = useState<(typeof SENTIMENTS)[number]>("");
  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackSubmission | null>(null);

  const kpisQ = useFeedbackKpis();
  const { data, isLoading, isError, error } = useFeedback({
    page,
    per_page: PER_PAGE,
    sentiment_label: sentiment || undefined,
  });
  const deleteMutation = useDeleteFeedback();

  const rows = data?.data ?? [];
  const k = kpisQ.data;
  const positivePct =
    k && k.total_submissions > 0
      ? (k.positive_count / k.total_submissions) * 100
      : 0;

  function handleActiveDropdown(id: number | null) {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }

  const handleDeleteClick = (feedback: FeedbackSubmission) => {
    setSelectedFeedback(feedback);
    setDeleteOpen(true);
    setActiveDropdown(null);
  };

  const handleEditClick = (feedback: FeedbackSubmission) => {
    setSelectedFeedback(feedback);
    setEditOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedFeedback) {
      await deleteMutation.mutateAsync(selectedFeedback.id);
      setDeleteOpen(false);
      setSelectedFeedback(null);
    }
  };

  const handleDownload = async (format: "excel" | "pdf") => {
    if (format === "excel") {
      await exportFeedbackToExcel(rows);
    } else if (format === "pdf") {
      await exportFeedbackToPDF(rows);
    }
  };
  return (
    <section onClick={() => handleActiveDropdown(null)} className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Audience Feedback
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            View and manage all audience feedback for the summit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-white rounded-md p-2 flex items-center gap-2 min-w-50 sm:min-w-70">
            <Search className="w-4 h-4 text-white shrink-0" />
            <input
              type="search"
              placeholder="Search feedback..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1 bg-transparent"
              name=""
              // id=""
              // placeholder="Search names of attendees..."
              // className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1"
            />
          </div>
          <select
            value={sentiment}
            onChange={(e) => {
              setPage(1);
              setSentiment(e.target.value as (typeof SENTIMENTS)[number]);
            }}
            className="bg-blue950 text-white text-xs font-lexend rounded-xl px-3 h-10"
          >
            {SENTIMENTS.map((s) => (
              <option key={s || "all"} value={s}>
                {s ? s.toUpperCase() : "ALL"}
              </option>
            ))}
          </select>
          <button
            onClick={() => setDownloadOpen(true)}
            className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0 hover:bg-blue-900 transition-colors"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
          <Link
            to="/feedback-form"
            className="bg-white text-black text-sm font-medium rounded-lg py-2.5 px-6 flex items-center justify-center shrink-0"
          >
            Create
          </Link>
        </div>
      </section>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Submissions",
            value: fmtNumber(k?.total_submissions ?? 0),
          },
          {
            label: "Average Rating",
            value: `${(k?.avg_rating ?? 0).toFixed(1)} / 5`,
          },
          { label: "Positive", value: fmtPercent(positivePct, 1) },
          { label: "Negative", value: fmtNumber(k?.negative_count ?? 0) },
        ].map((c) => (
          <div
            key={c.label}
            className="border border-white/40 rounded-xl p-4 flex flex-col gap-1"
          >
            <span className="text-xs text-white/70 font-dmSans uppercase">
              {c.label}
            </span>
            <span className="text-white text-xl font-semibold font-dmSans">
              {kpisQ.isLoading ? "…" : c.value}
            </span>
          </div>
        ))}
      </div>

      <section className="flex flex-col gap-10 border border-white rounded-2xl py-6 px-4 lg:p-6">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-7 gap-10 font-dmSans">
            <h6 className="text-cyan text-base font-semibold flex items-center gap-2 col-span-2 uppercase">
              TIMESTAMP <CalendarDays className="text-white w-3 h-3" />
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              SESSION
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
              Key Takeaway / Review
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Sentiment
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Rating
            </h6>
          </div>
          <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error as { message?: string } | null}
            isEmpty={rows.length === 0}
            emptyLabel="No feedback yet."
          >
            <div className="flex flex-col gap-6">
              {rows.map((f) => (
                <div
                  key={f.id}
                  className="grid grid-cols-7 gap-10 font-dmSans items-center"
                >
                  <div className="flex items-center gap-2 text-white text-sm col-span-2 font-dmSans">
                    <CalendarDays className="text-white w-3 h-3" />
                    {fmtDateTime(f.submitted_at)}
                  </div>
                  <span className="text-white text-sm col-span-1 truncate">
                    {f.session?.title ?? "—"}
                  </span>
                  <span className="text-white text-sm col-span-2 truncate">
                    {f.key_takeaway ?? f.review_text ?? "—"}
                  </span>
                  <span
                    className={`text-xs col-span-1 uppercase rounded px-2 py-1 inline-flex justify-center font-medium ${
                      f.sentiment_label === "positive"
                        ? "bg-green450 text-green350"
                        : f.sentiment_label === "negative"
                          ? "bg-red200 text-red100"
                          : "bg-blue500 text-white"
                    }`}
                  >
                    {f.sentiment_label ?? "—"}
                  </span>
                  <div
                    
                    className="relative flex items-center justify-between gap-2 text-white text-sm col-span-1 font-dmSans"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow400" />
                      {f.star_rating}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActiveDropdown(f.id);
                      }}
                      className="cursor-pointer"
                    >
                      <Ellipsis className="text-white w-5 h-5" />
                    </button>

                    {activeDropdown === f.id && (
                      <div className="flex flex-col gap-5 bg-white z-10 absolute top-6 right-0 p-3 rounded-md">
                        <button
                          onClick={() => handleEditClick(f)}
                          className="flex items-center gap-1.5 text-black font-dmSans text-xs hover:opacity-70"
                        >
                          <Pencil className="w-4 h-4 text-black" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(f)}
                          className="flex items-center gap-1.5 text-red font-dmSans text-xs hover:opacity-70"
                        >
                          <Trash className="w-4 h-4 text-red" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-lexend text-white">
            <span>Showing</span>
            <span>
              {data?.from ?? 0} to {data?.to ?? 0} of {data?.total ?? 0}
            </span>
            <span>responses</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="w-6 h-6 border border-white rounded-lg flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsLeft className="text-white w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setPage((p) => (data ? Math.min(data.last_page, p + 1) : p + 1))
              }
              disabled={!data || page >= (data?.last_page ?? 1)}
              className="w-6 h-6 border border-white rounded-lg flex items-center justify-center disabled:opacity-40"
            >
              <ChevronsRight className="text-white w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <DownloadModal
        isOpen={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        title="Feedback"
        onDownload={handleDownload}
      />

      <DeleteConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Feedback"
        message={`Are you sure you want to delete this feedback? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />

      {selectedFeedback && (
        <FeedbackEditModal
          isOpen={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedFeedback(null);
          }}
          feedback={selectedFeedback}
        />
      )}
    </section>
  );
}

export default AudienceFeedback;

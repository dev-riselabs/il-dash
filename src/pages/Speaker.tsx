import { useState } from "react";
import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Ellipsis,
  Pencil,
  Search,
  Trash,
} from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import { useSpeakers, useDeleteSpeaker } from "@/lib/api/hooks";
import { fmtDateTime } from "@/lib/api/format";
import { Link } from "react-router-dom";
import { DownloadModal } from "@/components/ui/DownloadModal";
import { DeleteConfirmationModal } from "@/components/ui/DeleteConfirmationModal";
import { SpeakerEditModal } from "@/components/ui/SpeakerEditModal";
import { exportSpeakersToExcel, exportSpeakersToPDF } from "@/lib/api/export";
import type { Speaker } from "@/lib/api/types";

const PER_PAGE = 10;

function SpeakerPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const { data, isLoading, isError, error } = useSpeakers({
    page,
    per_page: PER_PAGE,
    search: search.trim() || undefined,
  });

  const deleteMutation = useDeleteSpeaker();

  const rows = data?.data ?? [];

  function handleActiveDropdown(id: number | null) {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }

  const handleDeleteClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setDeleteOpen(true);
    setActiveDropdown(null);
  };

  const handleEditClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setEditOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedSpeaker) {
      await deleteMutation.mutateAsync(selectedSpeaker.id);
      setDeleteOpen(false);
      setSelectedSpeaker(null);
    }
  };

  const handleDownload = async (format: "excel" | "pdf") => {
    if (format === "excel") {
      await exportSpeakersToExcel(rows);
    } else if (format === "pdf") {
      await exportSpeakersToPDF(rows);
    }
  };

  return (
    <section className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Speakers
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            View and manage all speakers for the summit
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="border border-white rounded-md p-2 flex items-center gap-2 min-w-50 sm:min-w-70">
            <Search className="w-4 h-4 text-white shrink-0" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by name, organization, job title..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1 bg-transparent"
            />
          </div>
          <button
            onClick={() => setDownloadOpen(true)}
            className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0 hover:bg-blue-900 transition-colors"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
          <Link
            to="/speaker-form"
            className="bg-white text-black text-sm font-medium rounded-lg py-2.5 px-6 flex items-center justify-center shrink-0 hover:bg-gray-100 transition-colors"
          >
            Create
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-10 border border-white rounded-2xl py-6 px-4 lg:p-6">
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-8 min-w-200">
            <div className="grid grid-cols-7 gap-10 font-dmSans">
              <h6 className="text-cyan text-base font-semibold flex items-center gap-2 col-span-2 uppercase">
                ADDED <CalendarDays className="text-white w-3 h-3" />
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
                FIRST NAME
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
                LAST NAME
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
                Organization
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
                JOB TITLE
              </h6>
            </div>
            <QueryState
              isLoading={isLoading}
              isError={isError}
              error={error as { message?: string } | null}
              isEmpty={rows.length === 0}
              emptyLabel="No speakers match your filters."
            >
              <div className="flex flex-col gap-6">
                {rows.map((s) => (
                  <div
                    key={s.id}
                    className="grid grid-cols-7 gap-10 font-dmSans"
                  >
                    <div className="flex items-center gap-2 text-white text-sm col-span-2 font-dmSans">
                      <CalendarDays className="text-white w-3 h-3" />
                      <span>{fmtDateTime(s.created_at)}</span>
                    </div>
                    <span className="text-white text-sm col-span-1">
                      {s.first_name}
                    </span>
                    <span className="text-white text-sm col-span-1">
                      {s.last_name}
                    </span>
                    <span className="text-white text-sm col-span-1 truncate">
                      {s.organization ?? "—"}
                    </span>
                    <div
                      onClick={() => handleActiveDropdown(null)}
                      className="relative flex items-center justify-between gap-2 text-white text-sm col-span-2 font-dmSans"
                    >
                      <span className="truncate">{s.job_title ?? "—"}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActiveDropdown(s.id);
                        }}
                        className="cursor-pointer"
                      >
                        <Ellipsis className="text-white w-5 h-5" />
                      </button>

                      {activeDropdown === s.id && (
                        <div className="flex flex-col gap-5 bg-white z-10 absolute top-6 right-0 p-3 rounded-md shadow-lg">
                          <button
                            onClick={() => handleEditClick(s)}
                            className="flex items-center gap-1.5 text-black font-dmSans text-xs hover:text-blue-600 transition-colors"
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(s)}
                            className="flex items-center gap-1.5 text-red font-dmSans text-xs hover:text-red-700 transition-colors"
                          >
                            <Trash className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </QueryState>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-lexend text-white">
            <span>Showing</span>
            <span>
              {data?.from ?? 0} to {data?.to ?? 0} of {data?.total ?? 0}
            </span>
            <span>speakers</span>
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
        title="Speakers"
        onDownload={handleDownload}
      />

      <DeleteConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Speaker"
        message={`Are you sure you want to delete ${selectedSpeaker?.first_name} ${selectedSpeaker?.last_name}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />

      {selectedSpeaker && (
        <SpeakerEditModal
          isOpen={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedSpeaker(null);
          }}
          speaker={selectedSpeaker}
        />
      )}
    </section>
  );
}

export default SpeakerPage;

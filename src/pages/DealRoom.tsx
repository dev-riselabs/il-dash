import { useState } from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  Download,
  Ellipsis,
  Pencil,
  Search,
  Trash,
} from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import { useDeals, useDeleteDeal } from "@/lib/api/hooks";
import { Link } from "react-router-dom";
import { DownloadModal } from "@/components/ui/DownloadModal";
import { DeleteConfirmationModal } from "@/components/ui/DeleteConfirmationModal";
import type { Deal } from "@/lib/api/types";

const PER_PAGE = 10;

function DealRoom() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<string | undefined>(undefined);
  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const { data, isLoading, isError, error } = useDeals({
    page,
    per_page: PER_PAGE,
    stage: stage,
  });

  const deleteMutation = useDeleteDeal();
  const rows = data?.data ?? [];

  function handleActiveDropdown(id: number | null) {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }

  const handleDeleteClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setDeleteOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedDeal) {
      try {
        await deleteMutation.mutateAsync(selectedDeal.id);
        // Add a small delay to allow React Query to complete the refetch
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDeleteOpen(false);
        setSelectedDeal(null);
      } catch (error) {
        console.error("Failed to delete deal:", error);
      }
    }
  };

  const handleDownload = async (format: "excel") => {
    if (format === "excel") {
      // TODO: Implement Excel export for deals
      console.log("Download deals as:", format);
    }
  };

  const stageColors = {
    discussion: "bg-blue500",
    negotiation: "bg-yellow500",
    commitment: "bg-purple500",
    closed_won: "bg-green500",
    closed_lost: "bg-red500",
  };

  const stageLabels = {
    discussion: "Discussion",
    negotiation: "Negotiation",
    commitment: "Commitment",
    closed_won: "Closed Won",
    closed_lost: "Closed Lost",
  };

  return (
    <section onClick={() => handleActiveDropdown(null)} className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Deal Room
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            View and manage all deal room records from the summit.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="border border-white rounded-md p-2 flex items-center gap-2 min-w-50 sm:min-w-70">
            <Search className="w-4 h-4 text-white shrink-0" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search deals..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1 bg-transparent"
            />
          </div>
          <select
            value={stage || ""}
            onChange={(e) => {
              setPage(1);
              setStage(e.target.value || undefined);
            }}
            className="bg-blue950 border border-white text-white rounded-md p-2 text-xs outline-none"
          >
            <option value="">All Stages</option>
            <option value="discussion">Discussion</option>
            <option value="negotiation">Negotiation</option>
            <option value="commitment">Commitment</option>
            <option value="closed_won">Closed Won</option>
            <option value="closed_lost">Closed Lost</option>
          </select>
          <button
            onClick={() => setDownloadOpen(true)}
            className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0 hover:bg-blue-900 transition-colors"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
          <Link
            to="/deal-room-form"
            className="bg-white text-black text-sm font-medium rounded-lg py-2.5 px-6 flex items-center justify-center shrink-0"
          >
            Create
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-10 border border-white rounded-2xl py-6 px-4 lg:p-6">
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-8 min-w-200">
            <div className="grid grid-cols-8 gap-4 font-dmSans">
              <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
                Deal Title
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
                Sector
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
                Investor
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
                Stage
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
                Value (₦)
              </h6>
              <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
                Actions
              </h6>
            </div>
            <QueryState
              isLoading={isLoading}
              isError={isError}
              error={error as { message?: string } | null}
              isEmpty={rows.length === 0}
              emptyLabel="No deals found."
            >
              <div className="flex flex-col gap-6">
                {rows.map((deal) => (
                  <div
                    key={deal.id}
                    className="grid grid-cols-8 gap-4 font-dmSans items-center"
                  >
                    <div className="col-span-2">
                      <span className="text-white text-sm font-medium truncate">
                        {deal.title}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-white text-sm">
                        {deal.sector?.name ?? "—"}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span className="text-white text-sm truncate">
                        {deal.investor_name ?? "—"}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span
                        className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${stageColors[deal.stage as keyof typeof stageColors]}`}
                      >
                        {stageLabels[deal.stage as keyof typeof stageLabels]}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-white text-sm">
                        {deal.value_naira
                          ? deal.value_naira.toLocaleString()
                          : "—"}
                      </span>
                    </div>
                    <div className="relative col-span-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActiveDropdown(deal.id);
                        }}
                        className="cursor-pointer"
                      >
                        <Ellipsis className="text-white w-5 h-5" />
                      </button>

                      {activeDropdown === deal.id && (
                        <div className="flex flex-col gap-3 bg-white z-10 absolute top-6 right-0 p-2 rounded-md min-w-max">
                          <Link
                            to={`/dealroom/${deal.id}`}
                            onClick={() => handleActiveDropdown(null)}
                            className="flex items-center gap-1.5 text-black font-dmSans text-xs hover:opacity-70 px-2 py-1"
                          >
                            <Pencil className="w-4 h-4 text-black" /> Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(deal)}
                            className="flex items-center gap-1.5 text-red font-dmSans text-xs hover:opacity-70 px-2 py-1"
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
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-lexend text-white">
            <span>Showing</span>
            <span>
              {data?.from ?? 0} to {data?.to ?? 0} of {data?.total ?? 0}
            </span>
            <span>deals</span>
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
        title="Deals"
        onDownload={handleDownload}
      />

      <DeleteConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Deal"
        message={`Are you sure you want to delete "${selectedDeal?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />
    </section>
  );
}

export default DealRoom;

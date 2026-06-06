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
import { useState } from "react";
import { Link } from "react-router-dom";

import { QueryState } from "@/components/ui/QueryState";
import { useEventsList, useDeleteEvent } from "@/lib/api/hooks";
import { fmtDateTime } from "@/lib/api/format";
import { DownloadModal } from "@/components/ui/DownloadModal";
import { DeleteConfirmationModal } from "@/components/ui/DeleteConfirmationModal";
import { EventEditModal } from "@/components/ui/EventEditModal";
import { EventDayManagementFullModal } from "@/components/ui/EventDayManagementFullModal";
import { exportEventsToExcel } from "@/lib/api/export";
import type { Event, EventStatus } from "@/lib/api/types";

const PER_PAGE = 10;
const STATUSES: ("" | EventStatus)[] = [
  "",
  "upcoming",
  "live",
  "completed",
  "cancelled",
];

function EventPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | EventStatus>("");
  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [eventDaysManagementOpen, setEventDaysManagementOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { data, isLoading, isError, error } = useEventsList({
    page,
    per_page: PER_PAGE,
    search: search.trim() || undefined,
    status: status || undefined,
  });

  const deleteMutation = useDeleteEvent();

  function handleActiveDropdown(id: number | null) {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setDeleteOpen(true);
    setActiveDropdown(null);
  };

  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    setEditOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEvent) {
      await deleteMutation.mutateAsync(selectedEvent.id);
      setDeleteOpen(false);
      setSelectedEvent(null);
    }
  };

  const handleDownload = async (format: "excel") => {
    if (format === "excel") {
      await exportEventsToExcel(rows);
    }
  };

  const rows = data?.data ?? [];

  return (
    <section onClick={() => handleActiveDropdown(null)} className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Events
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            View and manage all events for the summit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-white rounded-md p-2 flex items-center gap-2 min-w-50 sm:min-w-70">
            <Search className="w-4 h-4 text-white shrink-0" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by name, location..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1 bg-transparent"
            />
          </div>
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value as "" | EventStatus);
            }}
            className="bg-blue950 text-white text-xs font-lexend rounded-xl px-3 h-10"
          >
            {STATUSES.map((s) => (
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
          <button
            onClick={() => setEventDaysManagementOpen(true)}
            className="bg-blue950 text-white text-sm font-medium rounded-lg py-2.5 px-4 hover:bg-blue-900 transition-colors"
          >
            Event Days
          </button>
          <Link
            to="/event-form"
            className="bg-white text-black text-sm font-medium rounded-lg py-2.5 px-6 flex items-center justify-center shrink-0"
          >
            Create
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-10 border border-white rounded-2xl py-6 px-4 lg:p-6">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-6 gap-10 font-dmSans">
            <h6 className="text-cyan text-base font-semibold flex items-center gap-2 col-span-1 uppercase">
              STARTS AT <CalendarDays className="text-white w-3 h-3" />
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
              EVENT NAME
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Location
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Ends At
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Status
            </h6>
          </div>
          <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error as { message?: string } | null}
            isEmpty={rows.length === 0}
            emptyLabel="No events match your filters."
          >
            <div className="flex flex-col gap-6">
              {rows.map((e) => (
                <div
                  key={e.id}
                  className="grid grid-cols-6 gap-10 font-dmSans items-center"
                >
                  <div className="flex items-center gap-2 text-white text-sm col-span-1 font-dmSans">
                    <CalendarDays className="text-white w-3 h-3" />
                    <span>{fmtDateTime(e.starts_at)}</span>
                  </div>
                  <span className="text-white text-sm col-span-2 truncate">
                    {e.name}
                  </span>
                  <span className="text-white text-sm col-span-1 truncate">
                    {e.location ?? "—"}
                  </span>
                  <span className="text-white text-sm col-span-1 truncate">
                    {fmtDateTime(e.ends_at)}
                  </span>
                  <div className="relative flex items-center justify-between gap-2 text-white text-sm col-span-1 font-dmSans">
                    <span
                      className={`text-xs col-span-1 uppercase rounded px-2 py-1 inline-flex justify-center font-medium ${
                        e.status === "live"
                          ? "bg-green450 text-green350 border border-green350"
                          : e.status === "cancelled"
                            ? "bg-red200 text-red100 border border-red100"
                            : e.status === "completed"
                              ? "bg-blue300 text-blue400 border border-blue400"
                              : "bg-blue500 text-white border border-slate400"
                      }`}
                    >
                      {e.status ?? "—"}
                    </span>

                    <button
                      onClick={(evt) => {
                        evt.stopPropagation();
                        handleActiveDropdown(e.id);
                      }}
                      className="cursor-pointer"
                    >
                      <Ellipsis className="text-white w-5 h-5" />
                    </button>

                    {activeDropdown === e.id && (
                      <div className="flex flex-col gap-5 bg-white z-10 absolute top-6 right-0 p-3 rounded-md">
                        <button
                          onClick={() => handleEditClick(e)}
                          className="flex items-center gap-1.5 text-black font-dmSans text-xs hover:opacity-70"
                        >
                          <Pencil className="w-4 h-4 text-black" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(e)}
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
            <span>events</span>
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
        title="Events"
        onDownload={handleDownload}
      />

      <DeleteConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Event"
        message={`Are you sure you want to delete "${selectedEvent?.name}"? This will also delete its sessions and event days. This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />

      {selectedEvent && (
        <EventEditModal
          isOpen={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
        />
      )}

      <EventDayManagementFullModal
        isOpen={eventDaysManagementOpen}
        onClose={() => setEventDaysManagementOpen(false)}
      />
    </section>
  );
}

export default EventPage;

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Ellipsis,
  Pencil,
  Search,
  Trash,
} from "lucide-react";

import { QueryState } from "@/components/ui/QueryState";
import { useAttendees, useCheckInAttendee, useDeleteAttendee } from "@/lib/api/hooks";
import { fmtDateTime } from "@/lib/api/format";
import { Link } from "react-router-dom";
import { DownloadModal } from "@/components/ui/DownloadModal";
import { DeleteConfirmationModal } from "@/components/ui/DeleteConfirmationModal";
import { AttendeeEditModal } from "@/components/ui/AttendeeEditModal";
import { exportAttendeesToExcel, exportAttendeesToPDF } from "@/lib/api/export";
import type { Attendee } from "@/lib/api/types";

const PER_PAGE = 10;

function Attendance() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [checkedInOnly, setCheckedInOnly] = useState<boolean | undefined>(
    undefined,
  );
  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);

  const { data, isLoading, isError, error } = useAttendees({
    page,
    per_page: PER_PAGE,
    search: search.trim() || undefined,
    checked_in: checkedInOnly,
  });

  const checkIn = useCheckInAttendee();
  const deleteMutation = useDeleteAttendee();
  const rows = data?.data ?? [];

  function handleActiveDropdown(id: number | null) {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }

  const handleDeleteClick = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setDeleteOpen(true);
    setActiveDropdown(null);
  };

  const handleEditClick = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setEditOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedAttendee) {
      await deleteMutation.mutateAsync(selectedAttendee.id);
      setDeleteOpen(false);
      setSelectedAttendee(null);
    }
  };

  const handleDownload = async (format: 'excel' | 'pdf') => {
    if (format === 'excel') {
      await exportAttendeesToExcel(rows);
    } else if (format === 'pdf') {
      await exportAttendeesToPDF(rows);
    }
  };

  return (
    <section onClick={() => handleActiveDropdown(null)}  className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Attendance
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            View and manage all attendance records from the summit.
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
              placeholder="Search names of attendees..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1 bg-transparent"
            />
          </div>
          <button
            onClick={() => {
              setPage(1);
              setCheckedInOnly((v) =>
                v === undefined ? true : v === true ? false : undefined,
              );
            }}
            title={
              checkedInOnly === true
                ? "Showing: checked-in"
                : checkedInOnly === false
                  ? "Showing: not checked-in"
                  : "Showing: all"
            }
            className={`rounded-xl w-10 h-10 flex items-center justify-center shrink-0 ${
              checkedInOnly === undefined ? "bg-blue950" : "bg-cyan"
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={() => setDownloadOpen(true)}
            className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0 hover:bg-blue-900 transition-colors"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
          <Link
            to="/attendee-form"
            className="bg-white text-black text-sm font-medium rounded-lg py-2.5 px-6 flex items-center justify-center shrink-0"
          >
            Create
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-10 border border-white rounded-2xl py-6 px-4 lg:p-6">
        <div className="overflow-x-auto">
        <div className="flex flex-col gap-8 min-w-200">
          <div className="grid grid-cols-8 gap-10 font-dmSans">
            <h6 className="text-cyan text-base font-semibold flex items-center gap-2 col-span-2 uppercase">
              CHECKED IN <CalendarDays className="text-white w-3 h-3" />
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              FIRST NAME
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              LAST NAME
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
              Email Address
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
            emptyLabel="No attendees match your filters."
          >
            <div className="flex flex-col gap-6">
              {rows.map((a) => (
                <div key={a.id} className="grid grid-cols-7 gap-10 font-dmSans">
                  <div className="flex items-center gap-2 text-white text-sm col-span-2 font-dmSans">
                    {a.checked_in_at ? (
                      <>
                        <CheckCircle2 className="text-green100 w-4 h-4 shrink-0" />
                        <span>{fmtDateTime(a.checked_in_at)}</span>
                      </>
                    ) : (
                      <button
                        onClick={() => checkIn.mutate(a.id)}
                        disabled={checkIn.isPending}
                        className="text-cyan underline text-xs"
                      >
                        Check in
                      </button>
                    )}
                  </div>
                  <span className="text-white text-sm col-span-1">
                    {a.first_name}
                  </span>
                  <span className="text-white text-sm col-span-1">
                    {a.last_name}
                  </span>
                  <span className="text-white text-sm col-span-1 truncate">
                    {a.email ?? "—"}
                  </span>
                  <div className="relative flex items-center justify-between gap-2 text-white text-sm col-span-2 font-dmSans">
                    <span className="truncate">{a.job_title ?? "—"}</span>
                    <button
                      onClick={(e) => {  e.stopPropagation(); handleActiveDropdown(a.id)}}
                      className="cursor-pointer"
                    >
                      <Ellipsis className="text-white w-5 h-5" />
                    </button>

                    {activeDropdown === a.id && (
                      <div className="flex flex-col gap-5 bg-white z-10 absolute top-6 right-0 p-3 rounded-md">
                        <button
                          onClick={() => handleEditClick(a)}
                          className="flex items-center gap-1.5 text-black font-dmSans text-xs hover:opacity-70"
                        >
                          <Pencil className="w-4 h-4 text-black" /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(a)}
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
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-lexend text-white">
            <span>Showing</span>
            <span>
              {data?.from ?? 0} to {data?.to ?? 0} of {data?.total ?? 0}
            </span>
            <span>attendees</span>
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
        title="Attendees"
        onDownload={handleDownload}
      />

      <DeleteConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Attendee"
        message={`Are you sure you want to delete ${selectedAttendee?.first_name} ${selectedAttendee?.last_name}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
      />

      {selectedAttendee && (
        <AttendeeEditModal
          isOpen={editOpen}
          onClose={() => {
            setEditOpen(false);
            setSelectedAttendee(null);
          }}
          attendee={selectedAttendee}
        />
      )}
    </section>
  );
}

export default Attendance;

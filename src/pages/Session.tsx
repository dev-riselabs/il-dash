import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Search,
} from "lucide-react";

function Session() {
  return (
    <section className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Session
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            View and manage all session for the summit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-white rounded-md p-2 flex items-center gap-2 min-w-70">
            <Search className="w-4 h-4 text-white shrink-0" />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search names of attendees..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1"
            />
          </div>
          <button className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-white" />
          </button>
          <button className="bg-white text-black text-sm font-medium rounded-lg py-2.5 px-6 flex items-center justify-center shrink-0">
            Create
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-10 border border-white rounded-2xl py-6 px-4 lg:p-6">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-7 gap-10 font-dmSans">
            <h6 className="text-cyan text-base font-semibold flex items-center gap-2 col-span-2 uppercase">
              TIMESTAMP <CalendarDays className="text-white w-3 h-3" />
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              SESSION NAME
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Speaker Name
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-1 uppercase">
              Sector
            </h6>
            <h6 className="text-cyan text-base font-semibold col-span-2 uppercase">
              Key Insight #1
            </h6>
          </div>
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="grid grid-cols-7 gap-10 font-dmSans">
                <div className="flex items-center gap-2 text-white text-sm col-span-2 font-dmSans">
                  <CalendarDays className="text-white w-3 h-3" />7 May, 2026,
                  17:08:12
                </div>
                <span className="text-white text-sm col-span-1">Session 1</span>
                <span className="text-white text-sm col-span-1">
                  Dr. Musa Obi
                </span>
                <span className="text-white text-sm col-span-1">Tech</span>
                <span className="text-white text-sm col-span-2">
                  Program development
                </span>
              </div>
            ))}
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

export default Session;

import SentimentDivideChart from "@/components/SentimentDivideChart";
import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  EllipsisVertical,
  Funnel,
  Search,
} from "lucide-react";

function DeepDive() {
  return (
    <section className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Deep Drive
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
              name=""
              id=""
              placeholder="Search names of attendees..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1"
            />
          </div>
          <button className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
            <Funnel className="w-5 h-5 text-white" />
          </button>
          <button className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
            <EllipsisVertical className="w-5 h-5 text-white" />
          </button>
        </div>
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

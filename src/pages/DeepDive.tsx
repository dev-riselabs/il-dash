import SentimentDivideChart from "@/components/SentimentDivideChart"
import { EllipsisVertical, Funnel, Search } from "lucide-react"


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

      <SentimentDivideChart/>
      </section>
  )
}

export default DeepDive
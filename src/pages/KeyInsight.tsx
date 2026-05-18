import { ChevronLeft, ChevronRight, Lightbulb, Quote, Search } from "lucide-react";

function KeyInsight() {
  return (
    <section className="space-y-6">
      <section className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2">
          <h1 className="text-white text-2xl font-semibold font-lexend">
            Key Insights & Quotes
          </h1>
          <p className="text-white font-lexend font-light text-xs">
            Explore key insights and powerful quotes shaping our direction.
          </p>
        </div>

        <div className="border border-white rounded-md p-2 flex items-center gap-2 min-w-70">
          <Search className="w-4 h-4 text-white shrink-0" />
          <input
            type="search"
            name=""
            id=""
            placeholder="Session Name"
            className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1,2,3].map(i =><div key={i} className="flex flex-col rounded-xl border border-white/15 bg-neutral300 divide-y divide-white/15">
         <div className="px-5 lg:px-7.5 py-5 flex flex-col gap-12">
            <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-white"/>
                </div>
                <h3 className="text-blue font-semibold text-2xl font-lexend relative after:content-[''] after:w-12 after:absolute after:h-0.75 after:bg-blue after:-bottom-4 after:left-0">Key Insight #1</h3>
            </div>
            <div className="flex flex-col gap-5">
                {
                    [1,2,3].map(i => <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-cyan rounded-full"></div>
                        <p className="text-white font-dmSans text-sm">New irrigation partnerships</p>
                    </div>)
                }
            </div>
         </div>
         <div className="p-4 flex gap-3 items-center justify-end">
            <div className="flex items-center gap-1 font-dmSans text-white text-sm">
                1 - 32 / 32
            </div>
            <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-neutral400 rounded-lg">
                    <ChevronLeft className="text-white w-4 h-4"/>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-neutral400 rounded-lg">
                    <ChevronRight className="text-white w-4 h-4"/>
                </button>
            </div>
         </div>
        </div>)}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {
            [1,2].map(i => <div key={i} className="flex flex-col rounded-xl border border-white/15 bg-neutral300 divide-y divide-white/15">
                <div className="px-5 lg:px-7.5 py-5 flex flex-col gap-12">
            <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-white"/>
                </div>
                <h3 className="text-blue font-semibold text-2xl font-lexend relative after:content-[''] after:w-12 after:absolute after:h-0.75 after:bg-blue after:-bottom-4 after:left-0">Key Insight #1</h3>
            </div>
            <div className="flex flex-col gap-5">
                {
                    [1,2,3].map(i => <div key={i} className="flex items-center gap-2 border-l-2 border-l-cyan p-4">
                        <p className="text-white font-dmSans text-sm">New irrigation partnerships</p>
                    </div>)
                }
            </div>
         </div>
         <div className="p-4 flex gap-3 items-center justify-end">
            <div className="flex items-center gap-1 font-dmSans text-white text-sm">
                1 - 32 / 32
            </div>
            <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-neutral400 rounded-lg">
                    <ChevronLeft className="text-white w-4 h-4"/>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-neutral400 rounded-lg">
                    <ChevronRight className="text-white w-4 h-4"/>
                </button>
            </div>
         </div>
            </div>)
        }
      </section>
    </section>
  );
}

export default KeyInsight;

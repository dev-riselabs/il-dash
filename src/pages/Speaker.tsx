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

function Speaker() {

  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);
  
    function handleActiveDropdown(id: number | null){
      setActiveDropdown(prev => prev === id ? null : id)
    }

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
              name=""
              id=""
              placeholder="Search names of attendees..."
              className="text-white placeholder:text-white/70 text-xs font-lexend outline-none flex-1"
            />
          </div>
          <button className="bg-blue950 rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-white" />
          </button>
          <Link to='/speaker-form' className="bg-white text-black text-sm font-medium rounded-lg py-2.5 px-6 flex items-center justify-center shrink-0">
            Create
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-10 border border-white rounded-2xl py-6 px-4 lg:p-6">
        <div className="overflow-x-auto">
        <div className="flex flex-col gap-8 min-w-200">

          <div className="grid grid-cols-7 gap-10 font-dmSans">
            <h6 className="text-cyan text-base font-semibold flex items-center gap-2 col-span-2 uppercase">
              TIMESTAMP <CalendarDays className="text-white w-3 h-3" />
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
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="grid grid-cols-7 gap-10 font-dmSans">
                <div className="flex items-center gap-2 text-white text-sm col-span-2 font-dmSans">
                  <CalendarDays className="text-white w-3 h-3" />7 May, 2026,
                  17:08:12
                </div>
                <span className="text-white text-sm col-span-1">Nneka</span>
                <span className="text-white text-sm col-span-1">Eze</span>
                <span className="text-white text-sm col-span-1">
                  All on Investment
                </span>
                <div onClick={()=> handleActiveDropdown(null)} className="relative flex items-center justify-between gap-2 text-white text-sm col-span-2 font-dmSans">
                  Medical Doctor
                  <button onClick={(e) => {
                        e.stopPropagation();
                        handleActiveDropdown(i);
                      }} className="cursor-pointer">
                    <Ellipsis className="text-white w-5 h-5" />
                  </button>

                  {activeDropdown === i  && <div className="flex flex-col gap-5 bg-white z-10 absolute top-6 right-0 p-3 rounded-md">
                    <Link to='/speaker-form' className="flex items-center gap-1.5 text-black font-dmSans text-xs"><Pencil className="w-4 h-4 text-black"/> Edit</Link>
                    <button className="flex items-center gap-1.5 text-red font-dmSans text-xs"><Trash className="w-4 h-4 text-red"/> Delete</button>
                  </div>}
                </div>
              </div>
            ))}
          </div>
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

export default Speaker;

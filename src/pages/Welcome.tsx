
function Welcome() {
  return (
    <div>
        <section className="bg-hero px-20 pt-15 flex flex-col gap-10">
            <div className="flex flex-col gap-6 items-center">
                <div className="border border-pink text-white uppercase text-sm font-inter rounded-full py-2 px-4 font-medium">
                    Real-Time Tracking Platform for High-Level Events
                </div>
            </div>

            <img src="/screenshot-hero.png" alt="" className=" rounded-t-3xl"/>
        </section>
    </div>
  )
}

export default Welcome
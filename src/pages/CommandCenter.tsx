import { BadgeCheck, ChartNoAxesColumn, CircleArrowUp, Download, Ellipsis, Heart, MessageCircle, Repeat2 } from "lucide-react"

const kpis = [
  { label: 'Total Attendance', value: '2,842', delta: 'vs Yesterday' },
  { label: 'Sessions Today', value: '18', delta: '2 Live Now' },
  { label: 'Deals in Motion', value: '47', delta: '8 New' },
  { label: 'Investment Signals', value: '32', delta: '6 New' },
  { label: 'Commitments Made', value: '15', delta: '3 New' },
]

const tweets = [
    {name: 'TechCabal', username: '@TechCabal', img: '/techcabal.png', tweet: 'Hug turnout at #InvestLagos3.0! Lagos is clearly open for business.', time: '1:27PM', createdAt: 'Oct 4 2022', likes: '3,987', retweet: '5,579', comments: '1,240', impression: '1.1M'},
    {name: 'Channels TV', username: '@channelstv', img: '/channels.png', tweet: 'Invest Lagos 3.0 driving real conversations and real investments.', time: '1:27PM', createdAt: 'Oct 4 2022', likes: '3,987', retweet: '5,579', comments: '1,240', impression: '1.1M'},
    {name: 'BusinessDay NG', username: '@BusinessDayNg', img: '/businessday.png', tweet: 'N50M+ investment interest recorded across key sectors.', time: '1:27PM', createdAt: 'Oct 4 2022', likes: '3,987', retweet: '5,579', comments: '1,240', impression: '1.1M'},
]

function CommandCenter() {
  return (
    <section className="space-y-6">
        <div className='space-y-2'>
        <h1 className='text-white text-2xl font-semibold font-lexend'>COMMAND CENTRE</h1>
        <p className='text-white font-lexend font-light text-xs'>Real-time monitoring and Operational Control </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4 gap-y-3">
        {kpis.map(({ label, value, delta }, idx) => (
          <div key={label} className="border border-white/30 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white tracking-wider font-dmSans">{label}</div>
                <div className={`text-3xl font-medium font-dmSans  mt-2 tabular-nums ${
                  idx === 0 ? 'text-cyan' :
                  idx === 1 ? 'text-green' :
                  idx === 2 ? 'text-orange' : 
                  idx === 3 ? 'text-yellow' : 
                  idx === 4 ? 'text-white' : 
                  'text-white'
                }`}>{value}</div>
              </div>
              <div className="w-16 h-16">
                <img src="/Chart-icon.png" alt="" />
              </div>
            </div>
            <div className="text-xs text-white font-dmSans flex items-center gap-2 mt-auto"><CircleArrowUp color='white' width={'20px'} /> {delta}</div>
          </div>
        ))}
      </div>

      <section className="border border-white/55 rounded-2xl py-5 px-7.5 flex flex-col gap-6 ">
      <div className='flex items-center justify-between gap-3'>
                          <h4 className='text-white font-medium uppercase text-base font-lexend'>SOCIAL MEDIA LIVE FEED</h4>
                          <button className='text-cyan font-semibold font-lexend text-base'>View all</button>
       </div>

       <div className="flex flex-col gap-5">
        {
            tweets.map(({name, username, img, tweet, likes, retweet, impression, comments, time, createdAt}) => <div key={name} className="border border-white/55 rounded-2xl px-4 py-4 pb-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-4">
                        <img src={img} alt="" className="w-14 h-14 rounded-full object-cover"/>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h5 className="text-white text-base font-bold font-inter">{name}</h5>
                                <BadgeCheck className="w-6 h-6 fill-blue"/>
                            </div>
                            
                            <h6 className="text-white text-xs font-inter">{username}</h6>
                        </div>
                    </div>
                    <button><Ellipsis className="text-white w-5"/></button>
                </div>

                <p className="text-white text-sm font-inter font-light">{tweet}</p>
                <div className="flex items-center gap-1">
                    <span className="text-white text-xs font-inter font-light">{time} .</span>
                    <span className="text-white text-xs font-inter font-light">{createdAt}.</span>
                </div>
                <div className="w-full h-px bg-white/70"></div>
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-white"/>
                        <span className="text-white text-sm font-inter">{comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Repeat2 className="w-4 h-4 text-white"/>
                        <span className="text-white text-sm font-inter">{retweet}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-white"/>
                        <span className="text-white text-sm font-inter">{likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ChartNoAxesColumn className="w-4 h-4 text-white"/>
                        <span className="text-white text-sm font-inter">{impression}</span>
                    </div>
                    <Download className="w-4 h-4 text-white"/>
                </div>

            </div>)
        }

       </div>

      </section>

    </section>  
  )
}

export default CommandCenter
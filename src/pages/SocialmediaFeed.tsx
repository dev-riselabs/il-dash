import { useState } from "react";
import { CalendarDays, CircleArrowUp, CircleCheck } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

import DonutChart from "@/components/Doughnut";
import MentionsChart from "@/components/SocialChart";
import { QueryState } from "@/components/ui/QueryState";
import {
  useSocialByPlatform,
  useSocialHashtags,
  useSocialKpis,
  useSocialMentions,
  useSocialSentimentBreakdown,
  useSocialThemes,
  useSocialTimeseries,
} from "@/lib/api/hooks";
import { fmtCompact, fmtNumber, fmtPercent } from "@/lib/api/format";

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  twitter: <FaXTwitter />,
  x: <FaXTwitter />,
  linkedin: <FaLinkedin />,
  facebook: <FaFacebook />,
  instagram: <FaSquareInstagram />,
  youtube: <FaYoutube />,
};

function SocialmediaFeed() {
  const [platform, setPlatform] = useState<string>("");

  const kpisQ = useSocialKpis();
  const tsQ = useSocialTimeseries(7, platform || undefined);
  const sentimentQ = useSocialSentimentBreakdown();
  const byPlatformQ = useSocialByPlatform();
  const themesQ = useSocialThemes();
  const hashtagsQ = useSocialHashtags();
  const mentionsQ = useSocialMentions({
    platform: platform || undefined,
    per_page: 10,
  });

  const k = kpisQ.data;
  const kpis = [
    { label: "Total Mentions", value: fmtNumber(k?.total_mentions ?? 0) },
    {
      label: "Positive Sentiment",
      value: fmtPercent(k?.positive_pct ?? 0, 0),
    },
    { label: "Total Reach", value: fmtCompact(k?.total_reach ?? 0) },
    {
      label: "Total Impressions",
      value: fmtCompact(k?.total_impressions ?? 0),
    },
    {
      label: "Tracked Platforms",
      value: fmtNumber(byPlatformQ.data?.length ?? 0),
    },
  ];

  const totalPlatformMentions = Math.max(
    1,
    (byPlatformQ.data ?? []).reduce((s, r) => s + r.count, 0),
  );
  const platformRows = (byPlatformQ.data ?? []).map((row) => {
    const pctOfMax = Math.round((row.count / totalPlatformMentions) * 100);
    return {
      key: row.platform,
      icon: PLATFORM_ICONS[row.platform.toLowerCase()] ?? (
        <span className="text-xs">{row.platform.slice(0, 2)}</span>
      ),
      count: row.count,
      pct: pctOfMax,
    };
  });

  const sentimentColors: Record<string, string> = {
    positive: "#13A13E",
    neutral: "#7E89AC",
    negative: "#F6001A",
  };
  const sentimentDonut = (sentimentQ.data ?? []).map((row) => ({
    label:
      row.sentiment_label.charAt(0).toUpperCase() + row.sentiment_label.slice(1),
    value: row.count,
    color: sentimentColors[row.sentiment_label.toLowerCase()] ?? "#CB3CFF",
  }));

  const additions = (themesQ.data ?? []).slice(0, 5).map((t) => ({
    title: t.name,
    value: fmtNumber(t.mention_count),
  }));

  const hashtags = (hashtagsQ.data ?? []).slice(0, 5).map((h) => ({
    title: h.tag.startsWith("#") ? h.tag : `#${h.tag}`,
    value: fmtNumber(h.mention_count),
  }));

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-white text-xl sm:text-2xl font-semibold font-lexend">
          SOCIAL MEDIA FEED
        </h1>
        <p className="text-white font-lexend font-light text-xs">
          Real-time social media mentions, trends and engagement around Invest
          Lagos 3.0
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-3">
        {kpis.map(({ label, value }, idx) => (
          <div
            key={label}
            className="border border-white/30 rounded-xl p-4 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-white tracking-wider font-dmSans">
                  {label}
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-medium font-dmSans  mt-2 tabular-nums ${
                    idx === 0
                      ? "text-cyan"
                      : idx === 1
                        ? "text-green"
                        : idx === 2
                          ? "text-orange"
                          : idx === 3
                            ? "text-yellow"
                            : "text-white"
                  }`}
                >
                  {kpisQ.isLoading ? "…" : value}
                </div>
              </div>
              <div className="w-16 h-16">
                <img src="/Chart-icon.png" alt="" />
              </div>
            </div>
            <div className="text-xs text-white font-dmSans flex items-center gap-2 mt-auto">
              <CircleArrowUp color="white" width={"20px"} /> Live
            </div>
          </div>
        ))}
      </div>

      <div className="flex md:items-center gap-4 sm:gap-8 flex-wrap">
        <div className="border border-white/55 rounded py-2.5 px-2.5 flex items-center gap-1">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="text-white font-lexend text-xs bg-transparent"
          >
            <option value="">All Platforms</option>
            {(byPlatformQ.data ?? []).map((p) => (
              <option key={p.platform} value={p.platform} className="text-black">
                {p.platform}
              </option>
            ))}
          </select>
        </div>

        <div className="border border-white/55 rounded py-1 px-2.5 flex items-center gap-1">
          <CalendarDays className="text-white w-4" />
          <span className="text-white font-lexend text-xs">Last 7 days</span>
        </div>
      </div>

      <QueryState
        isLoading={tsQ.isLoading}
        isError={tsQ.isError}
        error={tsQ.error as { message?: string } | null}
        isEmpty={(tsQ.data ?? []).length === 0}
        emptyLabel="No mentions captured yet."
      >
        <MentionsChart points={tsQ.data} />
      </QueryState>

      <section className="border border-white/55 rounded-2xl px-5 sm:px-7.5 py-5 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            LIVE MENTIONS FEED
          </h4>
          <span className="text-white/55 font-lexend text-xs">
            {fmtNumber(mentionsQ.data?.total ?? 0)} total
          </span>
        </div>
        <QueryState
          isLoading={mentionsQ.isLoading}
          isError={mentionsQ.isError}
          error={mentionsQ.error as { message?: string } | null}
          isEmpty={(mentionsQ.data?.data ?? []).length === 0}
          emptyLabel="No mentions yet."
        >
          <ul className="flex flex-col divide-y divide-white/10">
            {(mentionsQ.data?.data ?? []).map((m) => {
              const icon = PLATFORM_ICONS[m.platform.toLowerCase()] ?? (
                <span className="text-xs">{m.platform.slice(0, 2)}</span>
              );
              const sentimentBadge =
                m.sentiment_label &&
                (sentimentColors[m.sentiment_label.toLowerCase()] ?? "#7E89AC");
              return (
                <li key={m.id} className="py-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-white/80 font-lexend text-xs">
                      <span className="font-semibold">
                        {m.author_name ?? m.author_handle}
                      </span>
                      <span className="text-white/40">@{m.author_handle}</span>
                      <span className="text-white/40">
                        · {new Date(m.posted_at).toLocaleString()}
                      </span>
                      {sentimentBadge && (
                        <span
                          className="ml-auto rounded-full px-2 py-0.5 text-[10px] text-white capitalize"
                          style={{ backgroundColor: sentimentBadge }}
                        >
                          {m.sentiment_label}
                        </span>
                      )}
                    </div>
                    <p className="text-white font-lexend text-sm mt-1 break-words">
                      {m.body}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-white/55 font-lexend text-xs tabular-nums">
                      <span>♥ {fmtNumber(m.likes)}</span>
                      <span>💬 {fmtNumber(m.comments)}</span>
                      <span>↻ {fmtNumber(m.shares)}</span>
                      <span>👁 {fmtCompact(m.reach)}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </QueryState>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 md:col-span-5 ">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            SENTIMENT BREAKDOWN
          </h4>
          <QueryState
            isLoading={sentimentQ.isLoading}
            isError={sentimentQ.isError}
            error={sentimentQ.error as { message?: string } | null}
            isEmpty={sentimentDonut.length === 0}
            emptyLabel="No sentiment data yet."
          >
            <DonutChart small data={sentimentDonut} />
          </QueryState>
        </div>

        <div className="border border-white/55 rounded-2xl py-5 px-5 sm:px-7.5 flex flex-col gap-6 md:col-span-7">
          <h4 className="font-dmSans text-white font-medium text-sm sm:text-base uppercase">
            MENTIONS BY PLATFORM
          </h4>

          <QueryState
            isLoading={byPlatformQ.isLoading}
            isError={byPlatformQ.isError}
            error={byPlatformQ.error as { message?: string } | null}
            isEmpty={platformRows.length === 0}
            emptyLabel="No platform data yet."
          >
            <div className="flex flex-col gap-4">
              {platformRows.map(({ key, icon, count, pct }) => (
                <div
                  key={key}
                  className="grid grid-cols-12 gap-4 sm:gap-10 place-content-between"
                >
                  <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center col-span-2">
                    {icon}
                  </div>
                  <div className="col-span-8 flex items-center">
                    <div
                      className="rounded-full h-2.5 bg-green"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <p className="col-span-2 text-white font-dmSans text-sm flex items-center justify-end tabular-nums">
                    {fmtNumber(count)}
                  </p>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-2.5 flex flex-col gap-7.5 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white/55 font-medium uppercase text-sm sm:text-base font-lexend">
              TRENDING THEMES
            </h4>
            <span className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              Top {additions.length}
            </span>
          </div>
          <QueryState
            isLoading={themesQ.isLoading}
            isError={themesQ.isError}
            error={themesQ.error as { message?: string } | null}
            isEmpty={additions.length === 0}
            emptyLabel="No themes yet."
          >
            <div className="flex flex-col gap-6">
              {additions.map(({ title, value }) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 text-white/55 font-lexend text-sm">
                    <CircleCheck className="fill-green text-black " /> {title}
                  </div>
                  <div className="text-white/55 font-lexend text-sm tabular-nums">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>

        <div className="border border-white rounded-2xl px-5 sm:px-7.5 py-2.5 flex flex-col gap-7.5 lg:col-span-7">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white font-medium uppercase text-sm sm:text-base font-lexend">
              TRENDING HASHTAGS
            </h4>
            <span className="text-cyan font-semibold font-lexend text-sm sm:text-base">
              Top {hashtags.length}
            </span>
          </div>
          <QueryState
            isLoading={hashtagsQ.isLoading}
            isError={hashtagsQ.isError}
            error={hashtagsQ.error as { message?: string } | null}
            isEmpty={hashtags.length === 0}
            emptyLabel="No hashtags yet."
          >
            <div className="flex flex-col gap-6">
              {hashtags.map(({ title, value }) => (
                <div
                  key={title}
                  className="flex items-center justify-between gap-3"
                >
                  <div className=" text-white font-lexend text-sm"> {title}</div>
                  <div className="text-white font-lexend text-sm tabular-nums">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </QueryState>
        </div>
      </section>
    </section>
  );
}

export default SocialmediaFeed;

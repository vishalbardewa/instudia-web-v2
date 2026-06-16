import Image from "next/image";

export interface Fixture {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
      elapsed?: number;
    };
  };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}

export default function MatchCard({ data }: { data: Fixture }) {
  const date = new Date(data.fixture.date);
  const timeString = date.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }) + ' IST';
  const isLive = data.fixture.status.short === "1H" || data.fixture.status.short === "2H" || data.fixture.status.short === "HT";
  const isFinished = data.fixture.status.short === "FT" || data.fixture.status.short === "AET" || data.fixture.status.short === "PEN";

  return (
    <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-center text-xs text-slate-300 font-medium mb-3">
        <span>{timeString}</span>
        {isLive && (
          <span className="flex items-center text-red-400 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
            LIVE {data.fixture.status.elapsed}'
          </span>
        )}
        {isFinished && <span className="text-slate-400">FT</span>}
        {!isLive && !isFinished && <span>Upcoming</span>}
      </div>

      <div className="flex justify-between items-center w-full">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1">
          <Image src={data.teams.home.logo} alt={data.teams.home.name} width={40} height={40} className="object-contain drop-shadow-md" unoptimized />
          <span className="mt-2 text-sm font-semibold text-white text-center">{data.teams.home.name}</span>
        </div>

        {/* Score / vs */}
        <div className="flex-1 flex justify-center items-center">
          {(isLive || isFinished) ? (
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <span>{data.goals.home ?? 0}</span>
              <span className="text-slate-400">-</span>
              <span>{data.goals.away ?? 0}</span>
            </div>
          ) : (
            <span className="text-sm font-bold text-slate-400 px-3 py-1 bg-white/5 rounded-full">VS</span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1">
          <Image src={data.teams.away.logo} alt={data.teams.away.name} width={40} height={40} className="object-contain drop-shadow-md" unoptimized />
          <span className="mt-2 text-sm font-semibold text-white text-center">{data.teams.away.name}</span>
        </div>
      </div>
    </div>
  );
}

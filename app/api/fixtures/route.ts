import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  
  // If no API token is provided, return mock data
  if (!token) {
    console.log("No FOOTBALL_DATA_TOKEN found. Returning mock FIFA World Cup 2026 fixtures.");
    return NextResponse.json(getMockFixtures());
  }

  try {
    const today = new Date();
    const fromDate = today.toISOString().split('T')[0];
    
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);
    const toDate = twoDaysLater.toISOString().split('T')[0];

    // 'WC' is the competition code for FIFA World Cup on football-data.org
    const url = `https://api.football-data.org/v4/competitions/WC/matches?dateFrom=${fromDate}&dateTo=${toDate}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': token,
      },
      // Revalidate every 5 minutes during live matches
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("API error response:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Adapt football-data.org structure to our frontend Fixture structure
    const adaptedFixtures = (data.matches || []).map((match: any) => {
      // Convert status
      let shortStatus = "NS";
      if (match.status === "IN_PLAY" || match.status === "PAUSED") shortStatus = "1H";
      else if (match.status === "FINISHED") shortStatus = "FT";
      
      return {
        fixture: {
          id: match.id,
          date: match.utcDate,
          status: { short: shortStatus }
        },
        teams: {
          home: { name: match.homeTeam.name || "TBD", logo: match.homeTeam.crest || "/assets/images/placeholder-flag.png" },
          away: { name: match.awayTeam.name || "TBD", logo: match.awayTeam.crest || "/assets/images/placeholder-flag.png" }
        },
        goals: { 
          home: match.score?.fullTime?.home ?? null, 
          away: match.score?.fullTime?.away ?? null 
        }
      };
    });

    return NextResponse.json(adaptedFixtures);

  } catch (error) {
    console.error('Error fetching fixtures:', error);
    // Fallback to mock data if the API fails for any reason
    return NextResponse.json(getMockFixtures());
  }
}

function getMockFixtures() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);

  return [
    {
      fixture: {
        id: 1001,
        date: today.toISOString(),
        status: { short: "NS" }
      },
      teams: {
        home: { name: "USA", logo: "https://crests.football-data.org/776.svg" },
        away: { name: "England", logo: "https://crests.football-data.org/770.svg" }
      },
      goals: { home: null, away: null }
    },
    {
      fixture: {
        id: 1002,
        date: tomorrow.toISOString(),
        status: { short: "NS" }
      },
      teams: {
        home: { name: "Brazil", logo: "https://crests.football-data.org/764.svg" },
        away: { name: "France", logo: "https://crests.football-data.org/773.svg" }
      },
      goals: { home: null, away: null }
    },
    {
      fixture: {
        id: 1003,
        date: dayAfter.toISOString(),
        status: { short: "NS" }
      },
      teams: {
        home: { name: "Argentina", logo: "https://crests.football-data.org/762.svg" },
        away: { name: "Spain", logo: "https://crests.football-data.org/760.svg" }
      },
      goals: { home: null, away: null }
    }
  ];
}

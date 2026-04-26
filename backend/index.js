const http = require('http');
const url = require('url');

const champions = [
  { year: 1980, champion: 'Alan Jones' },
  { year: 1981, champion: 'Nelson Piquet' },
  { year: 1982, champion: 'Keke Rosberg' },
  { year: 1983, champion: 'Nelson Piquet' },
  { year: 1984, champion: 'Niki Lauda' },
  { year: 1985, champion: 'Alain Prost' },
  { year: 1986, champion: 'Alain Prost' },
  { year: 1987, champion: 'Nelson Piquet' },
  { year: 1988, champion: 'Ayrton Senna' },
  { year: 1989, champion: 'Alain Prost' },
  { year: 1990, champion: 'Ayrton Senna' },
  { year: 1991, champion: 'Ayrton Senna' },
  { year: 1992, champion: 'Nigel Mansell' },
  { year: 1993, champion: 'Alain Prost' },
  { year: 1994, champion: 'Michael Schumacher' },
  { year: 1995, champion: 'Michael Schumacher' },
  { year: 1996, champion: 'Damon Hill' },
  { year: 1997, champion: 'Jacques Villeneuve' },
  { year: 1998, champion: 'Mika Hakkinen' },
  { year: 1999, champion: 'Mika Hakkinen' },
  { year: 2000, champion: 'Michael Schumacher' },
  { year: 2001, champion: 'Michael Schumacher' },
  { year: 2002, champion: 'Michael Schumacher' },
  { year: 2003, champion: 'Michael Schumacher' },
  { year: 2004, champion: 'Michael Schumacher' },
  { year: 2005, champion: 'Fernando Alonso' },
  { year: 2006, champion: 'Fernando Alonso' },
  { year: 2007, champion: 'Kimi Raikkonen' },
  { year: 2008, champion: 'Lewis Hamilton' },
  { year: 2009, champion: 'Jenson Button' },
  { year: 2010, champion: 'Sebastian Vettel' },
  { year: 2011, champion: 'Sebastian Vettel' },
  { year: 2012, champion: 'Sebastian Vettel' },
  { year: 2013, champion: 'Sebastian Vettel' },
  { year: 2014, champion: 'Lewis Hamilton' },
  { year: 2015, champion: 'Lewis Hamilton' },
  { year: 2016, champion: 'Nico Rosberg' },
  { year: 2017, champion: 'Lewis Hamilton' },
  { year: 2018, champion: 'Lewis Hamilton' },
  { year: 2019, champion: 'Lewis Hamilton' },
  { year: 2020, champion: 'Lewis Hamilton' },
  { year: 2021, champion: 'Max Verstappen' },
  { year: 2022, champion: 'Max Verstappen' },
  { year: 2023, champion: 'Max Verstappen' },
  { year: 2024, champion: 'Max Verstappen' },
  { year: 2025, champion: 'Lando Norris' },
];

const championships = champions.map((item, index) => ({
  id: index + 1,
  year: item.year,
  season: `${item.year} Formula 1 World Championship`,
  champion: item.champion,
  // Legacy keys for existing frontend compatibility.
  race: `${item.year} Formula 1 World Championship`,
  winner: item.champion,
}));

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const parsed = url.parse(req.url, true);

  if (parsed.pathname === '/championships' || parsed.pathname === '/races') {
    res.writeHead(200);
    res.end(JSON.stringify(championships));
  } else if (parsed.pathname === '/champion' || parsed.pathname === '/winner') {
    const id = parseInt(parsed.query.id);
    const year = parseInt(parsed.query.year);
    const championship = Number.isNaN(id)
      ? championships.find((c) => c.year === year)
      : championships.find((c) => c.id === id);

    if (championship) {
      res.writeHead(200);
      res.end(JSON.stringify({ champion: championship.champion, winner: championship.winner }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Championship not found' }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(3000, () => {
  console.log('Backend running on port 3000');
});

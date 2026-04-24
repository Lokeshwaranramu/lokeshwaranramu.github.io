import { useEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import './TravelItineraryPage.css'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const baliDays = [
  {
    num: '01', title: 'Arrival — Sanur', sub: 'Bali Beach Heritage Collection',
    body: 'Morning flight Adelaide → Denpasar (direct, ~5 hrs, Jetstar/AirAsia). Pre-booked airport transfer to resort (~40 min). Settle in, welcome gift, afternoon dip in the resort pool. Sunset evening at resort with free-flow cocktails and canapes. Early night to beat jet lag.',
    tags: ['Arrival', 'Pool', 'Free cocktails'],
  },
  {
    num: '02', title: 'Sanur Beach Morning', sub: 'Sea Turtle Village · Beach walks',
    body: 'Early morning beach walk along the 4km stroller-friendly promenade at low tide — calm, reef-protected shallow water perfect for toddler paddling. After breakfast, walk to the sea turtle hatchery. Midday nap at resort. Afternoon: resort pool & kids club. Evening: nightly included dinner at Arunika restaurant, beachside.',
    tags: ['Beach', 'Turtles', 'Included dinner'],
  },
  {
    num: '03', title: 'Atlas Beach Club Day', sub: 'Included LE entry · Nusa Dua nearby',
    body: 'Use your included Atlas Beach Club entry (LE inclusion). Morning at resort beach & pools, then early afternoon transfer to Atlas Beach Club for toddler-friendly beach time, lagoon swimming, and afternoon cocktails. Return to resort for the included evening free-flow drinks and canapes session. Book your included massage at Taru Pramana Spa today.',
    tags: ['Beach club', 'Massage', 'Included entry'],
  },
  {
    num: '04', title: 'Ubud Day Trip', sub: 'Rice terraces · Tegenungan Waterfall · Bali Zoo',
    body: 'Pre-book a private driver for the day (~AUD $65–75). Drive north to Tegenungan Waterfall. Continue to Tegalalang Rice Terraces — early arrival for cool air and photos. Stop at Bali Pulina coffee plantation (free). Afternoon at Bali Zoo (under-2s free; toddler mini-train and Jungle Splash). Return to Sanur by 5pm for resort cocktail hour.',
    tags: ['Mountains', 'Waterfall', 'Bali Zoo', '~A$75 driver'],
  },
  {
    num: '05', title: 'Tropical Temptation Beach Club', sub: 'Included LE entry · Uluwatu cliff views',
    body: 'Morning resort yoga session (included in wellness program). Use your included Tropical Temptation Beach Club entry (Uluwatu) — stunning clifftop views, welcome cocktail included. Pre-book via the resort shuttle or Grab (~AUD $25 each way). Afternoon back at resort for pool time, then a final relaxed included dinner at roso restaurant for Indonesian specialities.',
    tags: ['Uluwatu cliffs', 'Beach club', 'Included entry'],
  },
  {
    num: '06', title: 'Departure Day', sub: 'Sindhu Market · CANNA Beach Club · Evening flight',
    body: 'Morning browse of Sindhu Night Market nearby (textiles, toys, snacks). Use remaining CANNA Bali Beach Club entry (Nusa Dua — welcome cocktail + ice cream treat for child!). Relaxed lunch. Resort transfer to Denpasar Airport (~40 min). Evening direct flight back to Adelaide.',
    tags: ['Market', 'CANNA Beach Club', 'Departure'],
  },
]

const nzDays = [
  {
    num: '01', title: 'Arrival — Christchurch', sub: 'Direct Air NZ flight · Oct–May seasonal',
    body: 'Direct Air New Zealand flight Adelaide → Christchurch (~4.5 hrs, available Oct–May 2026). Collect hire car from airport. Drive into Christchurch CBD — check in at centrally located hotel. Visit the Canterbury Museum (free, toddler-friendly). Evening at a local restaurant in the Riverside Market precinct.',
    tags: ['Arrival', 'Museum', 'City base'],
  },
  {
    num: '02', title: 'Christchurch → Lake Tekapo', sub: '3.5 hr scenic drive · Stargazing',
    body: 'Scenic 3.5-hour drive south through the Canterbury Plains. Stop at Rangitata Gorge viewpoint. Arrive Lake Tekapo — one of the world\'s clearest skies and a UNESCO Dark Sky Reserve. Afternoon walk along the lake shore with turquoise blue water. Evening: professional stargazing tour at Mt John Observatory (~AUD $60/adult, toddlers free).',
    tags: ['Lake views', 'Stargazing', 'Scenic drive'],
  },
  {
    num: '03', title: 'Lake Tekapo → Queenstown', sub: '3 hr drive · Lindis Pass · Cromwell fruit',
    body: 'Morning at Lake Tekapo — Church of the Good Shepherd and lupins (Nov–Jan) or golden landscape (other months). Drive via Lindis Pass — spectacular mountain scenery — stopping in Cromwell for fresh stone fruit and lunch. Arrive Queenstown early afternoon. Check in at Eichardt\'s Private Hotel (LE deal from AUD $1,994 for 2 nights). Evening nightly drinks and canapés at Eichardt\'s Bar.',
    tags: ['Lindis Pass', 'Mountains', 'Eichardt\'s'],
  },
  {
    num: '04', title: 'Queenstown Adventure Day', sub: 'Gondola · Kiwi Park · Lake cruise',
    body: 'After included breakfast at The Grille, walk 10 min to the Skyline Gondola for panoramic views over Lake Wakatipu and The Remarkables. Toddler-friendly Kiwi and Birdlife Park (~AUD $35 adult, under-5 free). Afternoon: TSS Earnslaw vintage steamship cruise on Lake Wakatipu (1 hr, ~AUD $55 adult). Use your included NZ$150 dining credit at Eichardt\'s Bar for a relaxed dinner.',
    tags: ['Gondola', 'Kiwis', 'Lake cruise', 'Dining credit'],
  },
  {
    num: '05', title: 'Glenorchy & Arrowtown', sub: 'Lakeside + historic gold town',
    body: 'Morning drive 45 min to Glenorchy — head of Lake Wakatipu, used in Lord of the Rings filming. Stunning mirror lake and mountain reflections. Return to Queenstown, then drive 20 min to Arrowtown — historic gold-rush village. Onsen Hot Pools (cedar tubs, mountain views, ~AUD $35/adult, under-4 free) as a family afternoon treat. Late checkout guaranteed from Eichardt\'s (noon).',
    tags: ['Glenorchy', 'LOTR scenery', 'Arrowtown', 'Onsen'],
  },
  {
    num: '06', title: 'Wanaka + Departure', sub: '1 hr from Queenstown · Alpine lake · Flight home',
    body: 'Morning scenic drive over Crown Range to Wanaka (1 hr) — smaller, calmer, equally stunning alpine lake town. Rippon Vineyard lawn walk, Puzzling World (toddler loves the silly faces!), lakeside stroll. Return to Queenstown or Christchurch for departure flight. Direct CHC-ADL runs twice weekly (Tue/Sat). Alternatively fly CHC → Melbourne → ADL.',
    tags: ['Wanaka', 'Crown Range', 'Departure'],
  },
]

const baliCompare = [
  { key: 'Hotel (LE deal)',       val: 'A$1,429',              big: true,  good: true  },
  { key: '5 nights includes',     val: 'Bkfst · Lunch/Dinner · Cocktails · Massage · Kids Club', good: true },
  { key: 'Flights (2 adults)',    val: '~A$800–$1,000',        good: true  },
  { key: "Child's ticket",        val: 'Lap infant free – ~A$400', good: true },
  { key: 'Daily extras',          val: '~A$50–$70/day',        good: true  },
  { key: 'Flight time',           val: '5 hr direct ✈',        good: true  },
  { key: 'Estimated total',       val: 'A$2,700–$3,100',       big: true,  good: true  },
  { key: 'Budget status',         val: '✓ Well within $4,000', good: true  },
]

const nzCompare = [
  { key: 'Hotel (LE deal)',       val: 'A$1,994',              big: true,  warn: true  },
  { key: '2 nights includes',     val: 'Bkfst · Dining credit · Drinks · Canapés · Facial', warn: true },
  { key: 'Flights (2 adults)',    val: '~A$1,000–$1,500',      warn: true  },
  { key: "Child's ticket",        val: 'Required ~A$500–$750', warn: true  },
  { key: 'Car hire + fuel',       val: '~A$100/day',           warn: true  },
  { key: 'Flight time',           val: '4.5 hr (direct seasonal)', warn: true },
  { key: 'Estimated total',       val: 'A$5,000–$7,500',       big: true,  warn: true  },
  { key: 'Budget status',         val: '⚠ Significantly over $4,000', warn: true },
]

const baliInclusions = [
  'Daily buffet breakfast at roso restaurant (6:30am–10:30am)',
  'Daily two-course lunch or dinner at roso or Arunika restaurant',
  'Two hours nightly free-flow cocktails & canapes',
  'One 60-min massage per adult at Taru Pramana Spa',
  'CANNA Bali Beach Club entry (welcome cocktail, canoe hire)',
  'Tropical Temptation Beach Club entry + cocktail',
  'Atlas Beach Club entry',
  'Daily Niskala Kids Club access (ages 4–10, 8am–7pm)',
  'Daily wellness activities (yoga, pilates, cycling)',
  '30% credit for spa treatments · 10% off resort activities',
  'Welcome gift upon arrival',
  'Airport transfers included in select packages',
]

const nzInclusions = [
  'Daily à la carte breakfast at Eichardt\'s Bar or The Grille',
  'NZ$150 dining credit per package (food only, excl. drinks)',
  'Nightly glass of wine or beer + canapes (5–6pm daily)',
  'Welcome bottle of wine and cheeseboard on arrival',
  'One 30-min manuka facial treatment per package',
  'Nightly turndown service with chocolates',
  'Guaranteed 12pm late checkout',
  'Valet car parking',
  'Stunning Lake Wakatipu views from suite balcony',
  'Access to The Well Spa (facial included, treatments extra)',
  '10-min walk to Skyline Gondola and town centre',
  '⚠ No airport transfers included — plan independently',
]

const baliBudget = [
  ['Bali Beach Sanur Heritage LE deal (5 nts, member)', 'A$1,429'],
  ['6th night (upgrade or independent Ubud villa)', 'A$120'],
  ['Return flights, 2 adults ADL→DPS (Jetstar/AirAsia)', '~A$850'],
  ["Child's flight (lap infant under 2 = small fee)", 'A$100–$400'],
  ['Indonesian e-VOA × 3 adults (~A$50 each)', 'A$150'],
  ['Bali tourist levy × 3', 'A$45'],
  ['Ubud private driver day trip', 'A$75'],
  ['Bali Zoo (2 adults, under-2 free)', 'A$65'],
  ['Beach club transport (Grab)', 'A$50'],
  ['Food extras & drinks beyond inclusions', 'A$200'],
  ['Travel insurance (family, medical evacuation)', 'A$150'],
  ['Contingency / souvenirs', 'A$150'],
]

const nzBudget = [
  ["Eichardt's Hotel LE deal (2 nts, member)", 'A$1,994'],
  ['Christchurch hotel (1 nt, mid-range)', 'A$280'],
  ['Lake Tekapo lodge (1 nt, mid-range)', 'A$320'],
  ['2 extra Queenstown nights (beyond LE 2-nt deal)', 'A$600'],
  ['Return flights, 2 adults ADL→CHC (Air NZ, direct)', '~A$1,000'],
  ["Child's seat (required age 2+)", 'A$500'],
  ['Car hire × 6 days (~A$85/day)', 'A$510'],
  ['Fuel (NZ petrol is expensive ~A$1.90/L)', 'A$180'],
  ['Food (eating out, groceries, 6 days)', 'A$700'],
  ['Activities (gondola, kiwi park, stargazing, onsen)', 'A$450'],
  ['Travel insurance (family)', 'A$150'],
  ['Contingency / souvenirs', 'A$200'],
]

export default function TravelItineraryPage() {
  useEffect(() => {
    document.title = 'Family Holiday — Bali vs New Zealand | Itinerary'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  return (
    <div className="ti-root">

      {/* ── HERO ── */}
      <div className="ti-hero">
        <div className="ti-hero-badge">Family of 3 · Adelaide · AUD $3,000–$4,000</div>
        <h1>Your Dream Holiday<br /><em>Two Worlds, One Decision</em></h1>
        <p className="ti-hero-sub">Complete Luxury Escapes itineraries for Bali &amp; New Zealand · 6 nights · 2 adults + 2-year-old</p>
        <div className="ti-hero-meta">
          {[
            { label: 'Duration',    value: '6 Nights'      },
            { label: 'Departure',   value: 'Adelaide ADL'  },
            { label: 'Best Window', value: 'May or Sept'   },
            { label: 'Travellers',  value: '2A + Toddler'  },
          ].map(({ label, value }) => (
            <div className="ti-hero-meta-item" key={label}>
              <div className="label">{label}</div>
              <div className="value">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ti-container">

        {/* ── AT A GLANCE ── */}
        <div className="ti-section">
          <div className="ti-section-title">At a Glance</div>

          <FadeIn>
            <div className="ti-dest-headers">
              <div className="ti-dest-header bali">
                <span className="ti-dest-tag">Within Budget ✓</span>
                <div className="ti-dest-flag">🇮🇩</div>
                <h2>Bali,<br />Indonesia</h2>
                <div className="ti-dest-sub">Sanur Beach + Ubud Hills · 6 nights</div>
                <div className="ti-dest-hotel">
                  <strong>Bali Beach Sanur: The Heritage Collection</strong>
                  5-star beachfront · Luxury Escapes deal active
                </div>
              </div>
              <div className="ti-dest-header nz">
                <span className="ti-dest-tag">Premium Option ↑</span>
                <div className="ti-dest-flag">🇳🇿</div>
                <h2>New Zealand<br />South Island</h2>
                <div className="ti-dest-sub">Queenstown + Lake Tekapo · 6 nights</div>
                <div className="ti-dest-hotel">
                  <strong>Eichardt's Private Hotel, Queenstown</strong>
                  Heritage lakefront boutique · Luxury Escapes deal active
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="ti-quick-compare">
              <div className="ti-compare-card bali-card">
                <div className="ti-compare-card-header">🇮🇩 Bali — Key Numbers</div>
                {baliCompare.map(({ key, val, big, good, warn }) => (
                  <div className="ti-compare-row" key={key}>
                    <span className="key">{key}</span>
                    <span className={`val${big ? ' big' : ''}${good ? ' good' : ''}${warn ? ' warn' : ''}`}>{val}</span>
                  </div>
                ))}
              </div>
              <div className="ti-compare-card nz-card">
                <div className="ti-compare-card-header">🇳🇿 New Zealand — Key Numbers</div>
                {nzCompare.map(({ key, val, big, good, warn }) => (
                  <div className="ti-compare-row" key={key}>
                    <span className="key">{key}</span>
                    <span className={`val${big ? ' big' : ''}${good ? ' good' : ''}${warn ? ' warn' : ''}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="ti-divider" />

        {/* ── INCLUSIONS ── */}
        <div className="ti-section">
          <div className="ti-section-title">Luxury Escapes Package Inclusions</div>
          <FadeIn>
            <div className="ti-inclusions-grid">
              <div className="ti-inclusions-card bali-inc">
                <h3>Bali Beach Sanur<br />The Heritage Collection</h3>
                <div className="ti-inc-hotel">5-star · Sanur beachfront · LE member deal (save 47%) · Valid until Dec 2026</div>
                <ul className="ti-inc-list">
                  {baliInclusions.map((item, i) => (
                    <li key={i}><span className="ti-inc-dot" />{item}</li>
                  ))}
                </ul>
                <div className="ti-inc-price-tag">A$1,429</div>
                <div className="ti-inc-price-label">5 nights (member) · valued at A$2,876 · Non-member A$1,499</div>
              </div>

              <div className="ti-inclusions-card nz-inc">
                <h3>Eichardt's Private Hotel<br />Queenstown</h3>
                <div className="ti-inc-hotel">Heritage boutique · Lakefront Queenstown · LE member deal (save 34%) · Valid until Jun 2026</div>
                <ul className="ti-inc-list">
                  {nzInclusions.map((item, i) => (
                    <li key={i}><span className="ti-inc-dot" />{item}</li>
                  ))}
                </ul>
                <div className="ti-inc-price-tag">A$1,994</div>
                <div className="ti-inc-price-label">2 nights (member) · valued at A$3,183 · Non-member A$2,099</div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="ti-divider" />

        {/* ── ITINERARY ── */}
        <div className="ti-section">
          <div className="ti-section-title">Day-by-Day Itinerary</div>
          <div className="ti-itinerary-grid">

            <div className="ti-itinerary-col">
              <div className="ti-col-header bali">🇮🇩 Bali — 6 Nights</div>
              {baliDays.map((day, i) => (
                <FadeIn key={day.num} delay={i * 0.04}>
                  <div className="ti-day-card bali-day">
                    <div className="ti-day-header">
                      <span className="ti-day-num">{day.num}</span>
                      <div>
                        <div className="ti-day-title">{day.title}</div>
                        <div className="ti-day-sub">{day.sub}</div>
                      </div>
                    </div>
                    <div className="ti-day-body">
                      <p>{day.body}</p>
                      <div className="ti-day-tags">
                        {day.tags.map(t => <span className="ti-day-tag" key={t}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="ti-itinerary-col">
              <div className="ti-col-header nz">🇳🇿 New Zealand — 6 Nights</div>
              {nzDays.map((day, i) => (
                <FadeIn key={day.num} delay={i * 0.04}>
                  <div className="ti-day-card nz-day">
                    <div className="ti-day-header">
                      <span className="ti-day-num">{day.num}</span>
                      <div>
                        <div className="ti-day-title">{day.title}</div>
                        <div className="ti-day-sub">{day.sub}</div>
                      </div>
                    </div>
                    <div className="ti-day-body">
                      <p>{day.body}</p>
                      <div className="ti-day-tags">
                        {day.tags.map(t => <span className="ti-day-tag" key={t}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

          </div>
        </div>

        <div className="ti-divider" />

        {/* ── BUDGET ── */}
        <div className="ti-section">
          <div className="ti-section-title">Complete Budget Breakdown</div>
          <FadeIn>
            <div className="ti-budget-grid">

              <div className="ti-budget-card bali-budget">
                <div className="ti-budget-card-header">🇮🇩 Bali — Total Trip Cost</div>
                <div>
                  {baliBudget.map(([item, amount]) => (
                    <div className="ti-budget-row" key={item}>
                      <span className="item">{item}</span>
                      <span className="amount">{amount}</span>
                    </div>
                  ))}
                </div>
                <div className="ti-budget-total">
                  <span>Total estimated cost</span>
                  <span className="amount">~A$3,384</span>
                </div>
                <div className="ti-budget-note">✓ Within your A$4,000 budget · Hotel includes: all breakfasts, daily lunch/dinner, 2hrs free cocktails nightly, 60-min massage each, 3 beach club entries, kids club, wellness activities</div>
              </div>

              <div className="ti-budget-card nz-budget">
                <div className="ti-budget-card-header">🇳🇿 New Zealand — Total Trip Cost</div>
                <div>
                  {nzBudget.map(([item, amount]) => (
                    <div className="ti-budget-row" key={item}>
                      <span className="item">{item}</span>
                      <span className="amount">{amount}</span>
                    </div>
                  ))}
                </div>
                <div className="ti-budget-total">
                  <span>Total estimated cost</span>
                  <span className="amount">~A$6,884</span>
                </div>
                <div className="ti-budget-note">⚠ Significantly over your A$4,000 budget · Eichardt's is a premium boutique — mid-range NZ lodges still run A$200–350/night · NZ daily costs are similar to Australia</div>
              </div>

            </div>
          </FadeIn>
        </div>

        <div className="ti-divider" />

        {/* ── VERDICT ── */}
        <div className="ti-section">
          <div className="ti-section-title">Choose Your Holiday</div>
          <FadeIn>
            <div className="ti-verdict">
              <div className="ti-verdict-col">
                <h3><span>🇮🇩</span> Choose Bali if you want…</h3>
                <ul className="ti-verdict-list">
                  {[
                    'To stay within your A$3,000–$4,000 budget with money to spare',
                    'Maximum inclusions — nearly all meals, drinks, beach clubs & massages are covered',
                    'A direct 5-hour flight with no stressful connecting airports',
                    'Calm, reef-protected toddler beach at Sanur',
                    'Ubud rice terraces + waterfalls on a scenic day trip',
                    'Warm 28–32°C weather perfect for outdoor exploration',
                    'A culture that absolutely adores children — everywhere',
                    'Luxury for less — 5-star hotel, free cocktails & spa for A$1,429',
                  ].map(item => (
                    <li key={item}><span className="icon">✓</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="ti-verdict-col">
                <h3><span>🇳🇿</span> Choose NZ if you want…</h3>
                <ul className="ti-verdict-list">
                  {[
                    ['◆', 'Spectacular alpine scenery — Remarkables, Lake Tekapo, Milford Sound'],
                    ['◆', 'A passport-free, no-visa, familiar English-speaking destination'],
                    ['◆', 'No Bali Belly risk — world-class food hygiene standards'],
                    ['◆', 'Cool climate (great if hot weather isn\'t your thing)'],
                    ['◆', 'Eichardt\'s heritage boutique experience on Lake Wakatipu'],
                    ['△', 'Beaches are cold-water and limited in summer warmth'],
                    ['△', 'Costs approximately A$3,000–$3,500 more than the Bali trip'],
                    ['△', 'May need to increase budget to A$6,000–$7,500 to do it properly'],
                  ].map(([icon, item]) => (
                    <li key={item}><span className="icon">{icon}</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── BOOKING ── */}
        <FadeIn>
          <div className="ti-booking">
            <div className="ti-le-badge">🏨 Luxury Escapes · Australia</div>
            <h3>How to Book — Both Options</h3>
            <p className="ti-booking-sub">Both deals are live on Luxury Escapes AU. Book the hotel first, then add flights via the LE flights concierge.</p>
            <div className="ti-booking-grid">

              <div className="ti-booking-item">
                <h4>🇮🇩 Bali — Book Now <span className="ti-pill bali">Save 47%</span></h4>
                <div className="ti-booking-detail">
                  <strong>Bali Beach Sanur: The Heritage Collection</strong><br />
                  5 nights from <strong>A$1,429</strong> (member) · Valid until Dec 2026<br /><br />
                  🔗 <a href="https://luxuryescapes.com/au/offer/bali-beach-hotel-sanur-bali-indonesia-asia/006RF00000NyYJLYA3" target="_blank" rel="noopener noreferrer">View &amp; Book on Luxury Escapes AU →</a><br /><br />
                  For flights: Email <a href="mailto:sales@luxuryescapes.com">sales@luxuryescapes.com</a> or add at checkout.<br />
                  Target: Jetstar/AirAsia ADL–DPS direct, May or September 2026.
                </div>
              </div>

              <div className="ti-booking-item">
                <h4>🇳🇿 New Zealand — Book Now <span className="ti-pill nz">Save 34%</span></h4>
                <div className="ti-booking-detail">
                  <strong>Eichardt's Private Hotel, Queenstown</strong><br />
                  2 nights from <strong>A$1,994</strong> (member) · Valid until Jun 2026<br /><br />
                  🔗 <a href="https://luxuryescapes.com/au/offer/eichardts-private-hotel-queenstown-new-zealand/006RF00000IF8R8YAL" target="_blank" rel="noopener noreferrer">View &amp; Book on Luxury Escapes AU →</a><br /><br />
                  For flights: Air New Zealand ADL–CHC direct (Oct–May 2026, Tue &amp; Sat).<br />
                  ⚠ Budget for total trip cost of A$6,000–$7,500.
                </div>
              </div>

              <div className="ti-booking-item">
                <h4>💡 Budget Tip for New Zealand</h4>
                <div className="ti-booking-detail">
                  If you love New Zealand but want to stay within budget, skip Eichardt's and stay at <strong>Novotel Queenstown Lakeside</strong> or <strong>Heritage Queenstown</strong> (LE deals from ~A$200/night). Total trip cost drops to approximately <strong>A$4,800–$5,500</strong> — still over budget, but much closer. Consider NZ as your second trip in 12–18 months once you've saved more.
                </div>
              </div>

              <div className="ti-booking-item">
                <h4>🧒 Toddler Note (Important)</h4>
                <div className="ti-booking-detail">
                  <strong>Bali:</strong> If your daughter is under 24 months on travel date, she flies as a lap infant (small fee ~A$100–150). If she's turned 2, book her own seat (~A$400).<br /><br />
                  <strong>NZ:</strong> If she's 2 years old, she needs her own seat (~A$500). Car seat required for hire car — most companies provide for a fee (or bring your own, free to check on Jetstar).<br /><br />
                  Bali's Niskala Kids Club is ages 4+, so bring your own entertainment for the toddler during parents' spa time.
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

        <div className="ti-footer">
          Prices sourced directly from Luxury Escapes AU · April 2026 · All AUD · Confirm current availability at luxuryescapes.com/au
        </div>

      </div>
    </div>
  )
}

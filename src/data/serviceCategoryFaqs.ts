export interface RichFaqEntry {
  question: string;
  answer: string;
}

/**
 * Exactly 10 substantive, humanised FAQs for each of the 7 core service categories.
 * Every answer explains how our Mayfair desk actually works in practice, what the
 * client experiences, and clear honest boundaries with no invented claims or guarantees.
 */
export const SERVICE_CATEGORY_FAQS: Record<string, RichFaqEntry[]> = {
  'travel-aviation': [
    {
      question: 'Can you plan and manage an entire trip from a single message?',
      answer:
        'Yes — that is precisely how most members use us. Send a quick note with where you want to be, who is travelling and the feel you are after, and your Mayfair lifestyle manager will shape the whole journey end to end: flights, private transfers, suites or villas, dining tables and local plans, all gathered into one clear itinerary so you never have to juggle separate confirmations.',
    },
    {
      question: 'Do you arrange both private aircraft and commercial flights?',
      answer:
        'We look after both, depending on what makes the most sense for the route and your schedule. Private jets and helicopters are arranged through vetted, licensed independent operators, while commercial journeys can be paired with fast-track airport assistance, private terminal suites where available and waiting chauffeurs so the transition from kerb to cabin feels effortless.',
    },
    {
      question: 'What happens if my travel plans shift at the last minute?',
      answer:
        'Plans change all the time, and you should not have to spend an evening on hold with airlines or hotels when they do. Simply message or call your lifestyle manager, and we will re-time your aircraft or flights, adjust your waiting drivers, alert your hotel and shift dinner reservations in one coordinated sweep — keeping you updated clearly on any supplier change terms.',
    },
    {
      question: 'How do you source hotels, private villas and alpine chalets abroad?',
      answer:
        'We do not simply pull listings from public booking sites. We match properties to how you actually live — whether that means a quiet connecting family suite in Paris, a staffed coastal villa in the Mediterranean or a ski-in chalet in the Alps — checking recent condition, staff quality and privacy through trusted local partners before recommending clear options, always subject to availability.',
    },
    {
      question: 'Can you coordinate airport meet-and-greet and private transfers at both ends?',
      answer:
        'Yes. One of the easiest ways a trip unravels is in the gap between landing and reaching your door. We line up airside meet-and-greet assistance where available, luggage handling and vetted local chauffeurs who track your flight live, so whether you touch down early or late, someone familiar with your onward address is already waiting.',
    },
    {
      question: 'How does chartering a yacht work through TGLC?',
      answer:
        'We introduce you to established, licensed maritime brokers and help narrow the field to vessels whose layout, crew reputation and cruising grounds genuinely suit your party. Once a yacht is chosen, we coordinate the practical enjoyment around it — preferred provisioning, coastal restaurant tables, tender transfers and onward flights — with every charter term agreed transparently in writing.',
    },
    {
      question: 'Can you organise multi-stop journeys for families or larger private groups?',
      answer:
        'Yes, and group travel is where having one steady desk makes the biggest difference. We balance different flight arrivals, connecting rooms, child-friendly pacing, private guides and shared celebrations into a single calm schedule, ensuring everyone receives clear daily details without you having to play tour organiser for your own holiday.',
    },
    {
      question: 'Are you able to help with short-notice flights or sudden weekends away?',
      answer:
        'Often, yes. When a diary clears unexpectedly or an urgent meeting comes up abroad, tell us your timing and priorities straight away. We speak directly with operators and hotel teams to see what can realistically be secured, and we will always give you an honest view of availability and costs before confirming anything.',
    },
    {
      question: 'Do you keep my seating, cabin and hotel preferences on file?',
      answer:
        'We do. Once you tell us that you prefer a quiet high-floor room away from lifts, particular cabin catering, feather-free pillows or a specific seat on long-haul routes, those details stay quietly in your member profile. You never have to repeat the basics every time you step onto a plane or check into a new city.',
    },
    {
      question: 'Can my personal assistant or family office coordinate travel directly with you?',
      answer:
        'Of course. Many of our members prefer their assistant or family office to share dates, calendars and billing instructions directly with our Albemarle Street desk. We fit smoothly alongside your existing team so travel notes stay accurate, approvals stay clean and nothing falls between two inboxes.',
    },
  ],

  'dining-nightlife': [
    {
      question: 'How do you help secure sought-after London dining tables?',
      answer:
        'Rather than relying solely on public reservation portals, we draw on genuine day-to-day relationships with restaurant directors, maitre d’s and hospitality groups across Mayfair, St James’s, Soho and beyond. While no concierge can honestly promise a fully booked room on every night, we give you the strongest possible chance and always suggest an equally thoughtful alternative if a venue is genuinely full.',
    },
    {
      question: 'Can you organise private dining rooms for business or family celebrations?',
      answer:
        'Yes. A great private dinner comes down to the right room, lighting, acoustics and pacing — not just a big table behind a curtain. Tell us the occasion, guest count and mood you want, and we will shortlist fitting rooms, coordinate set menus, dietary needs and wine pairings with the venue team, and make sure arrivals run smoothly.',
    },
    {
      question: 'How do introductions to London private members’ clubs work?',
      answer:
        'Every established members’ club has its own committee, house rules and admission process, and we respect those standards completely. Where appropriate, we help you understand which clubs match your lifestyle, arrange private visits or hosted meals where permitted, and guide you calmly through the application or introduction route — subject always to each club’s own discretion.',
    },
    {
      question: 'Can you put together a full evening from pre-dinner drinks to late-night music?',
      answer:
        'Yes — and this is where a well-judged evening really shines. We can pair an early cocktail bar, a relaxed dinner table, theatre or a live jazz room, and a late-night venue that suits your crowd, with a waiting chauffeur bridging each stop so the night flows naturally without queues, guesswork or watching the clock.',
    },
    {
      question: 'Do you arrange dining and nightlife when I am travelling abroad?',
      answer:
        'We do. Whether you are heading to Paris, Milan, New York, Dubai or the Mediterranean coast, we arrange restaurant tables, beach clubs and evening plans through trusted local hosts and hospitality contacts. You arrive with a curated shortlist that matches your taste rather than taking chances on tourist-heavy recommendations.',
    },
    {
      question: 'Can you help find a memorable table at short notice on the day?',
      answer:
        'Often, yes. Last-minute cancellations happen regularly in London’s best dining rooms, and direct calls to the desk make all the difference. Let us know your neighbourhood, time window and the kind of atmosphere you want, and we will work the phones straight away and tell you candidly what we can secure.',
    },
    {
      question: 'Can you handle dietary requirements, sommelier guidance and celebratory touches?',
      answer:
        'Quiet preparation behind the scenes is what turns a good dinner into a memorable one. Before you arrive, we brief the kitchen on allergies or dietary preferences, speak with the sommelier if you have particular vintages in mind, and arrange understated floral or celebratory touches that feel thoughtful rather than theatrical.',
    },
    {
      question: 'Do you arrange private chefs and hospitality staff for dinners at home?',
      answer:
        'Yes. Sometimes the finest table in London is your own dining room. We introduce experienced private chefs, sommeliers and discreet waiting staff who can design a bespoke seasonal menu around your guests, manage all ingredients and service, and leave your kitchen spotless before they depart.',
    },
    {
      question: 'How are restaurant deposits, minimum spends and bills handled?',
      answer:
        'We keep billing completely transparent. Before we lock in any table, private dining room or club minimum spend, we confirm the venue’s deposit terms and cancellation window with you in writing. Where you prefer discreet settlement ahead of hosting guests or clients, we coordinate pre-authorisation directly with the restaurant so no bill ever interrupts the table.',
    },
    {
      question: 'What if we prefer low-key, understated rooms rather than high-profile scenes?',
      answer:
        'Many of our members feel exactly the same way. London is full of remarkable neighbourhood dining rooms, discreet hotel corners and private rooms where conversation comes first and nobody is looking over their shoulder. Tell us the tone you enjoy, and we will steer you toward places that feel genuinely comfortable.',
    },
  ],

  'experiences-culture': [
    {
      question: 'Can you arrange hospitality for major London sporting and cultural fixtures?',
      answer:
        'Yes. From summer tennis and racing to autumn rugby, opera nights and gallery previews, we advise on the best official hospitality options and seating areas well ahead of the season. Every allocation is subject to official venue availability, and early planning always gives us the widest choice of suites, boxes and dining packages.',
    },
    {
      question: 'Do you organise private art gallery viewings and specialist museum tours?',
      answer:
        'We do. Experiencing a collection with an engaging art historian or stepping into an independent Mayfair gallery outside busy hours transforms how you see a work. We arrange curator-led tours, private gallery introductions and tailored cultural afternoons in London and major European cities, subject to institutional schedules.',
    },
    {
      question: 'How does private shopping on Bond Street, Savile Row or Knightsbridge work?',
      answer:
        'Rather than navigating crowded shop floors, we book private viewing rooms and senior specialists ahead of your arrival. Whether you are commissioning a Savile Row suit, exploring fine jewellery or refreshing a seasonal wardrobe, pieces can be pre-selected to your brief and delivered quietly back to your home or hotel afterwards.',
    },
    {
      question: 'Can you help plan a milestone birthday, anniversary or private celebration?',
      answer:
        'Yes. Whether you envision an intimate candlelit dinner for twelve in a historic London vault or a weekend gathering in the English countryside, we bring together the venue, menu, music, flowers, transport and guest logistics into one calm plan — leaving you completely free to enjoy the people you invited.',
    },
    {
      question: 'Can you guarantee tickets to sold-out concerts, West End shows or finals?',
      answer:
        'We will never make a promise no one can honestly keep. For high-demand performances and fixtures, we work through official hospitality channels and trusted partners to find legitimate availability, and we always confirm exact seating, terms and pricing with you clearly before anything is committed.',
    },
    {
      question: 'Do you arrange thoughtful cultural and sporting experiences for families?',
      answer:
        'Very much so. We love creating days that engage children and teenagers without feeling like a standard tour — from behind-the-scenes museum workshops and private stadium visits to countryside outdoor days and theatre matinees paired with relaxed family lunches nearby.',
    },
    {
      question: 'How far in advance should I reach out for the British summer season?',
      answer:
        'For flagship moments like Royal Ascot, Wimbledon, Glyndebourne or Chelsea Flower Show, getting in touch several months ahead opens the strongest selection of hospitality, dining and chauffeurs. That said, if an invitation or free weekend comes up late, always ask — we check live availability quickly and tell you honestly where things stand.',
    },
    {
      question: 'Can you combine cultural or sporting access with chauffeurs and dining?',
      answer:
        'Yes, and coordinating the surrounding logistics is often what makes the day feel effortless. We align pick-up times with venue gates, arrange pre- or post-event dining nearby, and ensure your driver knows the smoothest collection point so you step straight out of the crowd and into a quiet car.',
    },
    {
      question: 'Do you arrange driving days, classic motoring or private motorsport hospitality?',
      answer:
        'We do. From heritage racing weekends like Goodwood and Monaco hospitality to curated classic car drives through the Cotswolds or private track instruction with seasoned drivers, we coordinate every element — vehicles, hospitality, accommodation and transfers — through vetted specialist partners.',
    },
    {
      question: 'Can you introduce independent stylists, art advisers or cultural specialists?',
      answer:
        'Yes. If you are building a collection, dressing for a major occasion or exploring a new artistic interest, we can introduce independent specialists whose judgement we trust. We stay involved to coordinate diaries and logistics while letting the specialist advise you directly and impartially.',
    },
  ],

  'residences-relocation': [
    {
      question: 'Are you estate agents, or how do you help with finding a London home?',
      answer:
        'We are not estate agents, and we never try to play one. Instead, we act as your discreet coordinator on the ground in Mayfair — clarifying what you want from a neighbourhood and property, introducing you to regulated buying agents, letting specialists and solicitors, and organising viewings and practical logistics around your schedule.',
    },
    {
      question: 'Can you help arrange a private move or family relocation to London?',
      answer:
        'Moving cities involves dozens of small, time-consuming details that quickly eat up your first months. We coordinate the practical side alongside your professional advisers: temporary serviced residences while you search, removals, utility and broadband setup, local registrations, neighbourhood orientation and household introductions so London feels like home far sooner.',
    },
    {
      question: 'Can you prepare my London home before I fly in from abroad?',
      answer:
        'Yes — this is one of the services international members value most. Before you land, we can arrange deep housekeeping, fresh flowers, fridge and pantry stocking to your exact list, laundry and pressing, temperature checks and any small maintenance tasks so you walk through the front door into a calm, welcoming home.',
    },
    {
      question: 'Do you coordinate ongoing household upkeep and trusted tradespeople?',
      answer:
        'Finding reliable specialists who respect both your home and your privacy is surprisingly hard. We maintain vetted contacts across fine decorators, AV and smart-home engineers, HVAC technicians, art hangers and maintenance teams, supervising access and schedules so work gets completed cleanly without disrupting your week.',
    },
    {
      question: 'Can you help source short-term residences or seasonal country estates?',
      answer:
        'Yes. Whether you need a private townhouse in Mayfair or Belgravia for a six-week summer stay or a staffed Cotswolds manor for an extended family holiday, we work with established letting specialists and private estate managers to present suitable homes, always subject to availability and clear written agreements.',
    },
    {
      question: 'Do you work alongside interior designers, architects and project managers?',
      answer:
        'We do. If you are refurbishing a London property or furnishing a new residence, we can introduce respected studios whose aesthetic fits yours, and coordinate deliveries, storage, site access and practical household transitions so the process stays orderly from initial concept to move-in day.',
    },
    {
      question: 'Can you look after a London residence while it is unoccupied?',
      answer:
        'Yes. Empty properties still need regular eyes on them. We can arrange scheduled key-holding visits, post collection, garden or terrace upkeep, security checks and utility oversight while you are overseas, giving you peace of mind that everything is quietly in order until your next stay.',
    },
    {
      question: 'How do you handle privacy and access for contractors entering my home?',
      answer:
        'Discretion is built into every visit. We work with vetted, long-standing suppliers, agree clear access windows in advance, share only the minimum details required for the job and ensure someone you trust — whether your house manager or our coordinated representative — oversees entry and sign-off.',
    },
    {
      question: 'Can you help with both London townhouses and weekend country homes?',
      answer:
        'Yes. Many members divide their week between central London and the Cotswolds, Sussex, Hampshire or Surrey. Having one point of contact who understands both households means weekend provisioning, chauffeurs, gardeners and seasonal maintenance stay effortlessly synchronised.',
    },
    {
      question: 'How are supplier quotes and household expenses approved?',
      answer:
        'Nothing is ever instructed behind your back. For any maintenance work, staffing placement or property service, we gather clear written quotes from the relevant specialist and agree the scope and cost with you — or your family office — before work begins.',
    },
  ],

  'transport-security': [
    {
      question: 'What kind of vehicles and chauffeurs can you arrange in London?',
      answer:
        'We arrange discreet, experienced London chauffeurs driving immaculately presented flagship saloons, luxury SUVs and spacious executive MPVs for families or luggage-heavy airport runs. Every driver knows central London entrances, private aviation terminals and quiet routing so your journeys feel unhurried and completely private.',
    },
    {
      question: 'Can I book a dedicated chauffeur on standby for a full day or evening?',
      answer:
        'Yes — and for busy London days, having a driver on standby is far calmer than booking separate point-to-point cars. Your chauffeur stays close by throughout meetings, shopping appointments or dinner and theatre plans, adjusting instantly if an evening runs late or you decide to make an extra stop.',
    },
    {
      question: 'Do you coordinate private airport transfers across Heathrow, Farnborough and Biggin Hill?',
      answer:
        'We cover all London commercial airports and private aviation FBOs, including Farnborough, Biggin Hill, RAF Northolt, Luton and Stansted. We monitor your flight live, coordinate tarmac or terminal collection protocols where permitted and ensure luggage and passenger capacity match your party comfortably.',
    },
    {
      question: 'How are executive protection and close-protection services provided?',
      answer:
        'Security services are provided by licensed independent specialists. Where you or your family require close protection, residential security or advance route reconnaissance, we introduce vetted, SIA-licensed professionals and coordinate discreetly alongside them so your safety blends smoothly into daily life without unnecessary visibility.',
    },
    {
      question: 'Can you coordinate multi-vehicle logistics for guests, roadshows or events?',
      answer:
        'Yes. When you are hosting visiting partners, family groups or an intense multi-stop schedule across London, timing matters down to the minute. We plan vehicle manifests, staggered pick-ups, venue drop-off permissions and live dispatch adjustments so every guest arrives together and on time.',
    },
    {
      question: 'Can you arrange private chauffeurs when I am travelling outside the UK?',
      answer:
        'We do. Through established transport partners in major European, US and Middle Eastern cities, we arrange trusted English-speaking drivers and comparable flagship vehicles ahead of your arrival, so you step off the plane into the same calm standard of ground transport you expect in London.',
    },
    {
      question: 'Can you help source a rare or bespoke vehicle to buy or hire?',
      answer:
        'Yes. Whether you want to hire a specific grand tourer for a European road trip or are looking to acquire a hard-to-find collector model, we introduce reputable marque specialists and private dealers, coordinate private viewings and transport, and keep the entire search completely confidential.',
    },
    {
      question: 'How do you support privacy-first travel for high-profile individuals or families?',
      answer:
        'Quiet foresight prevents almost every awkward moment. We coordinate discreet venue side entrances, private hotel check-ins where available, low-profile vehicle choices and advance arrival briefings with hosts and drivers, ensuring you can move around London and abroad with minimal attention.',
    },
    {
      question: 'Can chauffeurs accommodate children, car seats or family pets?',
      answer:
        'Certainly. Just let us know ages, seat preferences or if a dog is travelling with you, and we ensure the right vehicle configuration and properly fitted child seats are prepared before pick-up. Those preferences stay on file so you only need to tell us once.',
    },
    {
      question: 'How much notice do you need to arrange a chauffeur or security detail?',
      answer:
        'For day-to-day London chauffeurs, we can often assist even at short notice, subject to fleet availability. For multi-vehicle event logistics, international transfers or licensed close-protection briefings, giving us a few days’ notice allows specialists to conduct proper advance planning and route checks.',
    },
  ],

  'personal-private-office': [
    {
      question: 'How does TGLC work alongside my existing personal assistant or family office?',
      answer:
        'Think of us as an extension of your team rather than a replacement. Personal assistants and family offices often come to us for London-specific local access, complex travel coordination, private sourcing or household logistics that would otherwise absorb days of research — keeping communication seamless and reporting cleanly back to whoever you nominate.',
    },
    {
      question: 'What kind of everyday lifestyle tasks can I hand over to my lifestyle manager?',
      answer:
        'Anything that quietly drains your time. From diary and restaurant bookings, travel admin and personal shopping to coordinating household deliveries, tailoring fittings, milestone gifting and private appointments, you send one brief message and let our Mayfair desk handle the follow-ups.',
    },
    {
      question: 'Can you help find discreet household staff such as housekeepers, chefs or nannies?',
      answer:
        'Yes. Bringing someone into your home requires great care and judgement. We introduce respected, specialist domestic recruitment agencies who conduct thorough vetting and reference checks, and we help coordinate interviews, trials and onboarding around your household routine.',
    },
    {
      question: 'How do you support families looking into UK schools, tutors or universities?',
      answer:
        'We are not educational consultants ourselves, so we connect families with independent, well-regarded UK education advisers and private tutors who know the independent school and university landscape intimately. Alongside their advice, we arrange campus visits, travel and London stays so the process feels structured and calm.',
    },
    {
      question: 'Do you give medical advice or how do you help with private health and wellness?',
      answer:
        'We do not give medical advice; we help arrange appointments with qualified professionals. Whether you need a discreet introduction to a private Harley Street clinic, a visiting physiotherapist, a personal trainer at home or a restorative wellness retreat abroad, we handle scheduling and logistics quietly around your calendar.',
    },
    {
      question: 'Can you help with thoughtful personal gifting and remembering key family dates?',
      answer:
        'Yes — and it is one of the simplest ways to take pressure off a busy year. We can keep a quiet calendar of birthdays, anniversaries and seasonal thank-yous, suggest genuinely personal ideas tailored to the recipient, handle bespoke wrapping and hand-delivery in London, and never let an important date slip past.',
    },
    {
      question: 'Can other members of my family or household contact the desk directly?',
      answer:
        'Yes. Depending on how you structure your membership, your partner, adult children or trusted house manager can reach the desk directly within clear guidelines you set. Everyone receives the same attentive, discreet support without every small request having to pass through you first.',
    },
    {
      question: 'How do you handle sensitive personal information and household details?',
      answer:
        'Everything you share with us is treated in strict confidence. Access to member notes is restricted to the team directly looking after you, we share only the minimum information a supplier genuinely requires to fulfil a booking, and we never publish client names or discuss member arrangements.',
    },
    {
      question: 'Do you provide legal, tax or financial advisory services?',
      answer:
        'No — we stay strictly within our lane as lifestyle and concierge managers. When a personal or household matter calls for regulated legal, tax, property or financial counsel, we can introduce established independent professionals and liaise on scheduling and logistics alongside your existing advisers.',
    },
    {
      question: 'How quickly will my lifestyle manager get to know how I like things done?',
      answer:
        'We start with an unhurried onboarding conversation to understand your rhythm — how you prefer to communicate, your favourite London neighbourhoods, how you travel and who else is in your household. From there, every request refines your profile naturally so working with us feels increasingly effortless month after month.',
    },
  ],

  'luxury-sourcing': [
    {
      question: 'How do you source rare watches, fine jewellery or specific collector pieces?',
      answer:
        'Finding an elusive reference or exceptional stone takes patience, discernment and direct access to trusted houses and specialist dealers. Tell us what you are looking for — or the occasion behind it — and we quietly search through vetted boutique directors, independent dealers and auction specialists without broadcasting your name across the market.',
    },
    {
      question: 'How do you verify provenance and authenticity before I commit to a purchase?',
      answer:
        'We only work with established boutiques, authorised houses, reputable auction rooms and vetted specialist dealers who stand behind their provenance. Before any purchase or deposit is agreed, we ensure full documentation, condition notes and independent specialist inspection where appropriate are shared with you clearly in writing.',
    },
    {
      question: 'Can you arrange private viewings at my home, hotel or in a Mayfair salon?',
      answer:
        'Yes. Many members prefer to examine fine jewellery, watches or artwork in natural light and complete privacy rather than on a busy retail floor. Subject to the house’s security procedures, we coordinate closed-door salon appointments or insured private viewings at your London residence or suite.',
    },
    {
      question: 'Can you help source fine wine, rare spirits or build a private home cellar?',
      answer:
        'We do. Whether you are tracking down a specific birth-year Bordeaux for a milestone dinner or laying down a balanced private cellar, we work alongside respected London wine merchants and master sommeliers to source provenance-checked bottles, arrange temperature-controlled delivery and advise on storage.',
    },
    {
      question: 'Do you assist with bespoke commissions and one-of-a-kind gifts?',
      answer:
        'Yes — bespoke commissions are where our relationships with British and European artisans truly come alive. From custom leather goods and hand-engraved stationery to Savile Row tailoring, bespoke jewellery or private art commissions, we introduce the right maker, track lead times and oversee delivery.',
    },
    {
      question: 'Can you help locate sold-out fashion pieces or runway items internationally?',
      answer:
        'Often, yes. Because boutique stock varies dramatically between London, Paris, Milan, Geneva and New York, our international contacts can check private client allocations and boutiques abroad on your behalf. Availability is never guaranteed for strictly limited pieces, but we exhaust the proper channels swiftly and honestly.',
    },
    {
      question: 'How does pricing and transparency work when TGLC sources an item for me?',
      answer:
        'Completely openly. Once we locate suitable options, we present the exact item details, supplier price, delivery or insurance costs and any agreed sourcing fee upfront in writing. Nothing is ever purchased or placed on deposit without your explicit sign-off.',
    },
    {
      question: 'Can you coordinate insured shipping, customs clearance and secure delivery?',
      answer:
        'Yes. Moving valuable art, watches, wine or furniture across borders requires specialist logistics, not standard couriers. We coordinate fine-art shippers, specialist insured transit and customs documentation so your acquisition arrives safely, discreetly and ready to enjoy.',
    },
    {
      question: 'Can you help acquire or sell collector cars through trusted specialists?',
      answer:
        'We work discreetly alongside respected marque dealers, private brokers and auction specialists to help locate specific historic or contemporary collector cars — or connect you with credible buyers privately. We coordinate viewings, pre-purchase inspections and enclosed transport while keeping your identity confidential.',
    },
    {
      question: 'What if I have an unusual request and I am not even sure where to begin?',
      answer:
        'Those are often our favourite conversations. You do not need a reference number or a finished brief — simply tell us the story, recipient or feeling you want to capture. We will research possibilities thoughtfully, come back with two or three curated directions and refine them with you at your pace.',
    },
  ],
};

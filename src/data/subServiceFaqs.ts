import type { RichFaqEntry } from './serviceCategoryFaqs';

/**
 * 4 bespoke, deeply practical, humanised FAQs for each of the 39 sub-services.
 * Combined with 6 non-duplicate parent category FAQs via `getSubServiceFaqs()`,
 * every sub-service page renders exactly 10 rich, substantive questions.
 */
export const SUB_SERVICE_FAQS: Record<string, RichFaqEntry[]> = {
  // 1. Travel & Aviation
  'private-aviation': [
    {
      question: 'How quickly can you source a private jet or helicopter when plans change?',
      answer:
        'When a schedule shifts unexpectedly, we contact licensed independent charter operators directly to check live aircraft positioning, crew duty hours and airport slots. We come back with clear aircraft comparisons, routing notes and all-in charter quotes so you can decide promptly, always subject to operator availability and aviation clearances.',
    },
    {
      question: 'Which London private terminals do you coordinate departures from?',
      answer:
        'We regularly arrange departures and arrivals through Farnborough, Biggin Hill, RAF Northolt, Luton and Stansted, as well as Battersea Heliport for helicopter transfers into central London or out to country estates. We recommend the terminal that cuts the most ground time from your front door.',
    },
    {
      question: 'Can you tailor onboard catering, cabin layout and pet travel?',
      answer:
        'Yes. Before every flight we confirm exact catering requests — from favourite London restaurants to specific dietary needs or children’s meals — along with luggage volume, cabin seating and approved pet-travel paperwork so boarding feels like stepping into a private sitting room.',
    },
    {
      question: 'Are flights operated by TGLC or by licensed aviation operators?',
      answer:
        'Flights are operated by licensed independent operators holding full commercial air operator certificates. TGLC acts as your coordinator — comparing vetted aircraft options, aligning ground chauffeurs at both ends and keeping every charter contract transparent before you sign.',
    },
  ],
  'bespoke-travel-design': [
    {
      question: 'How do you design an itinerary so it feels personal rather than packaged?',
      answer:
        'We start by listening to how you actually enjoy spending a day — whether that means slow mornings and long lunches, architecture and private galleries, or active outdoor days with family. Every recommendation is built from scratch around your pace, never lifted from a pre-set brochure.',
    },
    {
      question: 'Can you balance different interests when family or friends travel together?',
      answer:
        'Yes, and that is often what makes a shared trip truly relaxing. We structure days with natural breathing room — pairing optional private guides, wellness time or separate afternoon activities before bringing everyone back together for a memorable dinner.',
    },
    {
      question: 'What does my itinerary look like once everything is confirmed?',
      answer:
        'You receive one clean, easy-to-read master itinerary containing flight references, chauffeur contacts, hotel notes, dining times and local advice — plus we share it with your assistant or travelling companions if you wish, keeping every update in one place.',
    },
    {
      question: 'Do you stay involved while I am actually away on the trip?',
      answer:
        'Always. Your Mayfair lifestyle manager monitors the flow of your journey and stays on hand by phone or message if you fancy swapping a restaurant, extending a stay by two nights or rearranging a private transfer mid-trip.',
    },
  ],
  'hotels-villas-residences': [
    {
      question: 'How do you choose between a flagship hotel suite and a private villa?',
      answer:
        'We talk through what will make the stay feel easiest for your party. For shorter city trips or couples who love room service and energy, a well-placed suite often wins; for longer summer holidays or multi-generational families, a fully staffed villa or chalet gives you space, quiet and your own rhythm.',
    },
    {
      question: 'Can you arrange private villa staff such as chefs, drivers and housekeepers?',
      answer:
        'Yes. For villas and alpine chalets, we verify exactly what staffing is included and can coordinate additional private chefs, local drivers, childcare specialists or pre-arrival pantry stocking through trusted local partners before you step off the plane.',
    },
    {
      question: 'Do you check room layout, noise levels and connecting suites before booking?',
      answer:
        'We do. A five-star name on the door does not guarantee the right room inside it. We liaise directly with hotel management on floor level, outlook, bed configurations, connecting doors and quiet wings so there are no surprises when you open the door.',
    },
    {
      question: 'Can you handle early check-in, late departure or specific room preparations?',
      answer:
        'We brief the hotel ahead of arrival on your flight times, pillow preferences, welcome refreshments and any special occasion you are marking. Where an early arrival is essential, we advise honestly on whether a pre-registered night is the smartest way to guarantee immediate access.',
    },
  ],
  'yachts-coastal-escapes': [
    {
      question: 'How do you help choose the right yacht if I have not chartered before?',
      answer:
        'You do not need to know yacht specifications to start. Tell us how many cabins you need, your preferred cruising region and whether you love water sports, quiet anchorages or lively beach clubs. Working with licensed independent maritime brokers, we shortlist vetted vessels whose crew and layout genuinely fit.',
    },
    {
      question: 'Can you coordinate cruising itineraries, beach clubs and harbour berths?',
      answer:
        'Yes. Alongside the captain and broker, we shape day-by-day coastal plans — securing popular waterside lunch tables, lining up shore chauffeurs and advising on realistic harbour berth timing well ahead of peak summer weeks, always subject to local availability and weather.',
    },
    {
      question: 'How does yacht provisioning and preference planning work?',
      answer:
        'Well before embarkation, we complete a clear preference sheet covering favourite wines, spirits, daily meals, allergies, children’s favourites and cabin touches so the onboard chef and stewardesses have everything stocked before you step aboard.',
    },
    {
      question: 'Can you combine a yacht week with flights, helicopters and a villa stay?',
      answer:
        'Seamlessly. Many members pair a week at sea with a coastal villa or city stay before or after. We align private flights, marina transfers and luggage handovers so moving from land to sea feels completely unbroken.',
    },
  ],
  'global-mobility-logistics': [
    {
      question: 'What does global mobility and logistics cover beyond simple flight bookings?',
      answer:
        'It covers the intricate moving parts around complex travel: multi-city business roadshows, staggered arrivals for teams or families, excess luggage and ski or golf equipment forwarding, private terminal transit and backup plans if weather or schedules shift.',
    },
    {
      question: 'Can you coordinate fast-track airport assistance around the world?',
      answer:
        'Yes. At major international hubs where official meet-and-greet or VIP terminal services operate, we arrange airside escorts, immigration fast-track and baggage assistance so long-haul connections feel calm rather than exhausting.',
    },
    {
      question: 'Can you arrange luggage shipping ahead of seasonal travel?',
      answer:
        'Yes. If you are moving wardrobes, children’s gear or winter equipment between London and a seasonal home abroad, we coordinate vetted door-to-door luggage couriers so your bags arrive ahead of you and you can travel light.',
    },
    {
      question: 'How do you keep multi-city schedules clear when several people are involved?',
      answer:
        'We prepare clear, role-specific itineraries — one concise overview for you, and full operational briefings for drivers, assistants and local hosts — so every person on the ground knows their exact timing without crowding your phone.',
    },
  ],

  // 2. Dining & Nightlife
  'london-dining': [
    {
      question: 'How do you pick the right restaurant when I only know the mood I want?',
      answer:
        'Tell us who you are dining with, the neighbourhood you are near and whether you want quiet conversation, celebratory buzz or standout seasonal cooking. Because our team sits in Mayfair and knows London’s dining rooms first-hand, we narrow it down to two or three genuinely fitting choices rather than sending a generic list.',
    },
    {
      question: 'Can you request specific tables, booths or quieter corners?',
      answer:
        'Yes. Where a venue allows table notes, we speak directly with the desk about whether you prefer a corner banquette for a private conversation, a lively main-room table or terrace seating — and we let you know candidly what the room can accommodate.',
    },
    {
      question: 'Can you handle business lunches and client dinners at short notice?',
      answer:
        'Frequently, yes. Mayfair, St James’s and City lunch tables shift throughout the morning, and direct calls to trusted restaurant teams often uncover space that never appears online. We also coordinate discreet bill settlement in advance if you are hosting clients.',
    },
    {
      question: 'What happens if my first-choice restaurant is genuinely full?',
      answer:
        'We will never leave you hanging on a vague waitlist. Alongside putting our best effort into your first choice, we immediately secure a strong back-up table of equal calibre nearby so your evening is protected whatever happens.',
    },
  ],
  'private-dining-celebrations': [
    {
      question: 'What sizes of private dining rooms can you arrange across London?',
      answer:
        'Everything from intimate wine vaults and wood-panelled rooms for six to ten guests through to grand Georgian drawing rooms, gallery spaces and full restaurant buy-outs for larger milestone dinners — matched carefully to your guest count so the room feels warm, never cavernous.',
    },
    {
      question: 'Can you manage bespoke menus, wine pairings and printed place cards?',
      answer:
        'Yes. We liaise directly with the chef and sommelier on seasonal tasting menus, dietary adaptations and cellar selections, and can coordinate subtle finishing touches such as bespoke menu printing, seasonal florals and gentle acoustic music.',
    },
    {
      question: 'How do you keep private hosting stress-free on the night itself?',
      answer:
        'We confirm arrival timings, coat check, welcome drinks, course pacing and discreet billing ahead of time so you can arrive as a relaxed host rather than checking on the kitchen or chasing the bill in front of your guests.',
    },
    {
      question: 'Can you help arrange private dining outside central London as well?',
      answer:
        'Yes. We regularly organise private celebratory lunches and dinners in the Cotswolds, Berkshire, Hampshire and European capitals, pairing the room with chauffeurs or overnight stays for guests travelling in.',
    },
  ],
  'members-clubs-introductions': [
    {
      question: 'How do you advise on which London members’ clubs fit my lifestyle?',
      answer:
        'London’s clubs vary enormously — some are rooted in Georgian heritage and quiet conversation in St James’s, while others centre on Mayfair dining, art, creativity or late-night music. We give you candid, practical guidance on the culture and expectations of each before you pursue anything.',
    },
    {
      question: 'Can TGLC guarantee admission to a private members’ club?',
      answer:
        'No external service can honestly promise committee approval, and any firm claiming otherwise should be treated cautiously. What we do is prepare you thoroughly, arrange hosted visits or dining where club rules allow, and make thoughtful introductions within our network, always respecting each club’s independent committee.',
    },
    {
      question: 'Can you arrange private dining or meetings inside clubs where access is permitted?',
      answer:
        'Where permitted under club guest policies and subject to availability, we coordinate hosted lunches, private rooms or visits so you can experience the atmosphere first-hand with complete adherence to house etiquette and dress codes.',
    },
    {
      question: 'Do you also advise on international reciprocal clubs when I travel?',
      answer:
        'Yes. If you travel regularly between London, New York, Paris, Milan or Asia, we help map out where your existing memberships carry reciprocal privileges and suggest welcoming private spaces in cities you visit frequently.',
    },
  ],
  'nightlife-after-dark': [
    {
      question: 'What kinds of late-night London venues do you arrange?',
      answer:
        'We tailor every night to your taste — from candlelit jazz basements in Soho and low-lit listening bars to lively Mayfair lounges and private club tables. Whether you want great conversation over rare spirits or a celebratory late night with friends, we match the room to your crowd.',
    },
    {
      question: 'How do door arrangements, tables and minimum spends work?',
      answer:
        'Everything is agreed openly beforehand. We liaise directly with venue hosts on guest lists, table positioning and exact minimum-spend requirements, confirming every detail with you in writing before you head out so arrival at the door feels calm and straightforward.',
    },
    {
      question: 'Can you arrange private late-night spaces for a group?',
      answer:
        'Yes. For birthdays, post-premiere gatherings or visiting friends who value privacy, we can shortlist tucked-away bar rooms, hotel suites or late-licensed private spaces where your group can unwind comfortably without outside attention.',
    },
    {
      question: 'Do you line up chauffeurs for late finishes?',
      answer:
        'Always on request. Having a standby driver positioned close to the venue — who knows the exact exit and stays updated as the evening unfolds — means you can leave whenever you are ready without waiting on the kerb.',
    },
  ],
  'global-dining-culinary': [
    {
      question: 'Which international cities can you arrange dining and culinary plans in?',
      answer:
        'We arrange tables and culinary experiences across major European capitals, the Mediterranean coast, New York, Miami, Aspen, Dubai, Tokyo and beyond — working through trusted local hosts and hospitality contacts rather than generic directories.',
    },
    {
      question: 'Can you arrange private vineyard visits, cellar tastings or chef’s tables abroad?',
      answer:
        'Yes. From family-run estates in Tuscany, Burgundy and Champagne to intimate chef’s counters in Tokyo or San Sebastián, we coordinate private tastings, winemaker lunches and local drivers subject to estate schedules.',
    },
    {
      question: 'How far ahead should we plan sought-after international restaurants?',
      answer:
        'Many flagship dining rooms abroad open reservation windows one to three months ahead. Sharing your travel dates early lets us track exact release dates and speak with local contacts immediately, though we are always happy to check short-notice options too.',
    },
    {
      question: 'Can you tailor an entire trip around food and wine?',
      answer:
        'Gladly. We love building unhurried culinary itineraries that pair local markets, estate tastings, standout regional restaurants and boutique hotels so you experience a region through its finest kitchens and cellars.',
    },
  ],

  // 3. Experiences & Culture
  'art-design-collecting': [
    {
      question: 'Can you arrange private gallery appointments in Mayfair and St James’s?',
      answer:
        'Yes. Our Albemarle Street office sits in the heart of London’s gallery district. We arrange quiet, director-led viewings at independent galleries, preview visits ahead of major art fairs and specialist walkthroughs tailored to the periods or artists that genuinely interest you.',
    },
    {
      question: 'Do you help coordinate visits to major international art fairs?',
      answer:
        'We do. Whether you are attending Frieze London, Art Basel, TEFAF or Venice Biennale, we help plan fair access where available alongside surrounding hotels, chauffeurs, private gallery dinners and collector studio visits.',
    },
    {
      question: 'Are you art advisers, or how do you work with collectors?',
      answer:
        'We act as your discreet lifestyle coordinator rather than an independent valuer. When you want specialist curatorial or investment advice, we introduce respected independent art advisers, conservators and auction specialists, while we handle logistics, viewings, framing and insured fine-art transport.',
    },
    {
      question: 'Can you arrange out-of-hours or curator-led museum tours?',
      answer:
        'Subject to institutional availability and museum schedules, we coordinate private guided visits with knowledgeable art historians and museum specialists across London, Paris, Florence and Rome — turning crowded landmarks into calm, deeply absorbing afternoons.',
    },
  ],
  'music-theatre-performance': [
    {
      question: 'Can you arrange premium seats and hospitality for West End theatre and opera?',
      answer:
        'Yes. From opening nights in the West End to private boxes at the Royal Opera House, Royal Albert Hall and Glyndebourne, we source official seating and interval dining through established box-office and hospitality channels, always subject to availability.',
    },
    {
      question: 'Can you pair theatre or concert evenings with pre- or post-show dining?',
      answer:
        'That is how most members enjoy the evening. We time pre-theatre dinners so nothing feels rushed, book late suppers for after the curtain falls, and have your chauffeur positioned at the nearest clear collection point.',
    },
    {
      question: 'Do you arrange private musicians or intimate recitals for home gatherings?',
      answer:
        'Yes. Whether you envision a classical string quartet for a dinner party, a jazz trio in a private club room or an acoustic soloist for a country house weekend, we introduce vetted performers and coordinate technical set-up seamlessly.',
    },
    {
      question: 'Can you help with international concerts, festivals and classical seasons?',
      answer:
        'We do. From Salzburg Festival and La Scala to arena concerts across Europe and the US, we check official hospitality and premium seating alongside flights, nearby hotels and local transfers.',
    },
  ],
  'fashion-private-shopping': [
    {
      question: 'How do private Savile Row and Bond Street appointments work?',
      answer:
        'We arrange closed-door appointments with senior cutters, boutique directors and personal shopping suites around your diary. If you share sizes, colours or upcoming occasions beforehand, pieces are curated and waiting for you when you step inside.',
    },
    {
      question: 'Can boutiques or tailors come directly to my home or hotel suite?',
      answer:
        'Often, yes. Many Savile Row tailors, bespoke shoemakers and flagship Bond Street houses offer private at-home or in-suite fittings in central London by prior arrangement — saving you hours when your schedule is tight.',
    },
    {
      question: 'Can you introduce an independent personal stylist for a seasonal wardrobe refresh?',
      answer:
        'Yes. We work with discreet, deeply experienced London stylists who understand understated dressing — whether for a major event, a seasonal capsule wardrobe or packing effortlessly for a multi-climate trip.',
    },
    {
      question: 'Do you handle alterations, tax-free shopping logistics and delivery?',
      answer:
        'We coordinate every follow-up: collection from boutiques, tailoring alterations, careful garment pressing and hand delivery directly to your London residence, hotel or onward luggage shipment.',
    },
  ],
  'sport-motorsport': [
    {
      question: 'Which major sporting fixtures can you help arrange hospitality for?',
      answer:
        'We assist across the British and international sporting calendar — including Wimbledon, Royal Ascot, Henley, Six Nations rugby, Premier League football, Test cricket, Formula 1 Grands Prix and Goodwood — always through official hospitality channels subject to availability.',
    },
    {
      question: 'Can you organise private boxes or hosted suites for entertaining clients?',
      answer:
        'Yes. Entertaining guests at a flagship fixture works best when every logistical seam disappears. We advise on suite options, coordinate guest invitations, dietary notes, branded or understated touches, and align chauffeurs or helicopters from London.',
    },
    {
      question: 'Do you arrange private driving experiences, golf days or country sport?',
      answer:
        'We do. From classic car rallies through the English countryside and private circuit coaching to championship golf tee-times and seasonal countryside days, we coordinate vetted venues, instructors, equipment and hospitality.',
    },
    {
      question: 'How early should I enquire for Formula 1, Wimbledon or Royal Ascot?',
      answer:
        'For flagship hospitality suites and paddock access, enquiring three to six months ahead gives you the finest choice of locations and pricing. Even at shorter notice, always ask — we check legitimate late releases promptly and honestly.',
    },
  ],
  'private-celebrations-milestones': [
    {
      question: 'What scale of private celebrations do you coordinate?',
      answer:
        'Everything from an unforgettable anniversary dinner for two in a hidden London setting to forty-guest birthday suppers and multi-day country house weekend gatherings. Every event is shaped around your personal style — never noisy or formulaic.',
    },
    {
      question: 'Do you handle venues, catering, florals, music and guest logistics together?',
      answer:
        'Yes. Acting as your single point of contact, we bring together vetted venues, private chefs, florists, lighting, musicians, photographers and guest transport so every supplier works from one clear timeline.',
    },
    {
      question: 'Can you help keep a surprise celebration genuinely confidential?',
      answer:
        'Discretion is second nature to our team. We coordinate quietly via your preferred contact channel, brief every supplier on confidentiality and manage guest arrivals and timing carefully so nothing spoils the reveal.',
    },
    {
      question: 'How are event budgets and supplier contracts managed?',
      answer:
        'We establish a clear target budget from the first conversation and present itemised supplier proposals for your written approval before any deposit is paid, keeping full financial clarity from concept through to the final toast.',
    },
  ],
  'family-next-generation': [
    {
      question: 'What kinds of experiences work best for families visiting or living in London?',
      answer:
        'We design days that keep both adults and younger family members genuinely absorbed — private hands-on museum tours, behind-the-scenes theatre or sporting visits, Thames river trips, countryside falconry or riding, and relaxed family-friendly dining rooms where everyone feels welcome.',
    },
    {
      question: 'Can you plan school-holiday travel that balances parents and children?',
      answer:
        'Yes. The secret to a great family holiday is balancing shared adventures with moments where parents can actually unwind. We pair family-ready resorts, villas or chalets with vetted childcare specialists, ski instructors or local guides so everyone returns rested.',
    },
    {
      question: 'Do you support older teenagers or university students living in London?',
      answer:
        'Many international families ask us to keep a quiet, supportive eye on practical logistics for older children studying or starting careers in London — helping with accommodation orientation, safe transport, travel bookings and household needs within guidelines you approve.',
    },
    {
      question: 'How do you handle safety and vetting for family activities and childcare?',
      answer:
        'Whenever children are involved, we introduce only established, fully vetted specialist agencies and licensed activity providers who carry appropriate background checks and insurance, sharing full credentials with you beforehand.',
    },
  ],

  // 4. Residences & Relocation
  'london-residences': [
    {
      question: 'Are you estate agents, or what is your role in a London property search?',
      answer:
        'We’re not estate agents; we introduce you to regulated professionals. Our role is to save you time and friction — listening to how you want to live in London, connecting you with respected buying or letting agents and solicitors, and coordinating viewings and local context around your diary.',
    },
    {
      question: 'Can you help me compare London neighbourhoods before committing to a street?',
      answer:
        'Yes. Mayfair, Belgravia, Knightsbridge, Marylebone, Kensington and Chelsea each have a completely different daily rhythm. We share candid local insight on school runs, green spaces, quiet garden squares and street character so you focus your search in the right enclave.',
    },
    {
      question: 'Can you arrange temporary serviced residences while I look for a permanent home?',
      answer:
        'Certainly. Moving straight into a well-situated Mayfair or Knightsbridge residence for a few weeks or months lets you explore neighbourhoods calmly without rushing a major long-term decision.',
    },
    {
      question: 'Can you assist once I have found a property and need to move in smoothly?',
      answer:
        'Yes — that is where our team takes over seamlessly, coordinating removals, utilities, broadband, security upgrades, housekeeping and trusted local trades so your first night in the property feels calm and effortless.',
    },
  ],
  'off-market-property': [
    {
      question: 'How does discreet access to privately marketed properties work?',
      answer:
        'A significant share of London’s finest townhouses and country estates change hands privately without ever appearing on public portals. We are not estate agents; instead, we introduce you to regulated specialist buying agents who focus specifically on private and off-market mandates.',
    },
    {
      question: 'How is my privacy protected during early enquiries and viewings?',
      answer:
        'We coordinate with your buying agent and legal advisers so initial enquiries can be handled under strict confidentiality, scheduling private viewings outside busy hours and arranging discreet chauffeured transport.',
    },
    {
      question: 'Can you coordinate visits across both London and the English countryside?',
      answer:
        'Yes. Whether you are viewing a Georgian house in Belgravia or touring estates across the Cotswolds, Sussex or Oxfordshire, we align viewing itineraries, drivers, helicopters where helpful and nearby lunches into a productive, unhurried day.',
    },
    {
      question: 'Do you work alongside my existing property lawyer, surveyor and tax adviser?',
      answer:
        'Completely. We respect professional boundaries and stay in close step with your regulated advisers, keeping schedules, access for surveyors and practical handover tasks organised.',
    },
  ],
  'relocation-settling-in': [
    {
      question: 'What practical tasks do you handle when a family relocates to London?',
      answer:
        'We take the exhausting administrative tail off your shoulders: coordinating international removals, setting up utilities and high-speed broadband, sourcing vetted domestic staff, arranging private medical or dental registrations and orienting you across your new neighbourhood.',
    },
    {
      question: 'Can you coordinate relocation support before we even arrive in the UK?',
      answer:
        'Yes — starting ahead of your flight makes arrival dramatically calmer. We can oversee furniture deliveries, have the home cleaned and stocked, arrange airport pick-up and prepare a clear local welcome guide before you land.',
    },
    {
      question: 'Do you advise on visas, immigration or UK tax residency?',
      answer:
        'No — those areas require regulated legal and tax expertise. We can introduce respected independent immigration solicitors and private client advisers, while our desk focuses on all practical lifestyle and household logistics.',
    },
    {
      question: 'How long does settling-in support continue after move-in day?',
      answer:
        'For as long as you need. Many families begin with relocation logistics and stay on as ongoing members so day-to-day London life, travel, schooling logistics and household upkeep remain effortless year-round.',
    },
  ],
  'household-management': [
    {
      question: 'What does ongoing London household management actually look like week to week?',
      answer:
        'It means having one dependable point of contact who keeps your home running smoothly — coordinating regular housekeeping, dry cleaning, floristry, pantry restocking, routine boiler or AV servicing and seasonal preparations without you having to chase five different contractors.',
    },
    {
      question: 'Can you prepare my residence ahead of short visits to London?',
      answer:
        'Yes. Simply tell us your arrival date and preferences, and we ensure the house is aired, cleaned, heated or cooled comfortably, stocked with your preferred groceries and fresh flowers, and completely ready before your key turns in the lock.',
    },
    {
      question: 'How do you handle urgent repairs like a leak, heating fault or alarm issue?',
      answer:
        'When something unexpected goes wrong, you message one person instead of hunting through directories. We dispatch trusted, vetted tradespeople promptly, coordinate property access and keep you informed clearly until the issue is resolved.',
    },
    {
      question: 'Can you work alongside my existing housekeeper or estate manager?',
      answer:
        'Yes. We support existing household staff rather than stepping on their toes — stepping in for specialist sourcing, contractor supervision, holiday cover coordination or tasks outside their daily remit.',
    },
  ],
  'interior-home-services': [
    {
      question: 'Can you introduce interior designers, architects or specialist craftspeople?',
      answer:
        'Yes. Every home calls for a different sensibility — from restoring a listed Mayfair townhouse to furnishing a contemporary riverside penthouse. We introduce respected studios and artisans whose work matches your taste, leaving creative direction entirely between you and the studio.',
    },
    {
      question: 'Can you oversee white-glove deliveries, art hanging and AV installation?',
      answer:
        'We do. Waiting around all day for furniture shipments, bespoke lighting or specialist art installers wastes valuable hours. We schedule consolidated delivery windows, coordinate supervised access and confirm everything is placed cleanly.',
    },
    {
      question: 'Can you help refresh a home quickly ahead of entertaining or a seasonal stay?',
      answer:
        'Yes. Sometimes a property simply needs refined finishing touches — fresh linens, tableware, seasonal florals, subtle lighting adjustments or deep specialist upholstery care — all coordinated quietly while you are away.',
    },
    {
      question: 'How are quotes and timelines managed across multiple trades?',
      answer:
        'We obtain clear written estimates from each specialist for your approval beforehand and coordinate their calendar sequence so decorators, electricians and installers are never tripping over one another.',
    },
  ],
  'country-estates-weekend-homes': [
    {
      question: 'Can you source private country houses for weekend or seasonal stays?',
      answer:
        'Yes. From stone manor houses in the Cotswolds to coastal retreats in Cornwall, Sussex or Scottish sporting estates, we work with established private estate managers to match properties to your party size, privacy needs and seasonal plans, subject to availability.',
    },
    {
      question: 'Can you arrange private chefs, country pursuits and transport for a weekend away?',
      answer:
        'Completely. We coordinate door-to-door chauffeurs or helicopter transfers from London, stock the larder and wine cellar ahead of arrival, book private chefs or favourite local country inns, and arrange guided walks, riding or shooting days.',
    },
    {
      question: 'Do you help look after a second home in the countryside year-round?',
      answer:
        'Yes. Coordinating groundskeepers, pool or tennis-court maintenance, housekeeping and pre-weekend preparation from our Mayfair desk ensures you drive out on Friday afternoon to a home that is already warm, lit and welcoming.',
    },
    {
      question: 'Are country weekends suitable for multi-generational family gatherings?',
      answer:
        'They are often the very best setting for them. We check bedroom accessibility, ground-floor suites, family dining spaces and nearby activities for every age group so grandparents and grandchildren alike feel completely at home.',
    },
  ],

  // 5. Transport & Security
  'chauffeur-luxury-vehicles': [
    {
      question: 'Which vehicles are available through your London chauffeur network?',
      answer:
        'We arrange immaculately maintained Mercedes-Benz S-Class and Maybach saloons, Range Rovers, Rolls-Royce models and spacious executive Mercedes V-Class MPVs — selected to suit your luggage, passenger count and desired level of discretion.',
    },
    {
      question: 'Can I request the same trusted chauffeur for regular London journeys?',
      answer:
        'Whenever schedules permit, yes. Consistency makes a huge difference — having a driver who already knows your preferred route from Heathrow, favourite newspaper, cabin temperature and quiet conversation style turns every journey into a calm pause in the day.',
    },
    {
      question: 'Do drivers track commercial and private flights automatically?',
      answer:
        'Yes. Whether your flight arrives forty minutes early or is delayed by weather, your chauffeur monitors live flight data and adjusts arrival timing automatically so you never walk out searching for your car.',
    },
    {
      question: 'Can you arrange luxury self-drive vehicles in London or across Europe?',
      answer:
        'Yes. For grand touring weekends in the Cotswolds, Alps or Italian lakes, we coordinate vetted self-drive prestige and performance vehicles delivered straight to your door or hotel with clear insurance terms agreed upfront.',
    },
  ],
  'private-car-sourcing': [
    {
      question: 'How do you help source a specific or limited-production vehicle?',
      answer:
        'We work discreetly alongside trusted marque specialists, private collectors and reputable dealers across the UK and Europe to identify genuine, well-documented examples — protecting your privacy while doing the legwork of verifying history and condition.',
    },
    {
      question: 'Can you arrange private viewings and independent mechanical inspections?',
      answer:
        'Always. Before any commitment is made, we coordinate closed-door viewings and independent specialist pre-purchase inspections so you have complete confidence in provenance, service history and bodywork.',
    },
    {
      question: 'Can you coordinate enclosed delivery, registration and secure storage?',
      answer:
        'Yes. From climate-controlled collector car storage and seasonal battery maintenance to enclosed transporter delivery between London and European residences, we keep ownership completely effortless.',
    },
    {
      question: 'Do you act as a motor dealer or take hidden commissions?',
      answer:
        'No — we sit firmly on your side of the table as your independent coordinator. Whenever we source a vehicle through a specialist dealer or private broker, we share every seller term, inspection report and agreed fee clearly in writing before you commit to anything.',
    },
  ],
  'executive-protection': [
    {
      question: 'Who provides executive and close-protection security arranged through TGLC?',
      answer:
        'Security services are provided by licensed independent specialists. We introduce vetted, SIA-licensed professionals with extensive experience supporting principals, executives and families discreetly in London and internationally.',
    },
    {
      question: 'Can security be kept low-profile so it does not disrupt family life?',
      answer:
        'Yes — understated protection is almost always the most effective kind. Licensed specialists tailor their approach to your comfort level, blending smoothly into travel, dining and family outings without creating an intimidating or conspicuous presence.',
    },
    {
      question: 'Do specialists conduct advance route and venue checks before visits?',
      answer:
        'Where required, licensed protection teams carry out advance reconnaissance of venues, hotels, arrival points and contingency routes ahead of your arrival, coordinating seamlessly with your chauffeur and lifestyle manager.',
    },
    {
      question: 'Can you coordinate residential security assessments or international travel cover?',
      answer:
        'Yes. We connect you with independent security consultancies for home security audits, temporary residential cover during travel or vetted protection teams abroad, all arranged under strict confidentiality.',
    },
  ],
  'secure-travel-event-logistics': [
    {
      question: 'What is involved in secure travel and event logistics?',
      answer:
        'It brings together timing, routing, vetted vehicles, private arrival points and — where appropriate — licensed independent security specialists so complex itineraries, roadshows or high-profile events unfold calmly and predictably.',
    },
    {
      question: 'Can you manage staggered guest arrivals for a private dinner or event?',
      answer:
        'Yes. We coordinate driver schedules, drop-off windows and discreet host communication so guests step directly from car to door without congestion or waiting outside in public view.',
    },
    {
      question: 'How do you prepare for sudden route changes or London road closures?',
      answer:
        'Experienced London transport coordinators track live traffic, diplomatic closures and major city events throughout the day, keeping backup routes and secondary pick-up points ready before you ever leave the room.',
    },
    {
      question: 'Can you coordinate security and aviation tarmac transfers together?',
      answer:
        'Yes. At private aviation terminals that permit direct vehicle access, we align flight manifests, FBO clearances and vetted chauffeurs or licensed protection officers so transition from aircraft to car takes moments.',
    },
  ],
  'privacy-first-lifestyle-support': [
    {
      question: 'How do you help public figures or private families stay low-profile in London?',
      answer:
        'It comes down to quiet forethought: choosing restaurants with tucked-away rooms or discreet entrances, arranging private boutique appointments outside peak hours, booking hotel suites under agreed privacy protocols and working only with vetted, trusted suppliers.',
    },
    {
      question: 'Who sees my personal details when TGLC books on my behalf?',
      answer:
        'Only the minimum details a supplier genuinely needs to honour your reservation or travel compliance. Where bookings can be held discreetly under an agreed reference or assistant contact, we handle that automatically.',
    },
    {
      question: 'Can you coordinate private check-ins and discreet exits at hotels and venues?',
      answer:
        'Yes. Wherever a hotel or venue supports in-suite registration, side-door arrivals or quiet lift access, we brief senior management ahead of time so your arrival feels completely private.',
    },
    {
      question: 'Do you ever share client names, photographs or case studies publicly?',
      answer:
        'Never — not on our website, not on social media and not in private pitches. Discretion is the foundation of our Albemarle Street office, so we never name members, never publish client arrangements and never trade on your association with TGLC.',
    },
  ],

  // 6. Personal & Private Office
  'everyday-lifestyle-management': [
    {
      question: 'Is any everyday request too small for my lifestyle manager?',
      answer:
        'Not at all. In fact, it is often the small, nagging tasks — tracking down a hard-to-find gift, rearranging a dentist appointment, booking a last-minute lunch or sorting dry-cleaning collection — that steal the most headspace from your week.',
    },
    {
      question: 'How do I send day-to-day requests without writing long emails?',
      answer:
        'Keep it as brief as a quick text or voice note. Message or call your dedicated lifestyle manager on WhatsApp, email or phone, and we will clarify anything needed concisely and come back with answers rather than extra admin.',
    },
    {
      question: 'Can you manage recurring monthly tasks automatically?',
      answer:
        'Yes. Whether it is weekly fresh flowers, regular restaurant favourites, seasonal car servicing or keeping track of family birthdays, we build those rhythms quietly into your calendar so they happen like clockwork.',
    },
    {
      question: 'How do you prioritise if I send several requests at once?',
      answer:
        'We acknowledge everything promptly, tackle time-sensitive items immediately and send back calm, grouped updates once real options are confirmed — so you get clear decisions to approve rather than twenty fragmented messages interrupting your afternoon.',
    },
  ],
  'household-staffing-recruitment': [
    {
      question: 'What types of domestic staff can you help source?',
      answer:
        'Through specialist, long-established domestic recruitment agencies, we help source private housekeepers, house managers, private chefs, nannies, maternity nurses, estate staff and private chauffeurs — matched carefully to your household’s tone and privacy standards.',
    },
    {
      question: 'How are candidates vetted before I meet them?',
      answer:
        'Specialist recruitment partners conduct thorough identity verification, right-to-work checks, background screening and direct reference checks with previous households before any shortlisted candidate is put forward for your interview.',
    },
    {
      question: 'Can you arrange short-term or seasonal household cover?',
      answer:
        'Yes. Whether you need a temporary private chef for a week of entertaining, holiday cover for your regular housekeeper or extra hospitality staff for a summer stay, we coordinate trusted temporary placements smoothly.',
    },
    {
      question: 'Do you advise on UK employment contracts and payroll for domestic staff?',
      answer:
        'We coordinate logistics and agency introductions, while regulated domestic payroll and employment-law specialists handle formal contracts, tax and compliance cleanly on your behalf.',
    },
  ],
  'education-family-support': [
    {
      question: 'How do you assist families navigating London independent schools?',
      answer:
        'We introduce families to respected independent UK education consultants who understand admissions timelines, school ethos and academic fit in depth. Alongside their advice, we coordinate school tour itineraries, chauffeurs and stays if you are visiting from abroad.',
    },
    {
      question: 'Can you help find vetted private tutors or language coaches?',
      answer:
        'Yes. Whether for entrance exam preparation, modern languages, music tuition or holiday academic support, we connect you with reputable specialist tutoring agencies who match vetted, subject-expert tutors to your child’s learning style.',
    },
    {
      question: 'Can you assist with university visits and student accommodation in the UK?',
      answer:
        'We do. From organising calm multi-city university open-day visits across Oxford, Cambridge, London and Scotland to introducing vetted letting specialists for safe student flats, we help make the transition smooth for the whole family.',
    },
    {
      question: 'Do you give formal educational consultancy advice yourselves?',
      answer:
        'No — we believe families deserve dedicated, specialist educational advisers for school selection and academic strategy. Our role is introducing trusted experts and handling every practical arrangement around them.',
    },
  ],
  'health-wellness-recovery': [
    {
      question: 'Do you provide medical advice or recommend clinical treatments?',
      answer:
        'We don’t give medical advice; we help arrange appointments with qualified professionals. Our role is purely practical — saving you time by coordinating scheduling, discreet arrival notes and surrounding transport with established private clinics and practitioners.',
    },
    {
      question: 'Can you arrange private Harley Street appointments or health screenings?',
      answer:
        'Yes. Subject to clinic availability, we help coordinate introductions and appointment timings with private GPs, dental practices, diagnostic screenings and specialist clinics in central London so visits fit calmly around your diary.',
    },
    {
      question: 'Can you arrange at-home personal trainers, physiotherapists or massage therapists?',
      answer:
        'We do. Many members prefer training or recovery in the privacy of their own residence or hotel suite. We introduce qualified, insured wellness practitioners who come directly to you at times that suit your week.',
    },
    {
      question: 'Can you plan restorative wellness retreats in the UK or Europe?',
      answer:
        'Yes. From quiet Alpine longevity clinics and Swiss spa sanctuaries to English countryside wellness escapes, we coordinate stays, transfers and pre-arrival preferences so you can switch off completely.',
    },
  ],
  'gifting-personal-milestones': [
    {
      question: 'How do you come up with gift ideas that feel genuinely thoughtful rather than generic?',
      answer:
        'We ask a few quick questions about the recipient’s tastes, interests and what they already have plenty of. From first-edition books and bespoke leather goods to rare vintages or tailored experiences, we present three or four distinct ideas that feel unmistakably personal.',
    },
    {
      question: 'Can you track important birthdays and anniversaries throughout the year?',
      answer:
        'Yes — share your family and personal calendar once, and we keep quiet watch over it year-round. Several weeks ahead of each date we send a gentle note with three or four thoughtful ideas, so you never have to scramble at the eleventh hour.',
    },
    {
      question: 'Do you handle bespoke wrapping, handwritten cards and London hand-delivery?',
      answer:
        'Everything is finished with quiet care: refined wrapping, custom ribbons or stationery, handwritten notes to your wording and punctual hand-delivery across central London or insured courier dispatch abroad.',
    },
    {
      question: 'Can you also coordinate seasonal corporate or client gifting?',
      answer:
        'Yes. Whether you are thanking ten key partners or sending bespoke seasonal hampers to clients across London and abroad, we source artisanal makers, manage personalisation and oversee every delivery.',
    },
  ],
  'private-office-adviser-liaison': [
    {
      question: 'How do you collaborate with a family office, chief of staff or executive assistant?',
      answer:
        'We work strictly to your preferred chain of communication — whether liaising directly with your chief of staff on approvals and billing, supporting an executive assistant on London access, or stepping in quietly when your internal team is stretched.',
    },
    {
      question: 'Can you provide clear, consolidated reporting for family office accounting?',
      answer:
        'Yes. We keep supplier invoices, written approvals and project summaries neatly documented so your accounting team or family office can reconcile travel, household and lifestyle expenditure cleanly without chasing receipts.',
    },
    {
      question: 'Can you support visiting principals or board members when they are in London?',
      answer:
        'Very often, yes. Family offices based overseas rely on our Mayfair desk as their trusted eyes and ears in London — arranging suites, chauffeurs, private dining rooms and day-to-day support whenever principals are in town.',
    },
    {
      question: 'How do you ensure confidentiality across multi-adviser coordination?',
      answer:
        'We share information strictly on a need-to-know basis, following the exact permissions set by you or your principal so legal, financial and personal matters stay properly compartmentalised.',
    },
  ],

  // 7. Luxury Sourcing
  'fine-jewellery-watches': [
    {
      question: 'Can you help track down a specific discontinued or rare timepiece?',
      answer:
        'Yes. We search discreetly through trusted watch specialists, boutique directors and established secondary-market dealers in London, Geneva and internationally — checking box, papers, service history and originality before bringing verified options to you.',
    },
    {
      question: 'Can you arrange private bespoke jewellery commissions in Mayfair?',
      answer:
        'We do. Whether you are commissioning an engagement ring, resetting a family heirloom or designing a one-of-a-kind anniversary piece, we introduce independent Mayfair jewellers and gem specialists for quiet, unhurried studio consultations.',
    },
    {
      question: 'How is authenticity and independent certification handled?',
      answer:
        'We work only with reputable houses, authorised boutiques and vetted specialist dealers who provide clear provenance documentation and recognised gemmological or watchmaking certifications, confirmed in writing before purchase.',
    },
    {
      question: 'Can I view watches or jewellery privately outside a public boutique?',
      answer:
        'Yes, wherever the house’s security procedures permit. We regularly arrange closed-door viewing salons on Bond Street and Mount Street — or insured private presentations in the calm of your London residence or hotel suite — so you can take your time without an audience.',
    },
  ],
  'art-collectible-design': [
    {
      question: 'Can you help locate a specific artist’s work or collectible design piece?',
      answer:
        'Yes. Through our network of Mayfair galleries, independent design dealers and specialist advisers, we make discreet enquiries to see whether a particular work, edition or mid-century design piece is privately available.',
    },
    {
      question: 'Can you coordinate bidding representation or private auction previews?',
      answer:
        'We arrange private preview appointments at London’s major auction houses ahead of evening sales, and can introduce specialist advisers to guide condition reports, provenance checks and discreet telephone or absentee bidding.',
    },
    {
      question: 'Do you handle specialist framing, lighting and fine-art installation?',
      answer:
        'Yes. A great piece deserves proper presentation. We coordinate museum-grade framing, specialist art handlers, climate-controlled transit and discreet home installation so works are hung safely and beautifully.',
    },
    {
      question: 'Are you able to coordinate cross-border fine-art shipping and insurance?',
      answer:
        'We work with established international fine-art shippers who handle export licences, customs clearance, custom crating and transit insurance from gallery or auction house right to your wall.',
    },
  ],
  'rare-wines-spirits': [
    {
      question: 'Can you source specific birth-year vintages or rare whiskies for a milestone?',
      answer:
        'Yes. Working alongside long-established London wine merchants and rare-spirits specialists, we track down well-provenanced bottles — checking fill levels, storage history and condition before confirming availability and pricing.',
    },
    {
      question: 'Can you help design and stock a private home wine cellar?',
      answer:
        'We connect you with respected master sommeliers and merchants who curate balanced cellars tailored to what you genuinely love drinking — combining ready-to-pour bottles with fine vintages to lay down for future years.',
    },
    {
      question: 'How do you ensure fine wine is delivered in proper condition?',
      answer:
        'Fine bottles should never travel in an unrefrigerated van. We coordinate temperature-controlled specialist couriers and bonded-warehouse releases so provenance and cellar condition remain intact right to your dining room.',
    },
    {
      question: 'Can you arrange private tastings at home with a master sommelier?',
      answer:
        'Certainly. Hosting an evening tasting at home — paired with carefully matched small plates or a full private chef dinner — is a relaxed, memorable way to explore a region or rare producer with close friends.',
    },
  ],
  'automobiles-motoring': [
    {
      question: 'Can you help locate a specific classic or contemporary collector car?',
      answer:
        'Yes. We liaise discreetly with trusted UK and European marque specialists, private brokers and collector networks to uncover authentic, well-documented cars — including examples never advertised publicly.',
    },
    {
      question: 'Can you arrange specialist pre-purchase inspections and history verification?',
      answer:
        'Always. Before any money changes hands, we coordinate respected independent marque specialists to examine mechanical health, chassis originality, provenance files and restoration records — giving you clear, impartial peace of mind before you decide.',
    },
    {
      question: 'Can you assist with seasonal motoring storage, servicing and detailing?',
      answer:
        'Yes. We coordinate enclosed collection, marque servicing, concierge-grade detailing and climate-controlled storage so your car is delivered clean, fuelled and ready whenever you want to drive.',
    },
    {
      question: 'Can you arrange European driving tours or historic motorsport hospitality?',
      answer:
        'Gladly. We can have your own vehicle transported ahead to the Alps, Tuscany or Côte d’Azur — or arrange a vetted grand tourer locally — alongside scenic routes, boutique hotels and fine dining stops.',
    },
  ],
  'bespoke-gifts-commissions': [
    {
      question: 'What kinds of bespoke commissions can you arrange through British and European makers?',
      answer:
        'From hand-stitched luggage, bespoke trunks and engraved signet rings to custom fragrance blending, private portrait sittings, monogrammed cashmere and rare bookbinding — we introduce master workshops where craftsmanship still takes precedence.',
    },
    {
      question: 'How long do bespoke commissions typically take to create?',
      answer:
        'Lead times vary depending on the craft, ranging from a couple of weeks for personalised leatherwork or stationery to several months for fine jewellery or furniture. We give you realistic workshop timelines upfront so everything lands well before your target date.',
    },
    {
      question: 'Can I be involved in choosing materials, leathers or design sketches?',
      answer:
        'As much or as little as you like. We can arrange an intimate workshop visit or bring material swatches and design drawings directly to your home or our Mayfair office so you enjoy the creative part without the project chasing.',
    },
    {
      question: 'How are deposits and workshop milestones managed?',
      answer:
        'Every quote, deposit stage and delivery schedule is agreed clearly in writing with the maker before production begins, and we track progress quietly so you receive timely updates without needing to chase.',
    },
  ],
  'special-requests': [
    {
      question: 'What counts as a “special request” at TGLC?',
      answer:
        'Anything unusual, time-sensitive or deeply personal that does not sit neatly in a standard category — from tracking down an obscure heirloom edition or arranging a private after-hours surprise to solving a tricky cross-border logistical puzzle.',
    },
    {
      question: 'How do you assess whether an unusual request is realistically possible?',
      answer:
        'We give you a straight, honest answer quickly. We tap our specialist contacts to verify legality, feasibility, timing and real costs — and if something cannot be done cleanly or responsibly, we tell you candidly and propose a smart alternative.',
    },
    {
      question: 'Are all special requests handled within clear legal and ethical boundaries?',
      answer:
        'Always. Every arrangement we make is completely legitimate, properly licensed where required and respectful of venues, makers and local regulations — protecting both your peace of mind and your reputation.',
    },
    {
      question: 'How do I start if I only have a rough idea so far?',
      answer:
        'Simply call or send a brief voice note to your Mayfair lifestyle manager and talk it through out loud. Half the value of our desk is listening closely to a half-formed thought, asking the right two questions and turning it into a calm, memorable plan.',
    },
  ],
};

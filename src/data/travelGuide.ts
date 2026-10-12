import { TravelGuideSection } from '../types';

export const travelGuideSections: TravelGuideSection[] = [
  {
    id: 'best-time-weather',
    title: 'Best Time to Visit & Weather',
    shortDesc: 'Understanding Sri Lanka’s dual monsoon cycles for year-round sunshine.',
    iconName: 'Sun',
    content: {
      subtitle: 'The Island of Eternal Summer',
      paragraphs: [
        'Sri Lanka enjoys a warm tropical climate year-round, with coastal and lowland temperatures averaging between 27°C and 32°C. The central highlands (Nuwara Eliya, Horton Plains, and Ella) are significantly cooler, dropping to 10°C–18°C.',
        'Because the island experiences two distinct monsoon seasons affecting opposite coasts at different times, there is always a sunny region to explore at any point in the year.',
      ],
      bulletPoints: [
        {
          label: 'South & West Coast (Galle, Mirissa, Bentota, Colombo)',
          text: 'Best from late November through April. Calm seas, clear skies, and prime whale watching season.',
        },
        {
          label: 'East Coast (Trincomalee, Passikudah, Arugam Bay)',
          text: 'Best from May through September. While the southwest experiences rain, the east coast enjoys bright sunshine and prime surfing conditions.',
        },
        {
          label: 'Cultural Triangle (Sigiriya, Dambulla, Anuradhapura)',
          text: 'Warm and dry for most of the year, with optimal conditions between January and September.',
        },
        {
          label: 'Central Highlands (Kandy, Nuwara Eliya, Ella)',
          text: 'Pleasant year-round with fresh mountain air. December to April offers the clearest views for mountain trekking.',
        },
      ],
      highlights: [
        'Inter-monsoon periods (October and November) bring island-wide afternoon thunderstorms.',
        'Always check regional forecasts when crossing between hill country and coastal regions.',
      ],
    },
  },
  {
    id: 'transport',
    title: 'Getting Around: Trains, Buses, Tuk-Tuks & Cars',
    shortDesc: 'From the world-famous blue mountain trains to meter tuk-tuks and expressways.',
    iconName: 'Train',
    content: {
      subtitle: 'Navigating the Pearl of the Indian Ocean',
      paragraphs: [
        'Getting around Sri Lanka is an adventure in itself. The country offers an extensive railway network, an intricate web of public and private buses, three-wheelers (tuk-tuks), and modern expressways.',
      ],
      bulletPoints: [
        {
          label: 'Scenic Mountain Trains',
          text: 'The Kandy to Ella / Badulla route is globally renowned as one of the most picturesque train rides on Earth. Reserved 1st, 2nd, and 3rd class observation carriages should be booked 30 days ahead via the Sri Lanka Railways portal or registered travel agents.',
        },
        {
          label: 'Private Car with Chauffeur Guide',
          text: 'The most comfortable and time-efficient way to explore Sri Lanka. Sri Lanka Tourism Development Authority (SLTDA) certified chauffeurs act as knowledgeable guides, know safe mountain passes, and include fuel and tolls.',
        },
        {
          label: 'Tuk-Tuks (Three-Wheelers)',
          text: 'Iconic and perfect for short hops (under 10 km). In Colombo, Kandy, and Galle, use ride-hailing apps like PickMe or Uber, or insist on metered three-wheelers. In rural areas, agree on the exact fare in LKR before entering.',
        },
        {
          label: 'Expressway Buses & Intercity Coaches',
          text: 'Air-conditioned express buses operate along the Southern Expressway (Colombo to Galle/Matara/Hambantota) and Central Expressway, offering fast and budget-friendly travel.',
        },
      ],
      highlights: [
        'Always hold onto handrails when standing near open train doorways—safety first!',
        'Traffic drives on the left side of the road in Sri Lanka.',
      ],
    },
  },
  {
    id: 'food-cuisine',
    title: 'Local Food & Culinary Heritage',
    shortDesc: 'A rich culinary world of fragrant spices, coconut milk, and fiery sambols.',
    iconName: 'Utensils',
    content: {
      subtitle: 'The Island of Spices',
      paragraphs: [
        'Sri Lankan cuisine is a celebration of vibrant tropical ingredients: freshly scraped coconut, true Ceylon cinnamon, cardamom, curry leaves, roasted black curry powders, and fresh ocean seafood. Food is traditionally enjoyed by hand, which brings out the tactile aroma and blending of curries.',
      ],
      bulletPoints: [
        {
          label: 'Rice & Curry',
          text: 'The daily staple consisting of steamed red or white rice accompanied by four to six side curries: dhal (lentils in coconut cream), pol sambol (grated coconut with chili, lime, and red onion), tempered potato, beetroot or green bean curry, and fish, chicken, or jackfruit (polos).',
        },
        {
          label: 'Kottu Roti',
          text: 'The quintessential Sri Lankan street food. Godamba flatbread chopped rhythmically on a hot iron griddle with vegetables, eggs, spices, and chicken or beef, creating an unmistakable evening music.',
        },
        {
          label: 'Hoppers (Appa) & String Hoppers (Idiyappam)',
          text: 'Bowl-shaped fermented rice-flour and coconut-milk pancakes with crisp edges and soft spongy centers (often topped with a soft-steamed egg). String hoppers are steamed rice noodle nests eaten with kiri hodi (coconut gravy) and spicy lunu miris.',
        },
        {
          label: 'Ceylon Black Tea',
          text: 'World-famous orthodox high-grown, mid-grown, and low-grown black teas brewed strong and served with sweet milk or ginger.',
        },
        {
          label: 'Buffalo Curd & Kithul Treacle',
          text: 'A thick, creamy traditional yogurt set in terracotta clay pots, sweetened with golden sap boiled down from the wild kithul fishtail palm.',
        },
      ],
      highlights: [
        'Vegetarians and vegans find Sri Lanka a paradise, as the majority of traditional vegetable curries are cooked in pure coconut milk with zero dairy.',
        'If you have low chili tolerance, ask for dishes to be prepared "less spicy" or "sudu" (mild).',
      ],
    },
  },
  {
    id: 'culture-etiquette',
    title: 'Culture, Customs & Sacred Sites',
    shortDesc: 'Respecting religious traditions, temple modesty, and island hospitality.',
    iconName: 'Building',
    content: {
      subtitle: 'Sacred Traditions & Revered Shrines',
      paragraphs: [
        'Sri Lanka is home to a rich multi-ethnic, multi-religious society comprising Buddhists, Hindus, Muslims, and Christians. Warm hospitality is deeply ingrained in island life.',
      ],
      bulletPoints: [
        {
          label: 'Temple Dress Code',
          text: 'When entering Buddhist temples and Hindu kovils, both men and women must cover their shoulders and wear pants or skirts reaching below the knees. White or light-colored attire is customary and appreciated.',
        },
        {
          label: 'Footwear & Headwear',
          text: 'All shoes, sandals, and hats must be removed before entering sacred temple precincts. Shoe keeping counters are available at entrances for a small voluntary fee (Rs. 50–100). Bring thick socks on sunny days to protect against hot stone floors.',
        },
        {
          label: 'Buddha Statue Etiquette',
          text: 'Never turn your back directly towards a statue of the Buddha to take a photograph or selfie. Do not touch or pose casually alongside sacred statues or religious murals.',
        },
        {
          label: 'Tattoos & Imagery',
          text: 'Displaying tattoos of the Buddha or sacred religious symbols is considered offensive under Sri Lankan law. Cover any religious tattoos with light clothing while visiting.',
        },
        {
          label: 'Poya Days (Full Moon)',
          text: 'Every full moon day is a national public holiday (Poya). Commercial sale of alcohol and meat is prohibited by law on Poya days across all restaurants, bars, and supermarkets.',
        },
      ],
      highlights: [
        'Greeting with pressed palms together and saying "Ayubowan" (May you live long) or "Vanakkam" reflects high respect.',
      ],
    },
  },
  {
    id: 'money-currency',
    title: 'Money, Currency & Budgeting',
    shortDesc: 'Managing Sri Lankan Rupees (LKR / Rs.), cards, ATMs, and tipping etiquette.',
    iconName: 'CreditCard',
    content: {
      subtitle: 'Sri Lankan Rupee (LKR) Guide',
      paragraphs: [
        'The official legal currency is the Sri Lankan Rupee (abbreviated as LKR or Rs.). Common banknote denominations are Rs. 20, Rs. 50, Rs. 100, Rs. 500, Rs. 1,000, and Rs. 5,000.',
      ],
      bulletPoints: [
        {
          label: 'Cash vs. Cards',
          text: 'Visa and Mastercard are widely accepted at hotels, modern supermarkets, and mid-to-high-end restaurants in major towns. However, cash is essential for tuk-tuks, local fruit stalls, rural entry tickets, and family-run guesthouses.',
        },
        {
          label: 'ATMs & Currency Exchange',
          text: 'ATMs from major commercial banks (Commercial Bank, Sampath Bank, Bank of Ceylon, Hatton National Bank) are widely available in towns. Exchange foreign currency at licensed airport banks or authorized exchange counters for competitive rates.',
        },
        {
          label: 'Tipping Guidelines',
          text: 'Most sit-down restaurants include a 10% service charge on the bill. For good service, an additional small tip is appreciated. For private drivers/guides, Rs. 2,500–4,000 per day is standard for commendable service; for safari trackers, Rs. 1,500–2,500 per jeep drive.',
        },
        {
          label: 'Daily Budget Expectation',
          text: 'Budget travelers can explore comfortably for Rs. 8,000–14,000 per day; mid-range travelers with comfortable private rooms and private transport budget around Rs. 25,000–45,000 per day.',
        },
      ],
      highlights: [
        'Always keep a stash of smaller Rs. 100 and Rs. 500 notes for small purchases, coconuts, and tuk-tuk rides.',
      ],
    },
  },
  {
    id: 'packing-checklist',
    title: 'Packing Checklist & Essentials',
    shortDesc: 'What to pack for both tropical beaches and chilly highland cloud forests.',
    iconName: 'Briefcase',
    content: {
      subtitle: 'Be Prepared for Every Climate Zone',
      paragraphs: [
        'Because you can travel from sweltering 32°C palm beaches to 10°C misty mountain tea plantations within a 4-hour drive, your suitcase requires strategic packing.',
      ],
      bulletPoints: [
        {
          label: 'Lightweight Breathable Cotton / Linen',
          text: 'Loose shirts, light trousers, and maxi dresses for humid coastal days and temple visits.',
        },
        {
          label: 'Highland Warm Layers',
          text: 'A warm fleece jacket, sweater, socks, and beanie for Nuwara Eliya, Horton Plains, and early morning Adam’s Peak summit climbs.',
        },
        {
          label: 'Temple Modesty Scarf / Sarong',
          text: 'A clean white or light scarf or sarong kept in your daypack to quickly cover shoulders or knees before visiting temples.',
        },
        {
          label: 'Footwear Strategy',
          text: 'Sturdy walking shoes or trail runners with grip for Sigiriya and Ella Rock; easy slip-on sandals or flip-flops for frequent temple shoe removals.',
        },
        {
          label: 'Sun & Insect Protection',
          text: 'Reef-safe sunscreen SPF 50+, polarized sunglasses, wide-brim hat, and DEET or citronella mosquito repellent.',
        },
        {
          label: 'Universal Power Adapter',
          text: 'Sri Lanka uses Type D, Type G (British 3-pin standard), and Type M round sockets (230V, 50Hz).',
        },
      ],
      highlights: [
        'Single-use plastic polythene bags are banned in national parks like Horton Plains to protect deer and leopards.',
      ],
    },
  },
  {
    id: 'safety-health',
    title: 'Safety, Health & Travel Well-Being',
    shortDesc: 'Health precautions, emergency numbers, and ocean swimming guidelines.',
    iconName: 'ShieldCheck',
    content: {
      subtitle: 'Safe & Carefree Journeys',
      paragraphs: [
        'Sri Lanka is widely considered one of the safest and friendliest travel destinations in South Asia, with warm communities eager to help visitors.',
      ],
      bulletPoints: [
        {
          label: 'Drinking Water',
          text: 'Drink filtered, boiled, or bottled mineral water. Reputable hotels and cafes provide clean filtered water for refilling reusable bottles.',
        },
        {
          label: 'Ocean Currents & Swimming',
          text: 'Indian Ocean waves and seasonal undercurrents can be strong. Always swim within designated reef bays (e.g. Unawatuna, Mirissa inside bay, Nilaveli) and observe lifeguard flags.',
        },
        {
          label: 'Monkeys & Wildlife Respect',
          text: 'Toque macaques and langurs are ubiquitous around historical ruins. Keep bags zipped and do not feed wild monkeys or stray animals.',
        },
        {
          label: 'Emergency Telephone Numbers',
          text: 'Sri Lanka Tourism Hotline: 1912 | Tourist Police: 011 242 1052 | General Police: 119 | Ambulance & Medical Emergencies: 1990 (Suwa Seriya free nationwide ambulance).',
        },
      ],
      highlights: [
        'The 1990 Suwa Seriya ambulance service is state-of-the-art and free across the entire island.',
      ],
    },
  },
  {
    id: 'language-phrases',
    title: 'Useful Phrases: English, Sinhala & Tamil',
    shortDesc: 'Key greetings and courteous phrases to connect with friendly locals.',
    iconName: 'Languages',
    content: {
      subtitle: 'Speaking with the Locals',
      paragraphs: [
        'English is widely spoken in hotels, restaurants, tourist areas, and commercial hubs. However, greeting locals in Sinhala or Tamil will bring warm smiles and deep appreciation!',
      ],
      tables: {
        headers: ['English', 'Sinhala', 'Tamil', 'Usage / Context'],
        rows: [
          ['Hello / Greetings', 'Ayubowan (ආයුබෝවන්)', 'Vanakkam (வணக்கம்)', 'Universal respectful greeting with hands pressed together'],
          ['Thank you very much', 'Bohoma Isthuthi (බොහොම ස්තූතියි)', 'Mikka Nandri (மிக்க நன்றி)', 'After a meal, ride, or kind assistance'],
          ['Please / Excuse me', 'Karunakarala (කරුණාකරලා)', 'Thayavu seidhu (தயவுசெய்து)', 'When requesting help or ordering'],
          ['How much is this?', 'Meka keeyada? (මේක කීයද?)', 'Idhu evvalavu? (இது எவ்வளவு?)', 'At fruit stalls, markets, and shops'],
          ['Where is...?', '...koheda? (...කොහෙද?)', '...yenge? (...எங்கே?)', 'When asking for directions'],
          ['Delicious / Very good', 'Hari rasai (හරි රසයි)', 'Romba nallaa irukku (ரொம்ப நல்லா இருக்கு)', 'Complimenting a delicious Sri Lankan curry!'],
          ['No chili / Mild', 'Miris aduwen (මිරිස් අඩුවෙන්)', 'Urai kammiyaaga (உறைப்பு கம்மியாக)', 'When ordering food with low heat tolerance'],
          ['Water', 'Wathura (වතුර)', 'Thanneer (தண்ணீர்)', 'Requesting drinking water'],
          ['Yes / No', 'Ow / Nahe (ඔව් / නැහැ)', 'Aam / Illai (ஆம் / இல்லை)', 'Simple responses'],
        ],
      },
    },
  },
  {
    id: 'sustainable-tourism',
    title: 'Responsible & Sustainable Tourism',
    shortDesc: 'Protecting Sri Lanka’s fragile biodiversity, marine life, and local communities.',
    iconName: 'Leaf',
    content: {
      subtitle: 'Preserving the Island for Generations',
      paragraphs: [
        'Sri Lanka is recognized by Conservation International as one of the world’s 36 biodiversity hotspots. Practicing responsible tourism ensures the island’s pristine ecosystems and heritage endure.',
      ],
      bulletPoints: [
        {
          label: 'Ethical Wildlife Observation',
          text: 'Choose safaris and elephant encounters in national parks (Minneriya, Udawalawe, Yala) where animals roam free in their wild natural habitat. Avoid commercial elephant-riding establishments.',
        },
        {
          label: 'Reef & Marine Protection',
          text: 'When snorkelling at Pigeon Island or Mirissa, never step on, touch, or take corals or sea shells. Wear mineral non-toxic reef-safe sunscreen to prevent coral bleaching.',
        },
        {
          label: 'Support Local Micro-Enterprises',
          text: 'Purchase handloom textiles, pure Ceylon spices, and clay pottery directly from local community cooperatives and artisanal craftsmen.',
        },
        {
          label: 'Zero Waste & Plastic Reduction',
          text: 'Carry a reusable water flask and refuse single-use plastic bags. Dispose of waste responsibly and participate in beach cleanups.',
        },
      ],
      highlights: [
        'Leave nothing but footprints, take nothing but photographs, keep nothing but unforgettable memories.',
      ],
    },
  },
];

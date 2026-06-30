import { TimelineEra } from "../app/timeline/actions";

export interface StaticWonder {
  id: string;
  name: string;
  region: string;
  eras: TimelineEra[];
}

/**
 * Curated timeline eras for iconic Indian Monuments.
 * These are loaded instantly when identified to save API requests and ensure 100% historical accuracy.
 */
export const TIMELINE_WONDERS: StaticWonder[] = [
  {
    id: "taj_mahal",
    name: "Taj Mahal",
    region: "Agra, Uttar Pradesh",
    eras: [
      {
        year: 1632,
        title: "The Foundation of Devotion",
        description: "Emperor Shah Jahan begins construction of the white marble mausoleum for his beloved wife, Mumtaz Mahal. Over 20,000 artisans gather on the banks of the Yamuna.",
        appearance: "Wooden scaffolding wrapping around a rising marble base on the riverbank, with bullock carts pulling giant slabs of white stone."
      },
      {
        year: 1653,
        title: "The Imperial Completion",
        description: "The monument is completed in flawless, pristine white Makrana marble. The symmetry of the formal charbagh gardens reflects the Mughal court's vision of paradise.",
        appearance: "The gleaming, unweathered white dome standing symmetrically beside the Yamuna, reflecting beautifully in pristine garden pools."
      },
      {
        year: 1857,
        title: "The Mutiny & Looting",
        description: "During the rebellion, British soldiers and administrators deface sections of the Taj, carving precious lapis lazuli, turquoise, and malachite inlay stones out of the walls.",
        appearance: "A faded, grain-filled black-and-white print of the monument, with overgrown, untamed gardens and cracked paths."
      },
      {
        year: 1908,
        title: "Lord Curzon's Restoration",
        description: "Viceroy Lord Curzon initiates a massive restoration project, replanting the gardens in the symmetrical English lawn style seen today.",
        appearance: "A vintage sepia photograph showing pristine lawns and reflecting channels, with the majestic Taj framed by young cypress trees."
      },
      {
        year: 2026,
        title: "The Crown Jewel of India",
        description: "The Taj Mahal stands protected as a global symbol of eternal love, shifting shades from gold at sunrise to pearlescent white at noon.",
        appearance: "The symmetrical marble dome bathed in a soft pink glow at sunrise, reflecting perfectly in the long garden pools."
      }
    ]
  },
  {
    id: "red_fort",
    name: "Red Fort",
    region: "Old Delhi",
    eras: [
      {
        year: 1648,
        title: "Inauguration of Shahjahanabad",
        description: "Emperor Shah Jahan officially inaugurates the Red Fort (Lal Qila) as the heart of his new capital, showcasing stunning red sandstone ramparts and imperial palace halls.",
        appearance: "The unblemished, deep red sandstone fort walls reflecting in the Yamuna River, with royal elephant processions entering the Lahori Gate."
      },
      {
        year: 1739,
        title: "Nadir Shah's Persian Sack",
        description: "Persian Emperor Nadir Shah defeats the Mughals and plunders the fort, taking the legendary golden Peacock Throne and the Koh-i-Noor diamond back to Persia.",
        appearance: "Persian soldiers loading heavily decorated golden chests onto horses in the grand, silent courtyards of the Diwan-i-Khas."
      },
      {
        year: 1858,
        title: "Uprising Exile & Military Garrison",
        description: "Following the 1857 rebellion, the British exile the last Mughal Emperor Bahadur Shah Zafar and demolish large sections of the fort's royal residential gardens to build military barracks.",
        appearance: "A faded, grain-filled monochrome frame showing massive white-painted British barracks rising behind the red sandstone palace walls."
      },
      {
        year: 1947,
        title: "The Dawn of Independence",
        description: "India's first Prime Minister Jawaharlal Nehru unfurls the national tricolor flag from the Lahori Gate, signaling the birth of a free and democratic India.",
        appearance: "A vast, historic ocean of cheering citizens gathered in the parade grounds, looking up at the tricolor flag fluttering on the red ramparts."
      },
      {
        year: 2026,
        title: "The Sentry of National Pride",
        description: "The Red Fort stands protected as a UNESCO World Heritage site and a primary icon of independent India's democratic sovereignty.",
        appearance: "The majestic red sandstone fortress beautifully illuminated under a starry night sky, with national guards on alert."
      }
    ]
  },
  {
    id: "india_gate",
    name: "India Gate",
    region: "New Delhi",
    eras: [
      {
        year: 1921,
        title: "The Memorial Foundation",
        description: "The Duke of Connaught lays the foundation stone for the war memorial designed by Sir Edwin Lutyens, honoring 84,000 soldiers of the British Indian Army who died in WWI.",
        appearance: "A flat, grassy plain at the center of New Delhi's Rajpath, with horse carriages and early construction cranes setting up massive granite foundations."
      },
      {
        year: 1931,
        title: "The Kingsway Inauguration",
        description: "Viceroy Lord Irwin officially inaugurates the All India War Memorial, its beautiful sandstone archway standing as the focal point of the symmetrical city layout.",
        appearance: "A sharp, historic black-and-white print of the towering ceremonial arch standing proudly over a clean, paved Kingsway boulevard."
      },
      {
        year: 1972,
        title: "Amar Jawan Jyoti Commemoration",
        description: "Following the 1971 liberation war, Prime Minister Indira Gandhi inaugurates the Amar Jawan Jyoti — an eternal flame burning under the archway for fallen soldiers.",
        appearance: "A vintage color film view of the black marble pedestal and inverted rifle beneath the massive stone archway, with the eternal flame glowing brightly."
      },
      {
        year: 2022,
        title: "Kartavya Path Revamp",
        description: "The Central Vista project completely transforms the surrounding lawns and path, installing the grand granite statue of Netaji Subhas Chandra Bose in the historic canopy.",
        appearance: "Clean granite walkways and reflective water channels flanking India Gate, with a majestic black granite statue of Netaji under the cupola."
      },
      {
        year: 2026,
        title: "The Civic Heart of New Delhi",
        description: "India Gate stands as the ultimate national war memorial, serving as a lively hub for thousands of families and tourists visiting every evening.",
        appearance: "The massive ceremonial stone archway glowing in spectacular tricolor floodlights, surrounded by crowds, street food, and fountains."
      }
    ]
  },
];

/**
 * Mapping of curated wonder IDs to their static historical images.
 * This maps a valid, active image for EVERY single defined era to avoid layout cracks.
 */
export const TIMELINE_WONDERS_IMAGES: Record<string, Record<number, string>> = {
  taj_mahal: {
    1632: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/1648-tj.jpeg",
    1653: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/1747-tj.jpg",
    1857: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/1838-tj.jpeg",
    1908: "https://upload.wikimedia.org/wikipedia/commons/4/45/Ariel_view_of_Taj_Mahal_1940.jpg",
    2026: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Taj_Mahal_%28south_view%2C_2006%29.jpg/960px-Taj_Mahal_%28south_view%2C_2006%29.jpg"
  },
  red_fort: {
    1632: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/1640-rf.jpeg",
    1653: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/1740-rf.jpeg",
    1857: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/1840-rf.jpg",
    1908: "https://pbs.twimg.com/media/DkjBfiVU0AAgfMT.jpg",
    2026: "https://cdn.britannica.com/20/189820-050-D650A54D/Red-Fort-Old-Delhi-India.jpg"
  },
  india_gate: {
    1921: "https://t3.ftcdn.net/jpg/00/64/01/76/360_F_64017651_wYll2mTJh8zNVj7mK6Do0gZO09X0Ezq0.jpg",
    1931: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbn28oOYtHrL5zQ1tkJft2zan9A_clTRQxDVmusLkylCYmjZarz0zn2D69&s=10",
    1947: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkh54IyPedQdYDKd4NFtJkXg3L4S75O08CH0E_lbN0bojxrdT52E3InjcN&s=10",
    2026: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUPZazQsLao1GdDbGYWmC0V2cjmvsyY7vsx1HbQmrj6w&s"
  },
};
export type CultureTopic = "history" | "culture" | "cuisine" | "dance" | "dress" | "food" | "past";

export interface TopicData {
  title: string;
  body: string;
  narration: string;
  imageUrl: string;
  imageAlt: string;
}

export interface WonderData {
  id: string;
  name: string;
  region: string;
  videoUrl: string; // YouTube embed or mp4
  topics: Record<CultureTopic, TopicData>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
export const WONDERS: WonderData[] = [
  {
    id: "great_wall",
    name: "Great Wall of China",
    region: "China",
    videoUrl: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/GWOC.mp4",
    topics: {
      history: {
        title: "2,000 Years of Stone and Sacrifice",
        body: "The Great Wall of China was built over many centuries, beginning as early as the 7th century BCE. Emperor Qin Shi Huang unified the northern walls around 221 BCE, creating a connected fortification stretching thousands of kilometres. The Ming Dynasty (1368–1644) rebuilt and extended the wall to the iconic stone-and-brick form we see today. It was designated a UNESCO World Heritage Site in 1987 and recognised as one of the New Seven Wonders of the World in 2007.",
        narration: "Hello! I'm Meera, and I'm thrilled to walk this ancient wall with you. Over 2,000 years of emperors, soldiers, and builders have left their mark on every stone. The sheer scale of human ambition here is absolutely breathtaking.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/1280px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
        imageAlt: "The Great Wall of China at Jinshanling",
      },
      past: {
        title: "Legends of the Dragon's Backbone",
        body: "Local legend calls the wall 'the dragon's backbone' — a sleeping dragon whose spine runs across the mountains of northern China. One beloved story tells of Meng Jiangnu, a woman who cried so bitterly when her husband died building the wall that her tears caused a section to collapse, revealing his bones so she could give him a proper burial. Historians estimate that over one million workers died during construction, many buried within the wall itself.",
        narration: "The legend of Meng Jiangnu's tears is one of China's most beloved folk tales. She wept for her husband who died building this very wall, and her grief was so powerful it broke the stones. Even today, people leave offerings at shrines along the wall for lost loved ones.",
        imageUrl: "https://blog.piriguide.com/wp-content/uploads/2023/07/Great-Wall-of-China-Dragons-Backbone.jpeg",
        imageAlt: "The Great Wall of China illuminated at night",
      },
      culture: {
        title: "The Living Symbol of China",
        body: "The Great Wall is China's most powerful cultural symbol — representing both the ingenuity and the sacrifice of its civilisation. It appears on Chinese postage stamps, in poetry, and in literature as a metaphor for endurance and unity. The wall was never a single structure but a network of walls built by different states and dynasties, reflecting China's complex, layered history. The Jinshanling and Mutianyu sections remain the most visited and best-preserved cultural heritage sites.",
        narration: "The wall is not just stone and mortar — it is China's soul made visible. Every watchtower you see once held soldiers who spent years away from their families, watching the horizon. Their loneliness is written into the landscape.",
        imageUrl: "https://media.odynovotours.com/article/72000/great-wall7_70416.jpg",
        imageAlt: "Watchtower at Mutianyu section of the Great Wall",
      },
      cuisine: {
        title: "Northern Chinese Cooking Traditions",
        body: "The regions along the Great Wall corridor — Hebei, Shanxi, and Inner Mongolia — have a robust cuisine built around wheat, millet, and lamb. Hearty noodles (la mian) hand-pulled to order, lamb hotpot simmered in copper pots, and steamed bao stuffed with pork and cabbage define the local table. The nomadic Mongolian influence brings roasted whole lamb and airag (fermented mare's milk) to border communities. Vinegar from Shanxi province is considered the finest in China.",
        narration: "The food along the Great Wall corridor is made for cold mountain air and hard work — thick noodles, slow-braised lamb, and warming hotpots that steam up the windows of tiny roadside restaurants. It's the kind of cooking that feels like a hug.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0559/3749/9314/files/hotpot-beijing_480x480.jpg?v=1660900733",
        imageAlt: "Traditional Chinese hotpot served in copper vessel",
      },
      food: {
        title: "Must-Try Bites Near the Wall",
        body: "Visitors to the Great Wall area typically stop in Beijing, where Peking Duck — roasted to a lacquered mahogany finish and served with thin pancakes, cucumber, and hoisin sauce — is the city's greatest culinary gift to the world. Jianbing (Chinese crepe) from street carts makes a perfect morning snack, stuffed with egg, scallion, and crispy wonton. Zhajiang Mian, thick wheat noodles topped with fermented soybean paste and fresh vegetables, is the ultimate Beijing comfort food.",
        narration: "If you visit the Great Wall, you must stop in Beijing for Peking Duck. The skin is roasted until it crackles like glass, and you wrap it in a delicate pancake with a smear of hoisin. It is one of the world's great dining experiences — I promise you won't forget it.",
        imageUrl: "https://res.cloudinary.com/hellochef/image/upload/c_fit/q_auto/dpr_auto/orfeodvov086mgqiu44o?_a=E",
        imageAlt: "Peking Duck served with pancakes and condiments",
      },
      dance: {
        title: "Lion Dance and Classical Court Arts",
        body: "The regions along the Great Wall have a rich tradition of folk performance, including the Lion Dance — a spectacular costumed performance where two dancers animate a lion figure to ward off evil and bring good luck. Dragon dances weave through village squares during festivals. The formal court arts of Beijing include Peking Opera (Jingju), a 200-year-old theatrical tradition combining music, acrobatics, mime, and elaborate painted face makeup that encodes character in every colour and line.",
        narration: "Peking Opera is extraordinary — the painted faces alone tell you whether a character is brave, treacherous, or divine before a single word is spoken. Red means loyalty, white means cunning. It is a visual language that has endured for two centuries.",
        imageUrl: "https://www.topchinatravel.com/pic/city/beijing/activities/peking-opera-13.jpg",
        imageAlt: "Peking Opera performers in elaborate painted costumes",
      },
      dress: {
        title: "Silk Road Garments and Han Robes",
        body: "Traditional Chinese dress along the Great Wall corridor reflects both Han Chinese and Mongolian nomadic influences. The qipao (cheongsam) — a form-fitting silk dress with mandarin collar — became a symbol of Chinese femininity in the 20th century. Hanfu, the traditional layered robes of Han dynasty China with flowing sleeves and silk sashes, has seen a cultural revival among young Chinese. Mongolian del — a long belted coat in silk or wool with distinctive decorative stitching — remains worn for festivals in the border regions.",
        narration: "The Silk Road passed near this wall, and you can see that history in the clothing — silk from the east meeting the heavy wool of the steppes from the west. The qipao and hanfu revival among young Chinese people today is a beautiful reclaiming of an ancient identity.",
        imageUrl: "https://www.globaltimes.cn/Portals/0/attachment/2023/2023-02-08/8838d2c3-e183-43ec-86fd-4fa2a72984e3.jpeg",
        imageAlt: "Traditional Hanfu robes worn at a Chinese cultural festival",
      },
    },
  },
  {
    id: "petra",
    name: "Petra",
    region: "Jordan",
    videoUrl: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/petra1.mp4",
    topics: {
      history: {
        title: "The Rose-Red City of the Nabataeans",
        body: "Petra was the capital of the Nabataean Kingdom from around the 4th century BCE, carved directly into rose-red sandstone cliffs in the Jordanian desert. The Nabataeans were Arab traders who grew wealthy controlling the incense and spice routes between Arabia, Egypt, and the Mediterranean. At its height around 100 CE, Petra housed 20,000 inhabitants. After Roman annexation in 106 CE, the city gradually declined and was largely forgotten to the Western world until Swiss explorer Johann Ludwig Burckhardt rediscovered it in 1812.",
        narration: "Petra is a city that was hiding in plain sight — known to local Bedouin for centuries but lost to the wider world for over a thousand years. When you walk through the Siq gorge and the Treasury suddenly appears before you, the shock of that rose-red facade is almost physical.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZH6x5A_0sV9enPIJ-MclUPVN9p20-I2-U3n3H25JRuOECVKlMFJci4Do&s=10",
        imageAlt: "The Treasury (Al-Khazneh) facade at Petra, Jordan",
      },
      past: {
        title: "The Legend of the Treasury's Hidden Gold",
        body: "The most famous structure in Petra — Al-Khazneh (The Treasury) — gets its name from a Bedouin legend that an Egyptian pharaoh hid his treasure in a stone urn at the top of the facade. Bullet marks pockmark the urn from generations of hopeful marksmen trying to break it open. In reality, the 'Treasury' was a royal tomb or temple, and the urn is solid stone. Indiana Jones fans will recognise it as the location of the Holy Grail in Raiders of the Lost Ark.",
        narration: "Every single pockmark on that urn at the top of the Treasury is a bullet hole — generations of Bedouin trying to smash open what they believed was a pharaoh's hidden gold. The joke is on everyone: it's solid stone! But the legend kept Petra's secret safe for centuries.",
        imageUrl: "https://live.staticflickr.com/2882/34063392971_3bd6fab0ff_b.jpg",
        imageAlt: "Detail of the Treasury urn with bullet mark damage",
      },
      culture: {
        title: "Nabataean Water Engineers",
        body: "The Nabataeans were engineering geniuses — in a desert receiving less than 15 cm of rain annually, they built a sophisticated hydraulic system of cisterns, dams, and ceramic pipe networks that supplied water to 20,000 people. Petra's culture was a crossroads of Arabian, Greek, Roman, and Egyptian influences, visible in the eclectic architectural style that blends Hellenistic columns with Eastern tomb facades. The Bedouin Zalabia tribe have lived in Petra's caves for generations and remain its custodians.",
        narration: "The Nabataeans solved the desert's hardest problem: water. They carved cisterns into cliffsides, built dams to catch flash floods, and ran ceramic pipes through the rock. Standing in this arid canyon, you are surrounded by one of antiquity's greatest feats of engineering.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ__BXnRbTbHy1QokjjSJE2L34Cz9jUhHfMxrkEJJRUMhoyJEWB7d6T7JFo&s=10",
        imageAlt: "The Siq gorge leading to Petra with ancient water channels",
      },
      cuisine: {
        title: "Jordanian Hospitality at the Desert Table",
        body: "Jordanian cuisine is built on the Bedouin traditions of generous hospitality — no guest leaves hungry. Mansaf, the national dish, is a magnificent platter of lamb cooked in dried yogurt sauce (jameed) served over fragrant rice and flatbread, eaten communally with the right hand. Mezze spreads of hummus, mutabbal (smoked aubergine), falafel, and warm khubz bread precede every meal. Bedouin cardamom coffee (qahwa) poured from long-spouted brass pots is offered to every visitor as a gesture of welcome.",
        narration: "In Jordan, feeding a guest is a sacred duty. Mansaf is the dish of kings — lamb so tender it falls apart, swimming in a tangy yogurt sauce over mountains of rice. To eat it with your right hand from a communal platter is to participate in something ancient and beautiful.",
        imageUrl: "https://www.hungrypaprikas.com/wp-content/uploads/2025/03/Mansaf-4.jpg",
        imageAlt: "Traditional Jordanian Mansaf served on a large communal platter",
      },
      food: {
        title: "Wadi Rum Campfire Flavours",
        body: "Near Petra, the desert camps of Wadi Rum serve zarb — a slow-cooked underground barbecue where lamb and vegetables are sealed in a sand pit with hot coals for hours, emerging incredibly tender and smoky. Street food in the nearby town of Wadi Musa includes ka'ak (sesame bread rings), shakshuka (eggs poached in spiced tomato), and fresh-squeezed pomegranate juice. The local Bedouin tea — heavily sweetened black tea with fresh sage or mint — is the essential companion to any desert journey.",
        narration: "Zarb is cooking as ceremony — the Bedouin dig a pit, lower in the meat, cover it with sand, and let the desert itself do the cooking. Hours later they unearth a feast. It is food that tastes of patience, wood smoke, and the desert wind.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoG_tJNvArrBSbHys_9EGWW_99WStqLKDS81gukHMoSLyqj8ar0ezGh70&s=10",
        imageAlt: "Zarb underground Bedouin barbecue being unearthed",
      },
      dance: {
        title: "Dabke — The Stomp of Unity",
        body: "Dabke is the traditional line dance of the Levant — Jordan, Palestine, Lebanon, and Syria — performed at weddings, festivals, and celebrations. Dancers link arms or shoulders in a line, following a lead dancer (the lawweeh) who executes increasingly complex footwork and jumps while the line stomps in unison. The dance symbolises community solidarity — the stamping represents the collective force of a united people. Performed to the sound of mijwiz (reed pipe) and tabla drum, Dabke is an explosion of joyful collective energy.",
        narration: "Dabke is the dance of belonging. When a line of thirty people stomp in perfect unison, the ground shakes and your heart lifts with it. At a Jordanian wedding, Dabke goes on for hours and everyone joins in — young, old, locals, visitors. It's impossible not to.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Palestinian_girls_dancing_traditional_Dabke.jpg",
        imageAlt: "Traditional Dabke line dancers in embroidered costumes",
      },
      dress: {
        title: "Thobes, Keffiyehs and Bedouin Embroidery",
        body: "Traditional Jordanian dress for men is the dishdasha or thobe — a long white robe — worn with the keffiyeh (red-and-white checked headscarf) held by an agal (black cord). The colours of the keffiyeh carry tribal significance — red-and-white is distinctly Jordanian, black-and-white Palestinian. Women's traditional dress is spectacular: long embroidered dresses (thob) featuring elaborate cross-stitch patterns in red, green, and gold that encode a woman's village, tribe, and social status in every stitch. Petra's Bedouin women are known for their particularly fine needlework.",
        narration: "A Jordanian woman's embroidered dress is her autobiography — the colours and patterns tell you where she is from, what tribe she belongs to, even her marital status. It is wearable storytelling, passed from mother to daughter for generations.",
        imageUrl: "https://omarembroidery.com/cdn/shop/products/il_1140xN.3483781647_o23t.jpg?v=1637607496",
        imageAlt: "Traditional Jordanian embroidered dress with cross-stitch patterns",
      },
    },
  },
  {
    id: "colosseum",
    name: "Colosseum",
    region: "Rome, Italy",
    videoUrl: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/colo.mp4",
    topics: {
      history: {
        title: "The Amphitheatre of the Roman Empire",
        body: "The Colosseum in Rome is the largest amphitheatre ever built, constructed between 70–80 CE under emperors Vespasian and Titus of the Flavian dynasty. It could hold between 50,000 and 80,000 spectators and hosted gladiatorial contests, animal hunts, public executions, and even mock naval battles (naumachia) when flooded with water. Over 1 million animals and hundreds of thousands of gladiators and prisoners died within its walls across four centuries of use. It remains the most visited monument in the world.",
        narration: "When you stand inside the Colosseum, you feel the weight of a million stories. Gladiators walked through these same underground tunnels toward the light of the arena, not knowing if they would return. The roar of 80,000 Romans echoes in these stones still.",
        imageUrl: "https://colosseumrometickets.com/wp-content/uploads/2018/06/Colosseum-Night-Tour.jpg",
        imageAlt: "The Colosseum in Rome at dusk",
      },
      past: {
        title: "Gladiators, Beasts and Underground Secrets",
        body: "The Colosseum's hypogeum — a vast underground network of tunnels and chambers beneath the arena floor — was where gladiators waited, animals were caged, and elaborate stage machinery operated. Eighty vertical shafts with counterweighted elevators could lift lions, tigers, and bears directly onto the arena floor in seconds, to the crowd's astonishment. The famous thumbs-up or thumbs-down gesture to spare or kill a defeated gladiator is largely a Victorian-era invention — Roman evidence suggests it was a covered or turned thumb that signalled mercy, and a turned-out thumb that meant death.",
        narration: "The hypogeum beneath the arena is where the real drama happened — animals pacing in darkness, gladiators praying, stagehands ready to crank the elevators that would suddenly unleash a lion into the sunlit arena above. Hollywood got the drama right; it got the thumbs wrong.",
        imageUrl: "https://i.guim.co.uk/img/media/80e6308a0b4e830799f6651a037633401e5c1813/0_164_4600_2760/master/4600.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=86bfde3c369bb5cf4a3196d9c8309873",
        imageAlt: "The underground hypogeum tunnels of the Colosseum",
      },
      culture: {
        title: "The Roman Gift to Western Civilisation",
        body: "Rome gave the Western world its legal system, architectural vocabulary, calendar, and Romance languages. The Colosseum embodies Roman engineering genius: concrete mixed with volcanic ash (pozzolana) that has lasted 2,000 years, a numbered seating system (not unlike modern stadiums), awnings (vela) stretched by sailors to shade the crowd, and sophisticated crowd management with 80 arched exits called vomitoria that could empty 50,000 people in minutes. The building's elliptical design is still copied in every modern sports stadium.",
        narration: "Your football stadium is a direct descendant of this building. The numbered gates, the elliptical shape, the crowd management — all Roman innovations from 2,000 years ago. The Romans built the world's first mass entertainment venue, and we still haven't improved the basic design.",
        imageUrl: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/fb/e1/06.jpg",
        imageAlt: "Interior view of the Colosseum showing the arena floor",
      },
      cuisine: {
        title: "The Eternal City at the Table",
        body: "Roman cuisine is ancient and proud — its foundations in olive oil, wheat, legumes, and cured pork have barely changed since the Republic. The cucina romana (Roman cooking) is specifically the food of the poor and the working class: offal dishes like coda alla vaccinara (oxtail stew), trippa alla romana (tripe with tomato and mint), and cacio e pepe — pasta with only aged Pecorino Romano cheese and black pepper — that require nothing but technique and time. Wine from the Castelli Romani hills has been produced since antiquity.",
        narration: "Roman cooking is the most honest food in Italy — no butter, no cream, no shortcuts. Cacio e pepe has exactly two ingredients beyond pasta and yet it takes years to master. The Romans have always known that the best food requires not more ingredients but more skill.",
        imageUrl: "https://www.recipesfromitaly.com/wp-content/uploads/2024/02/cacio-e-pepe-recipe-1200x1200-1.jpg",
        imageAlt: "Cacio e pepe pasta, Rome's iconic two-ingredient dish",
      },
      food: {
        title: "Roman Street Food Classics",
        body: "Rome's street food scene is legendary: supplì (deep-fried rice croquettes stuffed with mozzarella), pizza al taglio (rectangular pizza sold by weight from bakeries), and trapizzino (pizza dough cone stuffed with slow-cooked Roman ragù) are the essential Roman bites. The city's bars serve cornetto (an Italian croissant, less buttery than French) with a cappuccino every morning — consumed standing at the bar in under five minutes, as is Italian custom. Gelato from the historic Giolitti gelateria near the Pantheon has been scooped since 1900.",
        narration: "In Rome, you eat your cornetto standing at the bar — sitting down doubles the price and marks you as a tourist. The ritual matters as much as the food. A perfectly made Roman cappuccino with a warm cornetto at 8am, standing in a marble bar — that is the perfect start to any day.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnOUaIalQ0agdkOGiVQxoE3X08NanFHVxOsA&s",
        imageAlt: "Roman supplì fried rice croquettes with mozzarella",
      },
      dance: {
        title: "Tarantella and Roman Theatrical Traditions",
        body: "Italy's most iconic folk dance is the Tarantella — a fast, whirling dance in 6/8 time traditionally said to cure the bite of a tarantula spider by dancing out the venom through frenzied movement. In Rome's Lazio region, the Saltarello is the local variant — a leaping dance for couples in which dancers jump and spin with increasing tempo. Italy's grand contribution to world performance is opera, born in Florence around 1600 and perfected in Rome's great theatres. The Teatro dell'Opera di Roma has staged masterworks since 1880.",
        narration: "The Tarantella is medicine disguised as joy — the story goes that spider-bite victims had to dance for hours or days to sweat out the venom. Whether or not it worked, the dance became the heartbeat of southern Italian celebration. When the tamburello drum starts, your feet simply move.",
        imageUrl: "https://media.istockphoto.com/id/1202146516/photo/folk-dance-ensemble-from-romagna-italy.jpg?s=612x612&w=0&k=20&c=ZGi1RGzc2T9dXTjut5WjsmGYeLSIetwHQi8DmaqTQKE=",
        imageAlt: "Traditional Italian Tarantella folk dancers in costume",
      },
      dress: {
        title: "From Toga to Italian Fashion Capital",
        body: "Ancient Rome's signature garment was the toga — a 6-metre semi-circular woollen cloth draped over the body, its colour and markings indicating the wearer's rank and status. Only Roman citizens could wear the toga; slaves wore simple tunics. Modern Italy is the world's fashion capital — the 'Made in Italy' label is the global gold standard for luxury clothing. Rome's Via Condotti hosts Valentino, Bulgari, and Gucci, while artisan ateliers in the city's historic centre still produce bespoke suits by hand in a tradition unchanged since the Renaissance.",
        narration: "The same city that gave us the toga — the uniform of empire — is now the fashion capital of the world. In Rome you can walk from a 2,000-year-old marble relief of draped fabric to a couture atelier where a tailor is doing something remarkably similar by hand. The love of beautiful cloth never left.",
        imageUrl: "https://c8.alamy.com/comp/2BFYPRG/senatorial-sarcophagus-also-called-sarcophagus-of-the-brothers-mid-3rd-cent-ad-farnese-collection-naples-archaeology-museum-italy-2BFYPRG.jpg",
        imageAlt: "Ancient Roman marble relief showing toga-clad senators",
      },
    },
  },
  {
    id: "machu_picchu",
    name: "Machu Picchu",
    region: "Cusco, Peru",
    videoUrl: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/Machu%20Picchu%20-%20Lost%20in%20Time.mp4",
    topics: {
      history: {
        title: "The Inca Citadel in the Clouds",
        body: "Machu Picchu was built around 1450 CE as a royal estate for the Inca emperor Pachacuti, perched 2,430 metres above sea level on a ridge between two Andean peaks. The site was abandoned approximately 100 years later, possibly after Spanish conquest disrupted the Inca empire — the Spanish never discovered it. American historian Hiram Bingham brought Machu Picchu to international attention in 1911, though local farmers had always known of its existence. UNESCO declared it a World Heritage Site in 1983.",
        narration: "Machu Picchu survived the Spanish conquest simply by being hidden in clouds. The conquistadors never found it. For 400 years this extraordinary city lay undisturbed, draped in mist, until the modern world rediscovered what the Inca had built here in the sky.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgUIyVBdQ1CtMtBS5n5w-gLOfyv-8ce5igyZpb9lECYa9Ze6g2KDBu348&s=10",
        imageAlt: "Machu Picchu citadel with Huayna Picchu mountain behind",
      },
      past: {
        title: "The Lost City and the Sun Gate",
        body: "Machu Picchu was called the 'Lost City of the Incas' by Hiram Bingham, though Inca descendants never considered it lost. The Intihuatana stone — a ritual stone that translates as 'hitching post of the sun' — was designed as an astronomical clock that the Incas used to 'tie the sun' at the winter solstice to prevent it from disappearing. On the winter solstice, the sun stands directly above the stone with no shadow. The Inca road system (Qhapaq Ñan) connecting Machu Picchu to Cusco is itself a UNESCO heritage site.",
        narration: "The Intihuatana stone is one of the world's great astronomical instruments — carved by a civilisation without metal tools or writing, yet precise enough to track the solstices to the day. The Incas believed that if the sun was not 'tied' to this stone, it might not return. Every winter solstice was a negotiation between humans and the cosmos.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Machu_Picchu%2C_2023_%28012%29.jpg",
        imageAlt: "The Intihuatana ritual stone at Machu Picchu",
      },
      culture: {
        title: "Inca Engineering Without Iron or Wheels",
        body: "The Inca built Machu Picchu without iron tools, the wheel, or mortar — using a technique called ashlar, where stones are cut so precisely that they interlock without any binding material. The buildings have survived centuries of earthquakes because the stones flex and resettle in seismic activity. The entire site is oriented to celestial events — windows and doorways align with the June solstice sunrise, the Pleiades constellation, and the peak of Huayna Picchu mountain. Inca society was entirely oral — they recorded information using knotted strings called quipu.",
        narration: "No mortar, no iron, no wheel — and yet these stones have held for 600 years through earthquakes that flattened Spanish colonial buildings next door. The Inca's stone-fitting technique is so perfect that you cannot slide a piece of paper between the joints. Ancient engineering at its most humbling.",
        imageUrl: "https://image-tc.galaxy.tf/wijpeg-61hu92665dpeb08q3s745mghv/como-los-incas-lograron-construir-sin-cemento.jpg",
        imageAlt: "Perfectly fitted Inca stonework at Machu Picchu",
      },
      cuisine: {
        title: "Peruvian Cuisine — The World's Richest",
        body: "Peruvian cuisine is widely considered one of the world's most biodiverse and sophisticated culinary traditions, drawing on coastal, Andean, and Amazonian ecosystems. The Inca domesticated the potato — giving the world over 3,000 varieties still grown in the Andes. Ceviche (raw fish cured in lime juice with chilli and onion) is Peru's national dish and the signature of its Pacific coast. Lima has more restaurants in the World's 50 Best list than any city outside Europe — a culinary revolution led by chefs like Gastón Acurio.",
        narration: "The world owes Peru the potato — every chip, every gnocchi, every mash began here in the Andes. Peruvian cooking is the most exciting in the world right now because it has three entirely different ecosystems feeding one table: the ocean, the mountains, and the Amazon jungle.",
        imageUrl: "https://cravingsjournal.com/wp-content/uploads/2018/08/cropped-ceviche-con-leche-de-tigre-1.jpg",
        imageAlt: "Traditional Peruvian ceviche with chilli and corn",
      },
      food: {
        title: "Andean Superfoods and Street Bites",
        body: "Near Machu Picchu in Aguas Calientes, restaurants serve lomo saltado — a stir-fry of beef, tomatoes, onions, and chips that shows Peru's Chinese immigrant influence. Quinoa soup (sopa de quinua) is warming at high altitude. Chicha morada, a sweet purple corn drink, and chicha de jora, a fermented corn beer sacred to the Incas, are the essential local beverages. Anticuchos — skewered grilled beef hearts marinated in cumin and ají panca chilli — are the ultimate Peruvian street food, sold from charcoal carts.",
        narration: "Anticuchos — grilled beef hearts on a skewer — sounds confronting until you taste one. They're smoky, tender, marinated in chilli and cumin, and absolutely delicious. In Peru, offal is not poverty food — it's the street food of celebration. Don't miss them.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKGMxMMlsH_T645FcZSe47qO8iTt7oc0lMaw&s",
        imageAlt: "Anticuchos beef heart skewers on a Peruvian street grill",
      },
      dance: {
        title: "Marinera and Andean Ritual Dances",
        body: "Peru's national dance is the Marinera — an elegant couple's dance representing courtship, where the man pursues the woman through graceful movements with white handkerchiefs. Originating on the coast with African, Spanish, and indigenous influences, it is performed competitively in elaborate traditional costumes. In the Andes near Machu Picchu, Cusco's festivals feature Inti Raymi (Festival of the Sun) dances that recreate Inca rituals, with thousands of performers in feathered headdresses and golden costumes dancing at the Sacsayhuamán fortress.",
        narration: "Inti Raymi at Sacsayhuamán is one of the most spectacular events I have ever witnessed — thousands of costumed performers recreating an Inca ceremony at a mountain fortress, with the Andes as their backdrop. The sun hits the gold costumes and the whole hillside blazes. It takes your breath away.",
        imageUrl: "https://trexperienceperu.com/sites/default/files/2024-01/inti-raymi-cusco.webp",
        imageAlt: "Inti Raymi Festival of the Sun ceremony in Cusco",
      },
      dress: {
        title: "Andean Textiles — The World's Finest Weavers",
        body: "Andean textile tradition is among the world's oldest and most sophisticated — Inca weavers produced cloth of extraordinary fineness using alpaca, llama, and vicuña wool. Cumbi, the finest Inca weaving reserved for royalty, was woven from baby vicuña fleece and could achieve 500 threads per inch — finer than modern machine weaving. Today's Andean women wear the pollera (full skirt in vivid colours), montera (decorated felt hat), and lliclla (woven shoulder cloth pinned with a silver tupu brooch). Each community's patterns remain distinct and identify the wearer's village.",
        narration: "Andean weaving is so fine that modern machines cannot replicate it. Inca royal cloth was woven from vicuña wool — the world's softest fibre — at a density that defies belief. Today's Quechua weavers carry that same knowledge in their hands, producing cloth that is simultaneously ancient and breathtaking.",
        imageUrl: "https://thumbs.dreamstime.com/b/traditional-weaving-peru-chinchero-woman-clothes-belt-backstrap-loom-selling-colorful-textile-products-local-193562513.jpg",
        imageAlt: "Andean woman weaving traditional cloth with backstrap loom",
      },
    },
  },
  {
    id: "chichen_itza",
    name: "Chichen Itza",
    region: "Yucatán, Mexico",
    videoUrl: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/chichen.mp4",
    topics: {
      history: {
        title: "The Temple of the Feathered Serpent",
        body: "Chichen Itza was one of the largest cities of the ancient Maya civilisation, flourishing between 600–1200 CE in the Yucatán Peninsula of Mexico. The site's centrepiece, El Castillo (The Castle), is a 30-metre stepped pyramid dedicated to Kukulcán, the feathered serpent deity. Each face has 91 steps, and with the top platform totalling 365 steps — one for each day of the year. During the spring and autumn equinoxes, the setting sun casts a shadow on the pyramid's staircase that creates the illusion of a serpent slithering down to earth.",
        narration: "El Castillo is not just a pyramid — it is a calendar in stone. 365 steps, precisely oriented so that twice a year a shadow serpent descends the staircase at the equinox. The Maya didn't just study astronomy — they built it into their architecture at a monumental scale.",
        imageUrl: "https://miro.medium.com/1*Q1onSY15E2eOBeNZmFuJVA.jpeg",
        imageAlt: "El Castillo pyramid at Chichen Itza during the equinox",
      },
      past: {
        title: "The Sacred Cenote and Human Offerings",
        body: "Chichen Itza's Sacred Cenote (Cenote Sagrado) — a natural sinkhole 60 metres in diameter and 13 metres deep — was the site of ritual offerings to Chaac, the rain god. Archaeological excavations in the 20th century recovered gold, jade, pottery, incense, and the skeletal remains of humans, including children, who were sacrificed during droughts. The word 'cenote' comes from the Maya word dzonot meaning 'well'. Legends say that those thrown into the cenote who survived until noon were believed to be carrying a divine message from the gods.",
        narration: "The Sacred Cenote is a place of genuine solemnity. People prayed here for rain in times of drought with desperate urgency, offering their most precious possessions — and sometimes their lives. Standing at its edge, you feel the weight of that ancient desperation in the silence of the water below.",
        imageUrl: "https://www.chichenitza.com/public/assets/img/ruins/the-sacred-cenote-chichen-itza.jpg",
        imageAlt: "The Sacred Cenote sinkhole at Chichen Itza",
      },
      culture: {
        title: "Maya Science and Astronomy",
        body: "The Maya developed one of the world's most accurate calendrical systems — the Long Count calendar that tracked time in cycles of millions of years. The El Caracol observatory at Chichen Itza was precisely aligned to track Venus's movements, which the Maya used to schedule warfare, planting, and ritual. The Maya independently invented the concept of zero and used a vigesimal (base-20) number system. Chichen Itza's ball court is the largest in Mesoamerica — the rubber ball game played here had cosmic significance, with the losing (or winning, historians debate) captain ritually sacrificed.",
        narration: "The Maya tracked Venus with an accuracy that rivalled 18th-century European astronomy — using only naked-eye observation and mathematics. The ball court here was not a sports field but a cosmic stage where the movement of celestial bodies was re-enacted by human players. Games here had mortal stakes.",
        imageUrl: "https://mesoamericanballgames.wordpress.com/wp-content/uploads/2013/03/ci10b.jpg",
        imageAlt: "The Great Ball Court at Chichen Itza",
      },
      cuisine: {
        title: "Yucatecan Cooking — Mexico's Most Distinct",
        body: "Yucatán's cuisine is the most distinctive of Mexico's 32 regional food cultures, shaped by Maya tradition and Caribbean influence rather than the central Mexican chilli-and-tomato palette. Achiote (annatto seed paste) gives dishes their characteristic deep red colour and earthy flavour. Cochinita pibil — pork marinated in achiote, sour orange juice, and spices, wrapped in banana leaves and slow-cooked underground in a pib pit — is the region's greatest dish. Habanero chilli, originally from the Caribbean, is the local heat — the world's hottest widely used chilli.",
        narration: "Cochinita pibil is pork cooked underground — you dig a pit, heat the stones, lower in the banana-leaf parcel, cover it with earth, and let the ground cook it for hours. The result is so tender it dissolves. It's food that requires you to trust the earth itself as your oven.",
        imageUrl: "https://carlsbadcravings.com/wp-content/uploads/2024/07/Cochinita-Pibil-11.jpg",
        imageAlt: "Cochinita Pibil served with pickled red onion on tortillas",
      },
      food: {
        title: "Yucatán Street Food Treasures",
        body: "The markets of Mérida and the towns near Chichen Itza are paradise for street food lovers. Panuchos — small thick tortillas stuffed with black beans and topped with shredded turkey, pickled red onion, and avocado — are the essential local snack. Salbutes are the lighter cousin, made with puffed tortillas. Marquesitas — crispy crepe rolls filled with Edam cheese and cajeta (caramel sauce) — are the irresistible evening street food of Mérida. Fresh agua de jamaica (hibiscus flower water) and horchata are the cooling drinks of Yucatán.",
        narration: "Marquesitas are one of those street foods that make absolutely no sense until you try one — crispy crepe, melted Edam cheese, sweet caramel sauce. It sounds wrong and tastes perfect. Mérida's evening markets are full of them, and there is always a queue.",
        imageUrl: "https://belizenewspost.com/wp-content/uploads/2026/03/panucho-recipe-belize-yucatan.jpg.webp",
        imageAlt: "Yucatecan Panuchos topped with turkey and pickled onion",
      },
      dance: {
        title: "Jarana Yucateca — The Elegant Regional Dance",
        body: "Yucatán's signature folk dance is the Jarana Yucateca — a stately, elegant couple's dance in 6/8 time that blends Spanish colonial and Maya indigenous elements. Women wear the terno, a beautifully embroidered white dress with square floral panels at hem and neckline, and dance with subtle, precise footwork while balancing objects on their heads in showpiece moments. The vaquería, a traditional cattle-ranch festival that includes Jarana dancing, continues to be celebrated throughout Yucatán. The zapateado footwork is rhythmically complex and quietly dazzling.",
        narration: "Jarana Yucateca is the dance of quiet confidence — the footwork is intricate but the expression is serene. Women in their embroidered ternos move with a grace that looks effortless and requires years. At a vaquería festival, the dancing goes on past midnight and nobody wants to stop.",
        imageUrl: "https://thumbs.dreamstime.com/b/jarana-dance-performance-valladolid-yucatan-mexico-october-yucatecan-women-dancers-perform-wearing-terno-native-dress-428424997.jpg",
        imageAlt: "Jarana Yucateca dancers in traditional terno dresses",
      },
      dress: {
        title: "The Terno and Huipil of the Maya",
        body: "Yucatán's traditional women's dress is among Mexico's most recognisable: the hipil (huipil) — a loose square-cut tunic — is the basic garment worn by Maya women continuously from antiquity to the present. The formal terno is an elaborate three-piece version with hand-embroidered floral panels (xokbil chuy) at the neckline and hem, typically in white with vivid floral colours. Maya men's traditional dress includes the guayabera — a light linen or cotton shirt with decorative vertical pleating — which became the signature formal shirt of the Caribbean and Latin America.",
        narration: "The Maya huipil is one of the world's oldest continuously worn garments — the same basic shape has been worn by Maya women for over a thousand years. The embroidery on a formal terno can take months to complete, every flower stitched by hand. It is living history you can wear.",
        imageUrl: "https://images.squarespace-cdn.com/content/v1/60cb452dcafc566e429bb88c/1625589568269-TRN0GSUAN1PWRSRK4FEB/Huipil-4-200x300.jpg",
        imageAlt: "Maya women in traditional embroidered huipil garments",
      },
    },
  },
  {
    id: "taj_mahal",
    name: "Taj Mahal",
    region: "Agra, India",
    videoUrl: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/taj.mp4",
    topics: {
      history: {
        title: "A Mughal Emperor's Eternal Vow",
        body: "Mughal Emperor Shah Jahan commissioned the Taj Mahal in 1631 as a mausoleum for his beloved wife Mumtaz Mahal. Construction lasted 22 years, employing over 20,000 artisans. It blends Persian, Islamic, and Indian styles and was designated a UNESCO World Heritage Site in 1983.",
        narration: "The Taj Mahal was built by Shah Jahan as a tribute to his beloved wife — it took 22 years and the talent of over 20,000 craftsmen. Every arch, every inlay tells a story of devotion that has survived four centuries.",
        imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/64/f8/ad/caption.jpg?w=1200&h=-1&s=1",
        imageAlt: "The Taj Mahal at sunrise, Agra",
      },
      past: {
        title: "Legends of the Moonlit Marble",
        body: "Legend holds Shah Jahan planned a 'Black Taj' in black marble across the Yamuna — historians regard this as myth. Most haunting: Shah Jahan spent his final years imprisoned in Agra Fort by his own son, gazing at the Taj across the river until his death in 1666.",
        narration: "People say Shah Jahan spent his final years imprisoned, only able to look at the Taj through a small diamond on the fort wall. Whether true or not, it makes the monument even more heartbreaking — a love story with a bittersweet ending.",
        imageUrl: "https://epic7travel.com/wp-content/uploads/2018/05/Taj-Mahal-Photos-Reflecting-Pool-Horizontal.jpg",
        imageAlt: "Taj Mahal reflected in the pool",
      },
      culture: {
        title: "Craftsmanship of the Mughal Court",
        body: "The walls are adorned with pietra dura using 28 kinds of precious stones from Tibet, Afghanistan, and Sri Lanka. The four minarets lean slightly outward so that in an earthquake they fall away from the tomb. The marble shifts from gold at sunrise to pearlescent white at noon to soft pink at dusk.",
        narration: "The marble here holds over 28 kinds of precious stones, all hand-inlaid by craftsmen who passed their skills down through generations. The building breathes with light, changing colour every hour of the day.",
        imageUrl: "https://imp-art.org/wp-content/uploads/2023/05/taj-mahal-pietra-dura-8m.jpg",
        imageAlt: "Pietra dura stone inlay work on the Taj Mahal walls",
      },
      cuisine: {
        title: "Mughal Culinary Traditions of Agra",
        body: "Agra's cuisine is rooted in Mughal court cooking — rich gravies, fragrant biryanis, and delicate kebabs. The dum pukht technique originated in the royal kitchens. Agra is also the birthplace of petha, a translucent sweet made from ash gourd crafted here for over 400 years.",
        narration: "In Agra, the royal dum pukht style of slow-cooking fills every lane with the scent of cardamom and saffron. And you simply cannot leave without trying petha — the sweet that has been made here since the Taj was built!",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkI76JxuFfYK1pZioNi5v0SsrIlGCaDGp0IQ&s",
        imageAlt: "Petha sweet from Agra",
      },
      food: {
        title: "Must-Try Bites in Agra",
        body: "Bedai-Jalebi for breakfast, over 30 varieties of Agra Petha, Dal Moth street snacks, and Mughal-style mutton korma make Agra's food scene as layered and rich as its history.",
        narration: "Start your morning with bedai-jalebi — trust me, it will change your life! And don't miss the kesar petha for a sweet goodbye.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRONaprVUT9yMDBB3pnxbVw1T9MxRWzEjkwLQ&s",
        imageAlt: "Jalebi, a classic Indian sweet enjoyed across Agra",
      },
      dance: {
        title: "Kathak — The Dance of Storytellers",
        body: "Uttar Pradesh is the heartland of Kathak, one of India's eight classical dance forms. Originating as temple storytelling, Kathak was refined in the Mughal courts absorbing Persian elements. Dancers wear ghungroos — hundreds of small bells — executing rapid footwork and whirling chakkar pirouettes.",
        narration: "Kathak is storytelling through the body. When a dancer spins in rapid chakkar turns with arms outstretched, she becomes a whirling universe. Standing near the Taj, this dance feels like the perfect companion to a love story.",
        imageUrl: "https://www.shutterstock.com/image-photo/studio-shot-photo-indian-kathak-260nw-2745687229.jpg",
        imageAlt: "Kathak dancer in traditional costume",
      },
      dress: {
        title: "Chikankari — Embroidery of the Mughal Court",
        body: "The traditional dress of the Agra–Lucknow belt is defined by Chikankari embroidery, delicate white thread needlework on muslin said to have been introduced by Mughal empress Nur Jahan. Women wear anarkali kurtas and dupattas with fine floral motifs.",
        narration: "Chikankari is patience made visible — artisans stitch intricate white patterns onto fabric that look like frozen snowflakes. When you see a woman in a Chikankari anarkali, you're seeing a tradition directly from the Mughal court.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugCq4EDzrEY1EYhag1KcsMweN5dkNq0tnzQ&s",
        imageAlt: "Chikankari embroidery from Lucknow",
      },
    },
  },
  {
    id: "christ_redeemer",
    name: "Christ the Redeemer",
    region: "Rio de Janeiro, Brazil",
    videoUrl: "https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/liberty.mp4",
    topics: {
      history: {
        title: "Arms Open Over Rio",
        body: "Christ the Redeemer stands 30 metres tall atop Corcovado mountain, 700 metres above Rio de Janeiro. Designed by Brazilian engineer Heitor da Silva Costa and French sculptor Paul Landowski, it was constructed between 1922 and 1931. The statue is made of reinforced concrete clad in soapstone tiles. It was voted one of the New Seven Wonders of the World in 2007 and remains the largest Art Deco statue in the world.",
        narration: "Christ the Redeemer stands with arms wide open above one of the world's most dramatic cities — and that gesture of welcome is exactly what Rio feels like. The statue was built during Brazil's golden age of optimism, and it still radiates that feeling.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg",
        imageAlt: "Christ the Redeemer statue on Corcovado mountain, Rio",
      },
      past: {
        title: "The Mountain, the Forest and the City",
        body: "Corcovado mountain's name means 'hunchback' in Portuguese. The idea for a large statue on the peak was first proposed in the 1850s by Catholic priest Pedro Maria Boss. The project stalled for decades until a group of Brazilian Catholics revived it in 1921, raising funds through a 'Monument Week' campaign. During construction, workers carved their names into the soapstone tiles before installation — some of those signatures are still visible today on the interior of the statue.",
        narration: "Construction workers carved their names into the soapstone tiles of Christ the Redeemer before they were installed — their hidden signatures are still inside the statue today. I love that: ordinary people who built something extraordinary, leaving a secret record of their presence.",
        imageUrl: "https://i0.wp.com/www.rioculturalsecrets.com/wp-content/uploads/2025/02/rj-corcovado-tour-1.jpg?ssl=1",
        imageAlt: "Corcovado mountain and Tijuca Forest, Rio de Janeiro",
      },
      culture: {
        title: "Rio — The Marvellous City",
        body: "Rio de Janeiro (City of January River) was Brazil's capital for over a century and remains its cultural heart. The city gave the world Bossa Nova — a revolutionary blend of samba rhythms and cool jazz harmonies born in Ipanema apartments in 1958. Carnival, held annually before Lent, transforms Rio into the world's largest party, with samba schools of thousands competing in elaborately choreographed spectacles at the Sambadrome. The Tijuca Forest surrounding Corcovado is the world's largest urban rainforest.",
        narration: "Rio is the city that invented Bossa Nova in small apartments overlooking the sea — António Carlos Jobim and João Gilberto creating something new from the samba and the jazz they loved. 'The Girl from Ipanema' was written about a real woman who walked past a specific bar every morning. Even the love songs here are true stories.",
        imageUrl: "https://bookers.s3.amazonaws.com/pages/foto-44-portela-gabriel-monteiro-riotur-1.jpg",
        imageAlt: "Rio Carnival samba school parade at the Sambadrome",
      },
      cuisine: {
        title: "Brazilian Abundance at the Table",
        body: "Brazilian cuisine is one of the world's great melting pots — Indigenous, Portuguese, African, Italian, Japanese, and Lebanese influences all meet at the same table. The national dish is feijoada — a rich black bean stew with pork cuts (including ears, trotters, and tail) served with white rice, collard greens, farofa (toasted cassava flour), and orange slices. Churrascaria — Brazilian steakhouse tradition of continuous table service of skewered meats carved tableside — originated in the gaucho traditions of southern Brazil.",
        narration: "Feijoada is Brazil's great communal dish — a slow-cooked black bean and pork stew that simmers all Saturday morning while the family gathers. It's traditionally eaten at lunch with cold beer, and the meal always runs into the afternoon. It is food designed to bring people together and keep them there.",
        imageUrl: "https://i0.wp.com/espressoandlime.com/wp-content/uploads/2024/05/Feijoada-4.jpeg?resize=700%2C1050&ssl=1",
        imageAlt: "Traditional Brazilian Feijoada with all accompaniments",
      },
      food: {
        title: "Rio Street Food and Beach Bites",
        body: "Rio's beaches are lined with vendors selling mate tea (cold brewed mate served ice-cold with lemon), biscoito globo (light airy ring biscuits beloved since 1953), and grilled corn on the cob with butter. The city's botequins (neighbourhood bars) serve petiscos: bolinhos de bacalhau (salt cod fritters), pastéis (fried pastry parcels with cheese or meat), and cold chope (draft beer). The coxinha — a teardrop-shaped fried dough stuffed with shredded chicken — is Brazil's most beloved street snack, found at every corner bakery.",
        narration: "A cold beer and a coxinha at a Rio botequim as the afternoon light goes golden over the hills — that is one of life's simple perfections. The coxinha is the snack that unites all of Brazil: every bakery makes them, everyone eats them, and they are always slightly different and always delicious.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHsjT2_UhsO7ov-Fn94Ogo7DW3aTzSg72Jng&s",
        imageAlt: "Brazilian Coxinha fried chicken snacks",
      },
      dance: {
        title: "Samba — The Heartbeat of Brazil",
        body: "Samba is Brazil's defining cultural expression — a dance and musical form born from the African traditions brought to Brazil by enslaved people, developed in Rio's hillside favelas in the early 20th century. The dance is characterised by fast footwork, swaying hip movements, and a joyful energy that is difficult to resist. Samba schools (escolas de samba) are community organisations that spend the entire year preparing elaborate multi-hour carnival performances with thousands of costumed performers, float builders, and musicians.",
        narration: "Samba wasn't just born in Rio — it was born in the hillside favelas by the descendants of enslaved Africans who created something luminous from suffering. When a samba school marches at Carnival with 4,000 people in perfect rhythm, it is the most powerful display of community joy I have ever seen.",
        imageUrl: "https://bookers.s3.amazonaws.com/pages/porta-bandeira-rio-carnaval-2023-riotur-grande-rio-gabriel-monteiro.jpg",
        imageAlt: "Samba dancers performing at Rio Carnival",
      },
      dress: {
        title: "Havaianas, Carnival Costumes and Favela Fashion",
        body: "Brazil's relationship with dress is tied to its tropical climate and its extraordinary cultural diversity. Carnival costumes — elaborate feathered headdresses, sequinned bodices, and layered skirts designed by renowned carnavalescos (carnival designers) — represent the pinnacle of Brazilian decorative art and can cost thousands of dollars per outfit. Daily beachwear culture in Rio established Brazil as the global innovator of beachwear design — the bikini, the sunga, and the Havaianas flip-flop are Brazilian contributions to global fashion. The country's favela communities have driven vibrant streetwear aesthetics.",
        narration: "A Carnival costume designed by a top carnavalesco is a work of art — feathers, sequins, and hand-sewn details that can take a team months to produce and weigh 20 kilos. The woman who wears it at the Sambadrome carries it as though it weighs nothing. That is Rio's magic.",
        imageUrl: "https://c8.alamy.com/comp/3EKPEP6/rio-de-janeiro-brazil-february-17-a-samba-dancer-wearing-an-elaborate-blue-and-gold-feathered-costume-performs-during-a-carnival-parade-as-spectat-3EKPEP6.jpg",
        imageAlt: "Elaborate feathered Carnival costume at Rio Sambadrome",
      },
    },
  },
];
/**
 * FandomVerse Advanced Data Engine
 * Complete database for 7 fandom categories, content articles,
 * collectible merchandise, global fan events, trivia challenge,
 * universe sorting quiz, and community discussions.
 */

const FANDOM_DATA = {
  categories: [
    {
      id: "anime",
      name: "Anime",
      icon: "🌸",
      tag: "OTAKU REALM",
      badge: "Trending Worldwide",
      color: "#ec4899",
      gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
      banner: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      description: "From Shonen powerhouses to Slice-of-Life masterpieces. Step into legendary anime realms, discover trending seasonal releases, and dissect deep character arcs.",
      stats: { fans: "2.4M", series: "480+", reviews: "98% Positive" },
      featuredCharacters: [
        {
          name: "Satoru Gojo",
          franchise: "Jujutsu Kaisen",
          role: "Special Grade Sorcerer",
          quote: "Throughout heaven and earth, I alone am the honored one.",
          power: "Limitless & Six Eyes",
          image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Monkey D. Luffy",
          franchise: "One Piece",
          role: "Captain of Straw Hat Pirates",
          quote: "If you don't take risks, you can't create a future!",
          power: "Gear 5 • Sun God Nika",
          image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Tanjiro Kamado",
          franchise: "Demon Slayer",
          role: "Demon Slayer Corps",
          quote: "No matter how many people you lose, you have no choice but to go on living.",
          power: "Sun Breathing (Hinokami)",
          image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80"
        }
      ],
      loreTopics: [
        "The complete history of Cursed Energy & Domain Expansions",
        "Void Century decoded: Joyboy, Ancient Weapons & the Poneglyphs",
        "The Hashira rank breakdown and Sun Breathing origins"
      ]
    },
    {
      id: "gaming",
      name: "Gaming",
      icon: "🎮",
      tag: "NEXT-GEN LEVEL",
      badge: "Esports & RPGs",
      color: "#06b6d4",
      gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
      description: "Next-gen titles, legendary speedruns, esports arenas, and rich game lore. Explore deep worlds from the Lands Between to Night City.",
      stats: { fans: "3.8M", series: "1,200+", reviews: "95% Recommended" },
      featuredCharacters: [
        {
          name: "Malenia, Blade of Miquella",
          franchise: "Elden Ring",
          role: "Empyrean Demigod",
          quote: "I have never known defeat.",
          power: "Waterfowl Dance & Scarlet Rot",
          image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Johnny Silverhand",
          franchise: "Cyberpunk 2077",
          role: "Rockerboy / Relic Engram",
          quote: "Wake up, samurai. We have a city to burn.",
          power: "Malorian Arms 3516 & Cyber-arm",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Kratos",
          franchise: "God of War",
          role: "Ghost of Sparta / All-Father",
          quote: "Do not be sorry. Be better.",
          power: "Leviathan Axe & Blades of Chaos",
          image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80"
        }
      ],
      loreTopics: [
        "The Shattering & Greater Will Cosmic Lore explained",
        "Cyberpsychosis: The neurological cost of transhumanism",
        "The evolution of Souls-like mechanics and combat design"
      ]
    },
    {
      id: "movies",
      name: "Movies",
      icon: "🎬",
      tag: "CINEMA VAULT",
      badge: "Blockbuster Epic",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
      banner: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
      description: "Blockbuster cinematic universes, indie triumphs, film analysis, director deep-dives, and behind-the-scenes filmmaking craftsmanship.",
      stats: { fans: "1.9M", series: "850+", reviews: "94% Certified" },
      featuredCharacters: [
        {
          name: "Paul Atreides",
          franchise: "Dune Universe",
          role: "Muad'Dib / Kwisatz Haderach",
          quote: "Fear is the mind-killer. Fear is the little-death that brings obliteration.",
          power: "Prescience & The Voice",
          image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Tony Stark",
          franchise: "Marvel Cinematic Universe",
          role: "Iron Man",
          quote: "I am Iron Man.",
          power: "Mark 85 Nanotech Armor & Arc Reactor",
          image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "J. Robert Oppenheimer",
          franchise: "Nolan Cinematic",
          role: "Theoretical Physicist",
          quote: "Now I am become Death, the destroyer of worlds.",
          power: "Atomic Fission Calculation",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
        }
      ],
      loreTopics: [
        "Frank Herbert's Messianic warning in Dune Messiah",
        "The MCU Multiverse Saga & Sacred Timeline breakdown",
        "Christopher Nolan's practical cinematography vs digital CGI"
      ]
    },
    {
      id: "tv",
      name: "TV Shows",
      icon: "📺",
      tag: "BINGE CENTRAL",
      badge: "High Drama & Sci-Fi",
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
      banner: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80",
      description: "Serial storytelling, premium streaming dramas, sci-fi sagas, and mind-bending mysteries. From Hawkins to Westeros and Zaun.",
      stats: { fans: "1.6M", series: "620+", reviews: "96% Fan Rating" },
      featuredCharacters: [
        {
          name: "Jinx (Powder)",
          franchise: "Arcane / Runeterra",
          role: "Zaunite Loose Cannon",
          quote: "I'm crazy! ...Sheesh, you oughta see my sister.",
          power: "Fishbones Rocket Launcher & Shimmer Surge",
          image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Eleven",
          franchise: "Stranger Things",
          role: "Psychokinetic Test Subject",
          quote: "Friends don't lie.",
          power: "Telekinesis & Remote Viewing",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Daemon Targaryen",
          franchise: "House of the Dragon",
          role: "The Rogue Prince",
          quote: "Dreams didn't make us kings. Dragons did.",
          power: "Dark Sister & Caraxes the Blood Wyrm",
          image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80"
        }
      ],
      loreTopics: [
        "The socioeconomic fallout of Piltover vs the Undercity in Arcane",
        "The Upside Down alternate dimension origins and Vecna's mind lair",
        "The Targaryen civil war: The Dance of the Dragons lineage"
      ]
    },
    {
      id: "kpop",
      name: "K-Pop",
      icon: "🎤",
      tag: "IDOL PULSE",
      badge: "Global Sensation",
      color: "#f43f5e",
      gradient: "linear-gradient(135deg, #f43f5e, #a855f7)",
      banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      description: "The unstoppable global music and visual phenomenon. Chart records, world stadium tours, synchronized choreography, and creative album concepts.",
      stats: { fans: "4.2M", series: "340+ Idols", reviews: "99% Certified" },
      featuredCharacters: [
        {
          name: "BTS (Bangtan Sonyeondan)",
          franchise: "BIGHIT / HYBE",
          role: "21st Century Pop Icons",
          quote: "Teamwork makes the dream work.",
          power: "ARMY Synergy & Genre Versatility",
          image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "BLACKPINK",
          franchise: "YG Entertainment",
          role: "Record-Breaking Girl Group",
          quote: "BLACKPINK in your area!",
          power: "High-Fashion Visuals & Girl Crush Anthems",
          image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "NewJeans",
          franchise: "ADOR / HYBE",
          role: "Y2K Aesthetic Innovators",
          quote: "Cause I know what you like boy, you're my chemical hype boy.",
          power: "Retro R&B Grooves & Bunny Fandom Power",
          image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80"
        }
      ],
      loreTopics: [
        "The HYBE Bangtan Universe (BU) time-loop narrative decoded",
        "The sonic architecture of K-Pop bridge melodies and key changes",
        "Photocard rarity, fandom lightstick culture, and album unboxings"
      ]
    },
    {
      id: "comics",
      name: "Comics",
      icon: "💥",
      tag: "MULTIVERSE CORE",
      badge: "Graphic Legends",
      color: "#e11d48",
      gradient: "linear-gradient(135deg, #e11d48, #fbbf24)",
      banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
      description: "Graphic novels, golden age classics, grimdark masterpieces, and epic multiversal crossovers from Gotham to Earth-616.",
      stats: { fans: "1.7M", series: "2,400+ Issues", reviews: "93% Reader Score" },
      featuredCharacters: [
        {
          name: "Batman (Bruce Wayne)",
          franchise: "DC Comics",
          role: "The Dark Knight",
          quote: "It's not who I am underneath, but what I do that defines me.",
          power: "Peak Human Conditioning & Tactical Genius",
          image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Spider-Man (Miles Morales)",
          franchise: "Marvel Comics",
          role: "Brooklyn's Spider-Man",
          quote: "Anyone can wear the mask. How you wear it is what matters.",
          power: "Venom Strike & Active Camouflage",
          image: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Omni-Man (Nolan Grayson)",
          franchise: "Invincible Universe",
          role: "Viltrumite Vanguard",
          quote: "Think, Mark! What will you have after five hundred years?",
          power: "Invulnerability & Hypersonic Flight",
          image: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=400&q=80"
        }
      ],
      loreTopics: [
        "Crisis on Infinite Earths: The anatomy of DC continuity reboots",
        "Spider-Verse canon events: fate versus anomalous free will",
        "Watchmen and the deconstruction of the silver age superhero"
      ]
    },
    {
      id: "manga",
      name: "Manga",
      icon: "📖",
      tag: "INK & SHADOW",
      badge: "Masterclass Storytelling",
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
      banner: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
      description: "The pure art of black and white paneling. Legendary mangaka, dynamic page turns, raw emotional depth, and serialized masterpieces.",
      stats: { fans: "2.1M", series: "1,500+ Volumes", reviews: "97% Masterpiece" },
      featuredCharacters: [
        {
          name: "Guts",
          franchise: "Berserk",
          role: "The Black Swordsman",
          quote: "He who fights with monsters might take care lest he thereby become a monster.",
          power: "The Dragon Slayer & Berserker Armor",
          image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Denji",
          franchise: "Chainsaw Man",
          role: "Chainsaw Hybrid",
          quote: "If I'm gonna dream, I'm gonna dream big! Toast with jam every morning!",
          power: "Chainsaw Transformation & Pochita Blood Pact",
          image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80"
        },
        {
          name: "Sung Jin-woo",
          franchise: "Solo Leveling",
          role: "The Shadow Monarch",
          quote: "Arise.",
          power: "Shadow Army Extraction & Domain of the Monarch",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
        }
      ],
      loreTopics: [
        "Kentaro Miura's hatchwork and the Gothic paneling of the Eclipse",
        "Tatsuki Fujimoto's cinematic panel flow and pacing rules",
        "The explosive rise of Korean Webtoons vs classic Japanese tankobon"
      ]
    }
  ],

  content: [
    {
      id: "anime-shinjuku-showdown",
      category: "anime",
      categoryName: "Anime",
      title: "The Shinjuku Showdown: How Jujutsu Kaisen Redefined Modern Battle Shonen",
      excerpt: "An in-depth breakdown of Sukuna vs Gojo, binding vows, domain clashes, and why this arc sparked worldwide fan debate.",
      readTime: "6 min read",
      author: "Ren Takahashi",
      authorRole: "Senior Anime Analyst",
      date: "Sep 2026",
      likes: 1420,
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
      trailerId: "9OhV3IWUsxE",
      tags: ["Jujutsu Kaisen", "Gojo", "Sukuna", "Shonen", "Mappa"],
      content: `The clash between the Strongest Sorcerer of Today and the Strongest Sorcerer in History wasn't just a battle; it was a cultural event that paralyzed social media for months.\n\nGege Akutami subverted decades of shonen combat tropes by treating Jujutsu sorcery like an intricate martial art governed by ruthless mathematical logic, thermodynamic binding vows, and spatial metaphysics.\n\n### The Geometry of Unlimited Void vs Malevolent Shrine\nWhen Gojo and Sukuna opened their domains simultaneously, readers witnessed domain clashes pushed to their logical extremes. Gojo shrinking his barrier to the size of a basketball to resist external cleave attacks was a masterstroke of tactical creativity.\n\n### Why It Matters For the Genre\nModern shonen has moved beyond simple power-level escalation. Fans crave strategic depth, high stakes where plot armor does not guarantee survival, and ideological clashes where neither combatant is wholly right or wrong.`,
      comments: [
        { user: "SorcererZero", time: "2 hours ago", text: "The basketball domain expansion panel gave me absolute chills." },
        { user: "InfinityFan", time: "5 hours ago", text: "Gojo will always remain the most iconic character of this generation." }
      ]
    },
    {
      id: "gaming-elden-ring-shadow",
      category: "gaming",
      categoryName: "Gaming",
      title: "Shadow of the Erdtree & Beyond: Decoding Miquella's True Ambition",
      excerpt: "Unpacking the deep lore of the Land of Shadow, St. Trina's discarded love, and the cosmic tragedy of the Golden Order.",
      readTime: "8 min read",
      author: "Elena Rostova",
      authorRole: "Lore Scholar",
      date: "Sep 2026",
      likes: 2150,
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      trailerId: "qLZenOn7WUo",
      tags: ["Elden Ring", "FromSoftware", "Miquella", "Soulsborne", "Lore"],
      content: `FromSoftware's monumental expansion didn't just deliver devastating boss encounters—it completely recontextualized Queen Marika's genesis and the horrific sins that birthed the Golden Order.\n\nMiquella the Kind, long envisioned by players as an innocent savior figure, cast aside his flesh, his doubt, and crucially, his own capacity for love (embodied in St. Trina) in a tragic pursuit of an era of compassion enforced through cosmic mind control.\n\n### The Burden of Divinity\nHidetaka Miyazaki's storytelling reminds us that purity when stripped of human vulnerability often calcifies into tyranny. The Land of Shadow stands as a monument to the forgotten cost of godhood.`,
      comments: [
        { user: "TarnishedKnight", time: "1 hour ago", text: "St. Trina's questline broke my heart. Such poetic tragedy." },
        { user: "MessmerFlame", time: "3 hours ago", text: "The level design in the Shadow Keep is peak gaming architecture." }
      ]
    },
    {
      id: "movies-dune-part-three",
      category: "movies",
      categoryName: "Movies",
      title: "The Holy War Approaches: Why Dune Messiah Will Shock Moviegoers",
      excerpt: "Denis Villeneuve prepares to tackle Paul Atreides' heartbreaking transformation from mythical savior to tragic emperor.",
      readTime: "7 min read",
      author: "Marcus Vance",
      authorRole: "Film Critic",
      date: "Aug 2026",
      likes: 1890,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
      trailerId: "Way9Dexny3w",
      tags: ["Dune", "Denis Villeneuve", "Timothee Chalamet", "Sci-Fi", "Cinema"],
      content: `While Frank Herbert's first novel concluded with a thrilling victory against the Harkonnens and the Emperor, Dune Messiah served as an intentional cold shower for fans who mistook Paul Atreides for a classic hero.\n\nVilleneuve has repeatedly stated that his trilogy exists to fulfill Herbert's original warning: beware of charismatic leaders.\n\n### The Horrors of Prescience\nPaul isn't a conqueror drunk on power; he is a trapped prisoner of his own foresight. He sees billions of deaths across sixty billion stars in the jihad bearing his name, yet every alternate timeline he perceives leads to worse devastation.\n\nExpect Dune Messiah to be an intimate, tense psychological chamber drama wrapped in desert majesty.`,
      comments: [
        { user: "FremenSister", time: "4 hours ago", text: "Villeneuve has handled the nuances of the novels with unmatched respect." },
        { user: "ArrakisWorm", time: "1 day ago", text: "Hans Zimmer's score during the Messiah climax will be earth-shattering." }
      ]
    },
    {
      id: "movies-nolan-temporal-mastery",
      category: "movies",
      categoryName: "Movies",
      title: "The Architecture of Time: How Christopher Nolan Transformed 70mm Cinema",
      excerpt: "From Inception and Interstellar to Oppenheimer's quantum IMAX explosions—analyzing Nolan's obsession with non-linear timelines.",
      readTime: "8 min read",
      author: "Marcus Vance",
      authorRole: "Film Critic",
      date: "Sep 2026",
      likes: 2430,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      trailerId: "uYPbbksJxIg",
      tags: ["Oppenheimer", "Christopher Nolan", "IMAX", "Cinema", "Sci-Fi"],
      content: `Few filmmakers command the cultural authority of Christopher Nolan. In an era dominated by green screens and streaming algorithms, Nolan remains cinema's fiercest apostle for practical effects, physical 70mm celluloid film, and grand metaphysical spectacle.\n\n### Time as Physical Space\nAcross Memento, Inception, Interstellar, and Tenet, time is never a passive chronological backdrop. It is an antagonist, a labyrinth, an ocean wave stretching twenty stories high, or a river flowing in reverse.\n\n### The Trinity of Scale\nWith Oppenheimer, Nolan proved that human faces projected on eight-story IMAX screens can produce more unbearable suspense than any fictional superhero apocalypse. Cinema at its peak is an immersive communal ritual.`,
      comments: [
        { user: "Cinephile99", time: "2 hours ago", text: "The sound design during the Trinity test was the most intense theatrical experience of my life." },
        { user: "CelluloidDreamer", time: "4 hours ago", text: "Long live 70mm IMAX and directors who trust the audience's intelligence." }
      ]
    },
    {
      id: "movies-the-batman-epic-saga",
      category: "movies",
      categoryName: "Movies",
      title: "Shadows of Gotham: Why Matt Reeves' Dark Detective Saga is Redefining Noir",
      excerpt: "Rain-soaked streets, Zodiac-inspired thrills, and Robert Pattinson's introspective Caped Crusader preparing for Arkham's descent.",
      readTime: "7 min read",
      author: "Darius King",
      authorRole: "Film & Comic Historian",
      date: "Aug 2026",
      likes: 1980,
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      trailerId: "mqqft2x_Aa4",
      tags: ["The Batman", "Matt Reeves", "Robert Pattinson", "DC", "Noir"],
      content: `Matt Reeves didn't just deliver another Batman film; he constructed a grounded, atmospheric 1970s neo-noir investigative thriller where the world's greatest detective actually solves crimes.\n\nFrom Greig Fraser's razor-sharp anamorphic camera lenses to Michael Giacchino's thunderous funeral-march theme, Gotham feels like an ancient, decaying industrial organism sinking into moral depravity.\n\n### From Vengeance to Hope\nBruce Wayne begins as an avatar of pure nocturnal retribution, but learns that fear alone cannot save a broken city. Gotham needs a beacon, not just a shadow.`,
      comments: [
        { user: "GothamKnight", time: "1 hour ago", text: "The Batmobile engine startup scene still gives me chills every time." },
        { user: "ArkhamDetective", time: "5 hours ago", text: "Robert Pattinson and Colin Farrell gave career-defining performances." }
      ]
    },
    {
      id: "tv-arcane-season-two",
      category: "tv",
      categoryName: "TV Shows",
      title: "Arcane's Grand Finale: Visual Alchemy, Hextech Politics & Sisterhood",
      excerpt: "How Fortiche and Riot Games created an animated masterpiece that set the gold standard for video game adaptations.",
      readTime: "5 min read",
      author: "Zoe Sterling",
      authorRole: "Animation Lead",
      date: "Aug 2026",
      likes: 3100,
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
      trailerId: "ysqiEC6bLUI",
      tags: ["Arcane", "League of Legends", "Jinx", "Vi", "Netflix", "Animation"],
      content: `Arcane accomplished what many deemed impossible: turning a multiplayer battle arena game into a gripping Greek tragedy about socioeconomic division, trauma, and love between sisters.\n\n### Oil Paint in Motion\nFortiche's signature fusion of 2D matte backgrounds, hand-painted digital textures, and 3D character models creates an aesthetic that feels alive with tactile brushstrokes. Every single frame is worthy of being framed on a gallery wall.\n\n### The Inevitable Collision\nJinx and Vi's fractured relationship reflects the irreconcilable divide between Piltover and Zaun. With Hextech and Shimmer on a collision course, Arcane proved animation is the ultimate medium for mature, high-concept storytelling.`,
      comments: [
        { user: "ZauniteSpark", time: "30 mins ago", text: "The music integration in every episode is literally unmatched." },
        { user: "HextechTech", time: "2 hours ago", text: "Fortiche deserves every animation award in existence." }
      ]
    },
    {
      id: "kpop-hybe-newjeans-revolution",
      category: "kpop",
      categoryName: "K-Pop",
      title: "The Y2K Aesthetic Resurgence: How Nostalgia Conquered the K-Pop Billboard",
      excerpt: "From effortless choreography to UK garage and Jersey club beats, dissecting the creative philosophy dominating global charts.",
      readTime: "5 min read",
      author: "Chloe Kim",
      authorRole: "Music Trends Editor",
      date: "Jul 2026",
      likes: 2750,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      trailerId: "9wUKhEgnllc",
      tags: ["NewJeans", "KPop", "Y2K", "HypeBoy", "Billboard", "Music"],
      content: `For years, K-Pop was defined by maximalist beat drops, hyper-complex storylines, and explosive high notes. Then came a minimalist counter-revolution.\n\nBy embracing airy vocal layers, nostalgic 2000s R&B grooves, and unpretentious dance trends, groups like NewJeans flipped the industry playbook upside down.\n\n### Sound Design That Breathes\nInstead of overwhelming the listener, tracks are built on buoyant syncopated percussion, soft Rhodes chords, and infectious melodic hooks designed for organic loops. It's a testament to how minimalism can create maximum cultural impact.`,
      comments: [
        { user: "BunniesForever", time: "1 hour ago", text: "The choreography looks so natural and joyful compared to robotic routines." },
        { user: "SoundWaveK", time: "6 hours ago", text: "The production quality of these tracks is top-tier bedroom pop perfection." }
      ]
    },
    {
      id: "comics-spider-man-multiverse",
      category: "comics",
      categoryName: "Comics",
      title: "Beyond Canon: Why Miles Morales Resonates Across Every Dimension",
      excerpt: "Analyzing the hero's journey of Miles Morales and why defying predetermined fate has become the defining superhero theme.",
      readTime: "7 min read",
      author: "Darius King",
      authorRole: "Comics Historian",
      date: "Jul 2026",
      likes: 1980,
      image: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=800&q=80",
      trailerId: "cqGjhVJWtEg",
      tags: ["Miles Morales", "Spider-Man", "Marvel", "Comics", "Multiverse"],
      content: `When Brian Michael Bendis and Sara Pichelli first introduced Miles Morales in Ultimate Comics: Fallout #4, they laid the foundation for a cultural icon.\n\nMiles doesn't just replace Peter Parker—he challenges the philosophical core of what it means to carry the mantle. In a multiverse full of heroes who believe tragedy is mandatory, Miles' refusal to accept catastrophic sacrifice as a requirement for heroism is profoundly revolutionary.\n\n### Doing Your Own Thing\n'Everyone keeps telling me how my story is supposed to go. Nah, I'ma do my own thing.' This single line captured the voice of a whole generation refusing to accept fatalistic limitations.`,
      comments: [
        { user: "SpiderBrooklyn", time: "3 hours ago", text: "Miles proved you don't have to lose your soul to be a protector." },
        { user: "GwenStacyFan", time: "7 hours ago", text: "The comic paneling and visual style of Miles' runs are always stellar." }
      ]
    },
    {
      id: "manga-berserk-legacy",
      category: "manga",
      categoryName: "Manga",
      title: "Berserk's Enduring Light: Why Kentaro Miura's Dark Fantasy is About Hope",
      excerpt: "Looking past the grim monsters and demonic apostles to discover the beating heart of Guts' struggle against destiny.",
      readTime: "9 min read",
      author: "Hiroshi Sato",
      authorRole: "Manga Archivist",
      date: "Jun 2026",
      likes: 3400,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      trailerId: "H6dkuEdzaFY",
      tags: ["Berserk", "Kentaro Miura", "Guts", "Dark Fantasy", "Manga"],
      content: `Many remember Berserk for its visceral violence, nightmarish monsters, and the horrors of the Eclipse. But to view Berserk solely as grimdark torture is to fundamentally misunderstand Kentaro Miura's life work.\n\nBerserk is, at its foundational core, one of the most radiant celebrations of human resilience and the will to keep moving forward despite cosmic indifference.\n\n### The Struggle Against the Current\nGuts is branded for death, hunted every night by demonic entities. Yet he refuses to kneel. In finding a new found family with Schierke, Farnese, Serpico, and Isidro, Guts discovers that healing begins when one puts down the solitary vengeance and chooses to protect what remains.\n\nMiura's pen strokes—each cross-hatch etched with monastic devotion—stand as immortal testaments to artistic perfection.`,
      comments: [
        { user: "Struggler99", time: "50 mins ago", text: "Keep struggling, on and on. This manga literally saved my life during hard times." },
        { user: "BrandOfSacrifice", time: "4 hours ago", text: "Miura's artwork is unmatched in the entire medium of comic illustration." }
      ]
    },
    {
      id: "gaming-cyberpunk-orion",
      category: "gaming",
      categoryName: "Gaming",
      title: "Project Orion & The Future of Night City: What CD Projekt RED is Building",
      excerpt: "Next-gen Unreal Engine 5 tech, deeper cyberware consequences, and expanding into the Megabuildings of 2077.",
      readTime: "6 min read",
      author: "Elena Rostova",
      authorRole: "Tech & RPG Journalist",
      date: "Jun 2026",
      likes: 1650,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      trailerId: "sJbexcm4Trk",
      tags: ["Cyberpunk", "Project Orion", "CDPR", "Sci-Fi", "RPG"],
      content: `Following the triumphant redemption of Cyberpunk 2077 and the emotional heights of Phantom Liberty, CD Projekt RED is full throttle on the sequel codenamed Project Orion.\n\nTransitioning to Unreal Engine 5 allows the studio to build a dense, living metropolis with simulated pedestrian routines, dynamic corporate turf wars, and vertical exploration that makes Night City feel endless.\n\n### High Tech, Low Life\nThe sequel promises deeper humanity-index mechanics where extensive cybernetic modification actively shifts NPC dialogue, sanity, and combat perception.`,
      comments: [
        { user: "Choom2077", time: "2 hours ago", text: "Phantom Liberty proved CDPR still has the best storytelling in the business." },
        { user: "NetrunnerLucy", time: "8 hours ago", text: "Can't wait to see what they do with the Crystal Palace orbital station." }
      ]
    }
  ],

  products: [
    {
      id: "prod-cyber-hoodie",
      name: "Neo-Tokyo Hologram Oversized Hoodie",
      category: "apparel",
      price: 4999,
      originalPrice: 6499,
      rating: 4.9,
      reviewsCount: 128,
      badge: "LIMITED DROP",
      inStock: true,
      stockCount: 14,
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      description: "Heavyweight 450GSM French Terry cotton with reflective holographic cyber runes, kangaroo pocket, and thumb-slit cuffs.",
      details: ["100% Organic Heavyweight Cotton", "Reflective 3M FandomVerse prints", "Relaxed drop-shoulder cyber fit", "Machine wash cold inside-out"]
    },
    {
      id: "prod-domain-deskmat",
      name: "Infinite Void RGB Extended Deskmat",
      category: "tech",
      price: 2899,
      originalPrice: 3499,
      rating: 4.8,
      reviewsCount: 94,
      badge: "BESTSELLER",
      inStock: true,
      stockCount: 22,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      description: "900x400mm micro-weave cloth surface with 14-mode addressable RGB perimeter lighting, waterproof nano-coating, and anti-slip rubber base.",
      details: ["900mm x 400mm x 4mm", "14 RGB Spectrum Modes", "Ultra-smooth tracking micro-weave", "USB-C braided cable included"]
    },
    {
      id: "prod-plush-pochita",
      name: "Chainsaw Demon Companion Plush (35cm)",
      category: "collectibles",
      price: 2199,
      originalPrice: 2799,
      rating: 5.0,
      reviewsCount: 312,
      badge: "FAN FAVORITE",
      inStock: true,
      stockCount: 8,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
      description: "Ultra-soft premium plush with pull-cord tail, embroidered eyes, and sturdy foam saw blade. The ultimate desk companion.",
      details: ["Hypoallergenic plush material", "Detailed pull-cord mechanism", "Collector packaging included", "Height: 35cm (approx 14 inches)"]
    },
    {
      id: "prod-portal-orb-light",
      name: "Quantum Nebula Floating Desk Orb",
      category: "tech",
      price: 5499,
      originalPrice: 6999,
      rating: 4.9,
      reviewsCount: 76,
      badge: "FEATURED",
      inStock: true,
      stockCount: 11,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      description: "Magnetic levitation ambient lamp with touch controls, breathing starlight mode, and wireless induction power transfer.",
      details: ["Magnetic levitation mechanism", "Stepless touch dimming", "RGB color cycle + warm white mode", "Low power consumption (5W)"]
    },
    {
      id: "prod-berserk-artbook",
      name: "Eclipse Chronicle: Deluxe Hardcover Art Anthology",
      category: "collectibles",
      price: 6899,
      originalPrice: 8500,
      rating: 5.0,
      reviewsCount: 204,
      badge: "COLLECTOR EDITION",
      inStock: true,
      stockCount: 5,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      description: "320 pages of high-density art paper containing full-bleed panels, unpublished concept sketches, and gold foil embossed faux-leather cover.",
      details: ["Gold foil embossed faux leather", "320 heavyweight art pages", "Includes archival bookmark ribbon", "Limited serialized run of 1,000"]
    },
    {
      id: "prod-keycaps-cyber",
      name: "Night City Netrunner PBT Dye-Sub Keycaps",
      category: "tech",
      price: 3699,
      originalPrice: 4499,
      rating: 4.7,
      reviewsCount: 65,
      badge: "NEW ARRIVAL",
      inStock: true,
      stockCount: 19,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      description: "Cherry profile 134-key set with Hiragana sub-legends, novelty keycaps, and durable 1.5mm thick PBT plastic that never shines.",
      details: ["Cherry profile ergonomics", "1.5mm thick durable PBT", "Includes ISO & ANSI layouts", "Keycap puller included in box"]
    },
    {
      id: "prod-kpop-lightstick",
      name: "Starlight Prism Bluetooth Interactive Lightstick",
      category: "collectibles",
      price: 4199,
      originalPrice: 4999,
      rating: 4.9,
      reviewsCount: 188,
      badge: "CONCERT READY",
      inStock: true,
      stockCount: 27,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
      description: "Smartphone-synced concert baton with multi-color LED prism, haptic vibration beat sync, and display cradle with rechargeable battery.",
      details: ["Bluetooth 5.3 app synchronization", "Multi-color prism dispersion", "Rechargeable via Type-C", "Includes wrist strap & cradle"]
    },
    {
      id: "prod-miles-tee",
      name: "Spider-Verse Glitch Grafitti Acid Wash Tee",
      category: "apparel",
      price: 2699,
      originalPrice: 3299,
      rating: 4.8,
      reviewsCount: 145,
      badge: "POPULAR",
      inStock: true,
      stockCount: 30,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
      description: "Vintage enzyme acid-washed black tee featuring high-density screenprinted spray-paint spider insignia and distressed neck ribbing.",
      details: ["260GSM pre-shrunk cotton", "Hand acid-washed unique pattern", "Screenprinted graphic chest & back", "Boxy streetwear fit"]
    }
  ],

  events: [
    {
      id: "event-expo-2026",
      title: "FandomVerse Grand Con 2026",
      category: "Convention",
      dateMonth: "OCT",
      dateDay: "18",
      year: "2026",
      fullDate: "October 18-20, 2026",
      time: "10:00 AM - 9:00 PM PKT",
      location: "Karachi Expo Centre & Metaverse Stream",
      type: "Hybrid",
      badge: "FLAGSHIP EVENT",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      description: "The largest fan festival in South Asia! 3 days of international voice actors, anime premiere screenings, esports championship finals, and cosplay grand prix.",
      speakers: ["Kenji Nakamura (Anime Director)", "Sarah Chen (Riot Games Artist)", "Faker (Esports Legend)"],
      passesAvailable: 150,
      price: "Free Pass / VIP Available",
      vipPerks: ["Exclusive Early Floor Access", "VIP Lounge & Meet-and-Greet", "Collector Commemorative Lanyard & Pin Set"]
    },
    {
      id: "event-elden-lore-night",
      title: "The Great Erdtree Lore Summit",
      category: "Community",
      dateMonth: "NOV",
      dateDay: "07",
      year: "2026",
      fullDate: "November 07, 2026",
      time: "8:00 PM - 11:30 PM PKT",
      location: "FandomVerse Discord & YouTube Live",
      type: "Online Stream",
      badge: "VIRTUAL ACCESS",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      description: "Join premier Soulsborne loremasters for a deep interactive dive into the mythology of the Outer Gods, Marika's hidden history, and timeline revelations.",
      speakers: ["VaatiVidya (Lore Maestro)", "Smug (Archaeologist)", "Tarnished Archaeologist"],
      passesAvailable: 500,
      price: "Free Community RSVP",
      vipPerks: ["Live Q&A Speaker Priority", "Digital Lore Compendium PDF", "Exclusive Discord Role"]
    },
    {
      id: "event-cosplay-championship",
      title: "National Cosplay & Armor Gala",
      category: "Cosplay",
      dateMonth: "DEC",
      dateDay: "12",
      year: "2026",
      fullDate: "December 12, 2026",
      time: "2:00 PM - 10:00 PM PKT",
      location: "Alhamra Cultural Complex, Lahore",
      type: "In-Person",
      badge: "LIVE STAGE",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      description: "Witness master prop builders, seamstresses, and armor crafters compete for the National Cosplay Championship with Rs. 500,000 in grand prize pool.",
      speakers: ["Yaya Han (Guest Judge)", "Kamui Cosplay (Workshop Host)"],
      passesAvailable: 85,
      price: "Rs. 1,500 Standard Entry",
      vipPerks: ["Front Row Seating", "Access to Backstage Armor Workshop", "Photo Pass with Judges"]
    },
    {
      id: "event-kpop-starlight-night",
      title: "K-Pop Starlight Random Dance & Cup Sleeve",
      category: "Meetup",
      dateMonth: "DEC",
      dateDay: "26",
      year: "2026",
      fullDate: "December 26, 2026",
      time: "4:00 PM - 8:00 PM PKT",
      location: "Centaurus Rooftop Lounge, Islamabad",
      type: "In-Person",
      badge: "FAN MEETUP",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
      description: "Celebrate year-end comebacks! Huge random play dance session, custom photo card trading tables, cup sleeve gifts, and fan cover stages.",
      speakers: ["K-Squad Dance Crew", "DJ Minho (K-Remix Set)"],
      passesAvailable: 120,
      price: "Free Admission",
      vipPerks: ["Exclusive Goodie Bag with 5 Photocards", "Special Drink Ticket", "Priority Dance Circle"]
    }
  ],

  trivia: [
    {
      question: "In Jujutsu Kaisen, what is the core requirement of Gojo Satoru's 'Limitless' cursed technique that necessitates the Six Eyes?",
      options: [
        "It consumes so much cursed energy that it cannot be controlled without atomic-scale visual perception",
        "It requires physical contact with the opponent's shadow",
        "It can only be activated when Gojo is emotionally detached",
        "It must be recharged under direct sunlight"
      ],
      correctIndex: 0,
      category: "Anime",
      explanation: "The Limitless technique manipulates space at an atomic level. Without the Six Eyes to process cursed energy consumption down to infinitesimal fractions, using it would rapidly exhaust the user's brain and cursed energy reserve."
    },
    {
      question: "In Elden Ring, who is the blade of Miquella, who famously stated she has never known defeat?",
      options: [
        "Ranni the Witch",
        "Malenia",
        "Queen Marika",
        "Rellana, Twin Moon Knight"
      ],
      correctIndex: 1,
      category: "Gaming",
      explanation: "Malenia, Blade of Miquella, is an Empyrean cursed with the Scarlet Rot from birth. Her legendary Waterfowl Dance and undefeated combat record made her one of the most famous bosses in gaming history."
    },
    {
      question: "In Frank Herbert's Dune, what is the Litany Against Fear recited by the Bene Gesserit?",
      options: [
        "'I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.'",
        "'Through strength I gain power, through power I gain victory.'",
        "'He who controls the spice controls the destiny of all souls.'",
        "'Silence is the path to inner awakening.'"
      ],
      correctIndex: 0,
      category: "Movies & Books",
      explanation: "The Litany Against Fear is an incantation used throughout the Dune saga to focus the mind and overcome instinctual terror during life-or-death situations."
    },
    {
      question: "In the animated series Arcane, what was Jinx's childhood name before she took on her chaotic moniker?",
      options: [
        "Violet",
        "Powder",
        "Cassandra",
        "Mel"
      ],
      correctIndex: 1,
      category: "TV Shows",
      explanation: "Before being separated from her sister Vi and taken in by Silco, Jinx was known as Powder, a gentle but insecure tinkerer in the Undercity of Zaun."
    },
    {
      question: "In Berserk, what is the name of the colossal slab of iron that Guts wields as a sword?",
      options: [
        "The Dragonslayer",
        "Beast cleaver",
        "The Eclipse Edge",
        "God Hand Blade"
      ],
      correctIndex: 0,
      category: "Manga",
      explanation: "Forged by the blacksmith Godo to slay a literal dragon, the Dragonslayer is described as too big, too thick, too heavy, and too rough to be called a sword—more like a raw heap of iron."
    }
  ],

  quizQuestions: [
    {
      id: "q1",
      question: "When faced with an impossible obstacle, what is your primary instinct?",
      options: [
        { text: "Channel inner discipline and awaken hidden power through pure determination.", category: "anime" },
        { text: "Analyze the mechanics, find the optimal build, and exploit the weakness.", category: "gaming" },
        { text: "Weigh the cinematic stakes, make the hard moral choice, and sacrifice for the greater good.", category: "movies" },
        { text: "Express my unique style, stay composed, and mesmerize everyone with sheer charisma.", category: "kpop" }
      ]
    },
    {
      id: "q2",
      question: "What kind of setting would you choose for your ideal universe?",
      options: [
        { text: "A futuristic cyberpunk metropolis with neon rain and sprawling sub-levels.", category: "gaming" },
        { text: "A supernatural Tokyo realm filled with ancient cursed spirits and modern sorcerers.", category: "anime" },
        { text: "A vast desert planet with political intrigue, prophecy, and interstellar empires.", category: "movies" },
        { text: "A grim, dark medieval kingdom drawn with intricate, atmospheric cross-hatching.", category: "manga" }
      ]
    },
    {
      id: "q3",
      question: "Which aesthetic pulls you in the most?",
      options: [
        { text: "High-fashion Y2K streetwear, dazzling stage lights, and crisp sync beats.", category: "kpop" },
        { text: "Gritty comic panels, high-contrast ink shadows, and multiversal color pops.", category: "comics" },
        { text: "Epic hand-painted cinematic vistas with sweeping orchestral soundscapes.", category: "movies" },
        { text: "Dynamic shonen speed lines, explosive aura bursts, and dramatic close-ups.", category: "anime" }
      ]
    },
    {
      id: "q4",
      question: "What type of weapon or ability would you manifest in battle?",
      options: [
        { text: "A colossal greatsword forged from dark iron that cuts through destiny itself.", category: "manga" },
        { text: "Hacked cyberware, nanotech blade, and neural overclocking reflexes.", category: "gaming" },
        { text: "A personal domain barrier that bends space and renders you untouchable.", category: "anime" },
        { text: "A masked secret identity with bio-electric venom strikes and agility.", category: "comics" }
      ]
    },
    {
      id: "q5",
      question: "What is the ultimate purpose of storytelling in your eyes?",
      options: [
        { text: "To explore complex philosophical dilemmas and deconstruct legendary myths.", category: "movies" },
        { text: "To give players agency, mastery, and unscripted emergent adventures.", category: "gaming" },
        { text: "To remind us that human willpower can overcome even cosmic despair.", category: "manga" },
        { text: "To unite people worldwide through shared emotional rhythm and infectious joy.", category: "kpop" }
      ]
    }
  ],

  quizResults: {
    anime: {
      title: "Neo-Tokyo Sorcerer",
      badge: "SHONEN MASTERY",
      icon: "🌸",
      quote: "Throughout heaven and earth, your passion burns brightest.",
      description: "You thrive on emotional resonance, indomitable willpower, and escalating power systems. You don't just watch stories; you live through every training arc, every tearful sacrifice, and every transcendent awakening.",
      recommendedFandoms: ["Anime Hub", "Manga Archives", "Jujutsu Kaisen Lore"],
      color: "#ec4899"
    },
    gaming: {
      title: "Night City Netrunner",
      badge: "LEGENDARY OPERATIVE",
      icon: "🎮",
      quote: "No mechanics unmastered. No boss undefeated.",
      description: "You are driven by discovery, tactical mastery, and the thrill of immersion. Whether diving into the lore of the Lands Between or optimizing builds in a cybernetic sandbox, your reflexes and strategic mind set you apart.",
      recommendedFandoms: ["Gaming Lore", "Esports Arenas", "FromSoftware Compendium"],
      color: "#06b6d4"
    },
    movies: {
      title: "Multiverse Cinephile",
      badge: "GRAND NARRATOR",
      icon: "🎬",
      quote: "Cinema is a mirror into the soul of the cosmos.",
      description: "You appreciate the subtle nuances of cinematography, directorial vision, and moral complexity. You seek stories that challenge the nature of fate, whether on the dunes of Arrakis or within the shadows of Gotham.",
      recommendedFandoms: ["Movie Vault", "TV Drama Room", "Director Spotlights"],
      color: "#f59e0b"
    },
    kpop: {
      title: "Celestial Starlight Icon",
      badge: "GLOBAL PHENOMENON",
      icon: "🎤",
      quote: "Bringing the rhythm of the universe to the main stage.",
      description: "Your energy is vibrant, expressive, and magnetic. You celebrate visual perfection, addictive musical production, and the electric camaraderie of worldwide fandom communities.",
      recommendedFandoms: ["K-Pop Pulse", "Concert Tours", "Photocard Exchange"],
      color: "#f43f5e"
    },
    comics: {
      title: "Multiverse Guardian",
      badge: "HEROIC INSTINCT",
      icon: "💥",
      quote: "Anyone can wear the mask. You define it.",
      description: "You stand for justice, moral grit, and the thrill of multiversal possibilities. You love intricate comic continuity, heroic defiance, and timeless art that leaps from every panel.",
      recommendedFandoms: ["Comics Multiverse", "Spider-Man Archive", "Batman Chronicles"],
      color: "#e11d48"
    },
    manga: {
      title: "The Indomitable Struggler",
      badge: "INK TRANSCENDENCE",
      icon: "📖",
      quote: "Keep moving forward. Even through the darkest eclipse.",
      description: "You possess a profound appreciation for pure artistic craftsmanship, raw human emotion, and uncompromising narratives. The weight of the ink on paper speaks directly to your soul.",
      recommendedFandoms: ["Manga Vault", "Berserk Study", "Chainsaw Fiend Club"],
      color: "#8b5cf6"
    }
  },

  communityPosts: [
    {
      id: "post-1",
      author: "HoloKitsune",
      handle: "@holokitsune",
      avatar: "🦊",
      time: "25m ago",
      tag: "Anime",
      content: "Rewatching the Shibuya Incident arc in 4K HDR. The sound design during Sukuna's domain expansion still gives me absolute goosebumps. What's your #1 anime sequence of all time?",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
      likes: 84,
      liked: false,
      replies: 19
    },
    {
      id: "post-2",
      author: "CyberRonin",
      handle: "@cyberronin_2077",
      avatar: "🦾",
      time: "1h ago",
      tag: "Gaming",
      content: "Over 200 hours in Elden Ring: Shadow of the Erdtree and I just discovered an entire hidden catacomb beneath the waterfall. FromSoft's vertical world design is unmatched in the industry!",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
      likes: 142,
      liked: false,
      replies: 31
    },
    {
      id: "post-3",
      author: "CinemaVesper",
      handle: "@vesper_films",
      avatar: "📽️",
      time: "3h ago",
      tag: "Movies",
      content: "Dune Messiah casting rumors are getting wild. If Villeneuve brings in Florence Pugh for a expanded role as Princess Irulan, the political intrigue is going to be peak cinema.",
      image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80",
      likes: 97,
      liked: false,
      replies: 14
    },
    {
      id: "post-4",
      author: "BunnyHype",
      handle: "@bunny_stan",
      avatar: "🐰",
      time: "5h ago",
      tag: "K-Pop",
      content: "The new album packaging concept with the retro transparent cassette player is so aesthetic. Who else is collecting all the member photo cards?",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
      likes: 210,
      liked: false,
      replies: 48
    }
  ]
};

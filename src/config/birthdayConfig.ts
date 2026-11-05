export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  rotation?: number;
}

export interface PhotoStory {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  story: string;
  dateTag?: string;
}

export interface SpecialReason {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface PromiseItem {
  id: number;
  category: string;
  text: string;
  detail: string;
}

export interface BirthdayWish {
  id: number;
  title: string;
  message: string;
  tag: string;
  accentColor?: string;
}

export interface FutureDream {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  reaction: string;
}

export interface VirtualGift {
  id: number;
  boxTitle: string;
  ribbonColor: string;
  surpriseTitle: string;
  surpriseMessage: string;
  iconName: string;
}

export interface LittleThing {
  id: number;
  title: string;
  message: string;
  emoji: string;
}

export interface BirthdayConfig {
  recipientName: string;
  creatorName: string;
  targetDateISO: string;
  timezoneLabel: string;
  heroHeading: string;
  heroSubtitle: string;
  heroTagline: string;
  heroPhotoUrl: string;
  storybookIntro: {
    title: string;
    subtitle: string;
    chapter1: string;
    chapter2: string;
  };
  letterTitle: string;
  letterSalutation: string;
  letterBody: string;
  letterSignature: string;
  letterHighlight: string;
  galleryPhotos: GalleryPhoto[];
  photoStories: PhotoStory[];
  reasons: SpecialReason[];
  littleThings: LittleThing[];
  promises: PromiseItem[];
  wishes: BirthdayWish[];
  futureDreams: FutureDream[];
  quizQuestions: QuizQuestion[];
  virtualGifts: VirtualGift[];
  scratchSecret: {
    prompt: string;
    hiddenTitle: string;
    hiddenMessage: string;
    closingNote: string;
  };
  surpriseHeading: string;
  surpriseSubtitle: string;
  surpriseRevealHeading: string;
  surpriseRevealBody: string;
  surpriseFinalMessage: string;
  finalGreeting: string;
  finalMessage: string;
  finalBigStatement: string;
  finalFootnote: string;
  celebrationPhotoUrl?: string;
  finalPhotoUrl?: string;
  scrapbookPhotos?: GalleryPhoto[];
  surprisePhotos?: GalleryPhoto[];
}

export const DEFAULT_BIRTHDAY_CONFIG: BirthdayConfig = {
  recipientName: "Vaishnavi",
  creatorName: "Daksh",
  targetDateISO: "2026-11-06T00:00:00+05:30",
  timezoneLabel: "Asia/Kolkata (IST)",
  heroHeading: "Happiest Birthday, Vaishnavi!",
  heroSubtitle: "Today is all about you, your smile, and all the beautiful things that make you special.",
  heroTagline: "Made with love, especially for you.",
  heroPhotoUrl: "/images/photo1.jpg",
  celebrationPhotoUrl: "/images/photo14.jpg",
  finalPhotoUrl: "/images/photo15.jpg",
  
  storybookIntro: {
    title: "Chapter One: Our Little World",
    subtitle: "A place built out of soft smiles, late-night conversations, and timeless memories.",
    chapter1: "In a world that is always in a hurry, you have this rare, quiet magic about you. You make normal days feel light, you turn small conversations into comfort, and your presence carries a kind of calm that is impossible to forget.",
    chapter2: "This little digital realm is a tribute to that magic. Every page, every note, every photograph, and every little promise here was put together with one simple purpose: to make you smile on your most special day.",
  },

  letterTitle: "A letter I wanted you to have...",
  letterSalutation: "My Dearest Vaishnavi,",
  letterBody: `Happiest Birthday, Vaishnavi!

Aaj ka din mere liye bhi bahut hi zyada special hai, kyunki aaj us insaan ka janamdin hai jo meri life mein apni ek alag, anokhi aur khoobsurat jagah rakhti hai.

Honestly, jab main yeh likhne baitha, toh mujhe samajh nahi aa raha tha ki sab kuch shabdon mein kaise sametoon. But I really want you to know how deeply you are appreciated and cherished.

You are so incredibly special to me. Your smile—the genuine, effortless one that lights up your whole face—has a way of turning even the heaviest day into something light and hopeful. The way you talk, your little everyday habits, the thoughtful things you say, and the way you care without ever expecting anything in return... all these small moments mean so much more to me than you could possibly imagine.

I want you to know how much I value our conversations. Chahe hum ghanton baat karein ya bas chup-chaap ek dusre ki presence ko feel karein, with you, everything feels natural, safe, and deeply comforting. You have this rare ability to make me feel heard and understood, and for that, I will always be thankful.

On this birthday, I genuinely wish you endless happiness, beautiful adventures, and peaceful days. May this new year of your life unlock every door you’ve been knocking on. I hope you achieve every single goal you have set your eyes on, because nobody deserves success and genuine peace more than you do. You have so much talent, strength, and grace inside you.

Never let the world dim your light or make you doubt yourself. I hope you always keep smiling, keep dreaming without fear, and never stop being the wonderful, authentic, and caring person that you are today.

I may not always find the perfect words at the perfect time, but meri har koshish yahi rahegi ki tum hamesha respected, valued, aur genuinely special feel karo. Your happiness matters to me in a way words will never quite capture.

Thank you for being in my life. Thank you for your warmth, your patience, and your pure heart.

Once again, happiest, happiest birthday, Vaishnavi. I hope this little world brings a big smile to your face today.

With all my love and warmest prayers,
Yours always,
Daksh ♡`,
  letterSignature: "With all my love,\nYours always,\nDaksh ♡",
  letterHighlight: "DAKSH LOVES YOU THE MOST.",

  // Requirement 2: Photos 2–5 in Memories Gallery
  galleryPhotos: [
    {
      id: "photo-2",
      url: "/images/photo2.jpg",
      caption: "A little moment, a beautiful memory.",
      rotation: -2,
    },
    {
      id: "photo-3",
      url: "/images/photo3.jpg",
      caption: "One of my favourite pictures.",
      rotation: 2.5,
    },
    {
      id: "photo-4",
      url: "/images/photo4.jpg",
      caption: "Some memories deserve to stay forever.",
      rotation: -2,
    },
    {
      id: "photo-5",
      url: "/images/photo5.jpg",
      caption: "Simply Vaishnavi.",
      rotation: 2,
    },
  ],

  // Requirement 3: Photos 6–8 in Photo Stories
  photoStories: [
    {
      id: "story-1",
      url: "/images/photo6.jpg",
      title: "The Magic in Your Smile",
      subtitle: "Chapter I — Warmth that lights up a room",
      story: "There are smiles that are polite, and then there is your smile—the one that reaches straight into someone's heart and makes everything feel okay. It's my favorite sight in the entire world.",
      dateTag: "Timeless",
    },
    {
      id: "story-2",
      url: "/images/photo7.jpg",
      title: "Unspoken Comfort",
      subtitle: "Chapter II — The ease of being ourselves",
      story: "With you, silence is never awkward and laughter is never forced. You create a space where being oneself is not just accepted, but celebrated.",
      dateTag: "Pure Connection",
    },
    {
      id: "story-3",
      url: "/images/photo8.jpg",
      title: "Golden Hour Reverie",
      subtitle: "Chapter III — Radiance in simplicity",
      story: "You don't need spotlight or fanfare to shine. Like the gentle warmth of sunset, your kindness and thoughtful nature leave a quiet, lasting glow everywhere you go.",
      dateTag: "Grace",
    },
  ],

  // Requirement 4: Photos 9–11 in Scrapbook Section
  scrapbookPhotos: [
    {
      id: "photo-9",
      url: "/images/photo9.jpg",
      caption: "Quiet moments that speak louder than words.",
      rotation: -2.5,
    },
    {
      id: "photo-10",
      url: "/images/photo10.jpg",
      caption: "Every glance, a little spark of joy.",
      rotation: 2,
    },
    {
      id: "photo-11",
      url: "/images/photo11.jpg",
      caption: "Captured smiles and timeless warmth.",
      rotation: -1.5,
    },
  ],

  // Requirement 5: Photos 12–13 in Surprise Section
  surprisePhotos: [
    {
      id: "photo-12",
      url: "/images/photo12.jpg",
      caption: "A secret treasure — forever cherished.",
      rotation: -2,
    },
    {
      id: "photo-13",
      url: "/images/photo13.jpg",
      caption: "The sweetest reason to smile.",
      rotation: 2,
    },
  ],

  reasons: [
    {
      id: 1,
      title: "Your beautiful smile.",
      description: "The kind of smile that brightens up even the gloomiest day and effortlessly brings warmth to everyone around you.",
      iconName: "Sparkles",
    },
    {
      id: 2,
      title: "The way you make ordinary moments feel special.",
      description: "With you, even a simple conversation or quiet walk turns into an unforgettable, golden memory.",
      iconName: "Heart",
    },
    {
      id: 3,
      title: "Your unique personality.",
      description: "Authentic, thoughtful, witty, and charming—there is truly no one else in this whole world quite like you.",
      iconName: "Star",
    },
    {
      id: 4,
      title: "Your little habits.",
      description: "The cute quirks, the way your eyes light up when you're excited, and all the gentle nuances that make you Vaishnavi.",
      iconName: "Smile",
    },
    {
      id: 5,
      title: "Your kindness.",
      description: "Your caring heart, genuine empathy, and the quiet compassion you bring to everyone and everything you touch.",
      iconName: "Sun",
    },
    {
      id: 6,
      title: "The happiness you bring.",
      description: "An infectious, uplifting energy that makes life feel lighter, happier, and infinitely more meaningful.",
      iconName: "Flower",
    },
    {
      id: 7,
      title: "The way you are simply yourself.",
      description: "Unapologetically genuine, wonderfully real, and effortlessly the most special person.",
      iconName: "Flame",
    },
    {
      id: 8,
      title: "Your gentle voice.",
      description: "A calming presence that turns chaos into stillness whenever we talk.",
      iconName: "Music",
    },
    {
      id: 9,
      title: "The depth of your thoughts.",
      description: "You see the world with sensitivity, intelligence, and a rare emotional intelligence that I deeply admire.",
      iconName: "BookOpen",
    },
    {
      id: 10,
      title: "How patient you can be.",
      description: "Even when things are chaotic, your patience and composure show what a graceful soul you are.",
      iconName: "Feather",
    },
    {
      id: 11,
      title: "Your adorable reactions.",
      description: "From surprise to sudden bursts of laughter, your expressions are the cutest thing ever.",
      iconName: "HeartHandshake",
    },
    {
      id: 12,
      title: "Your resilience.",
      description: "How you handle challenges quietly with inner strength and keep moving forward with grace.",
      iconName: "ShieldCheck",
    },
    {
      id: 13,
      title: "The warmth in your eyes.",
      description: "An honesty and warmth that makes anyone feel completely safe and respected in your presence.",
      iconName: "Eye",
    },
    {
      id: 14,
      title: "Your playful, cute side.",
      description: "Those little teasing remarks and witty comebacks that always catch me off guard and make me laugh.",
      iconName: "PartyPopper",
    },
    {
      id: 15,
      title: "Simply because you are Vaishnavi.",
      description: "No list could ever be enough. Just you being in this world makes everything so much more beautiful.",
      iconName: "Crown",
    },
  ],

  littleThings: [
    {
      id: 1,
      title: "The way your eyes light up",
      message: "Whenever you talk about something you truly love, your eyes sparkle with this infectious energy that I could watch forever.",
      emoji: "✨",
    },
    {
      id: 2,
      title: "Your laugh when something is truly funny",
      message: "Not the polite laugh, but that pure, candid, wholehearted laughter—it is genuinely my favorite sound.",
      emoji: "💖",
    },
    {
      id: 3,
      title: "How thoughtful you are",
      message: "You remember small details that most people overlook, showing just how deeply you care.",
      emoji: "🌸",
    },
    {
      id: 4,
      title: "Your adorable little mannerisms",
      message: "The little head tilt, how you express excitement, and the soft gestures that are uniquely yours.",
      emoji: "🎀",
    },
    {
      id: 5,
      title: "The comfort of your presence",
      message: "Even miles away or in quiet silence, knowing you're there brings an instant sense of peace.",
      emoji: "☕",
    },
  ],

  promises: [
    {
      id: 1,
      category: "Respect",
      text: "I will always respect your feelings, boundaries, and individuality.",
      detail: "Your thoughts and emotions will always be heard and deeply valued by me.",
    },
    {
      id: 2,
      category: "Appreciation",
      text: "I will always appreciate the little things you do.",
      detail: "No matter how busy life gets, I will never take your presence for granted.",
    },
    {
      id: 3,
      category: "Celebration",
      text: "I will celebrate every single achievement of yours.",
      detail: "Big milestones or tiny victories, I will always be your loudest supporter.",
    },
    {
      id: 4,
      category: "Support",
      text: "I will support your dreams without condition.",
      detail: "Whatever you aspire to become or pursue, I will be right there behind you.",
    },
    {
      id: 5,
      category: "Joy",
      text: "I will try my best to make you smile every day.",
      detail: "Whether through a goofy joke or thoughtful words when your day is rough.",
    },
    {
      id: 6,
      category: "Value",
      text: "I will always cherish and value the moments we share.",
      detail: "Every memory, every late-night conversation, holds a permanent place in my heart.",
    },
    {
      id: 7,
      category: "Trust",
      text: "I will always be honest, genuine, and transparent with you.",
      detail: "A relationship built on unwavering trust and sincere openness.",
    },
    {
      id: 8,
      category: "Kindness",
      text: "I will always treat you with gentle care and warmth.",
      detail: "Even during disagreements, kindness and empathy will always come first.",
    },
    {
      id: 9,
      category: "Patience",
      text: "I will be patient, understanding, and attentive to you.",
      detail: "Giving you the room and comfort to speak your mind freely.",
    },
    {
      id: 10,
      category: "Encouragement",
      text: "I will remind you of your strength whenever you doubt yourself.",
      detail: "Because you are capable of so much more than you give yourself credit for.",
    },
    {
      id: 11,
      category: "Protection",
      text: "I will safeguard your peace and stand by your side.",
      detail: "You will never have to face tough days feeling like you are alone.",
    },
    {
      id: 12,
      category: "Unwavering Love",
      text: "I will never stop caring for you with all my heart.",
      detail: "Today, tomorrow, and through all the years to come: Daksh loves you the most.",
    },
  ],

  wishes: [
    {
      id: 1,
      title: "Endless Radiance",
      message: "May your year ahead be as glowing, radiant, and inspiring as your smile.",
      tag: "Happiness",
      accentColor: "#FFE4EC",
    },
    {
      id: 2,
      title: "Fulfilled Ambitions",
      message: "May every dream you hold close to your heart begin to unfold effortlessly.",
      tag: "Success",
      accentColor: "#FFF0F5",
    },
    {
      id: 3,
      title: "Peace of Mind",
      message: "I wish you quiet mornings, restful nights, and a calm, worry-free heart.",
      tag: "Serenity",
      accentColor: "#FADADD",
    },
    {
      id: 4,
      title: "Unstoppable Laughter",
      message: "May you find reasons to laugh until your stomach hurts every single week.",
      tag: "Joy",
      accentColor: "#FFE4EC",
    },
    {
      id: 5,
      title: "Good Health & Vitality",
      message: "Wishing you vibrant health, glowing energy, and peace in every step.",
      tag: "Wellness",
      accentColor: "#FFF0F5",
    },
    {
      id: 6,
      title: "Meaningful Adventures",
      message: "May this year take you to beautiful places, scenic sunsets, and cozy cafes.",
      tag: "Adventure",
      accentColor: "#FADADD",
    },
    {
      id: 7,
      title: "Surrounded by Love",
      message: "May you always know and feel deeply how loved and valued you are.",
      tag: "Love",
      accentColor: "#FFE4EC",
    },
    {
      id: 8,
      title: "Confidence & Pride",
      message: "I wish that you see in yourself the incredible brilliance that others see in you.",
      tag: "Growth",
      accentColor: "#FFF0F5",
    },
    {
      id: 9,
      title: "Comfort in Little Things",
      message: "Warm cups of tea, your favorite songs, gentle breezes, and sweet surprises.",
      tag: "Comfort",
      accentColor: "#FADADD",
    },
    {
      id: 10,
      title: "Courage to Fly",
      message: "May you boldly take every leap you want to take, knowing wings will carry you.",
      tag: "Bravery",
      accentColor: "#FFE4EC",
    },
    {
      id: 11,
      title: "Unexpected Miracles",
      message: "May wonderful coincidences and pleasant surprises greet you when least expected.",
      tag: "Magic",
      accentColor: "#FFF0F5",
    },
    {
      id: 12,
      title: "True Friendship",
      message: "May your life be blessed with people who support, respect, and uplift you.",
      tag: "Connection",
      accentColor: "#FADADD",
    },
    {
      id: 13,
      title: "Creative Spark",
      message: "May your mind stay curious, creative, and passionate about what you love.",
      tag: "Inspiration",
      accentColor: "#FFE4EC",
    },
    {
      id: 14,
      title: "Gentle Blessings",
      message: "May the universe protect your gentle spirit from harshness and pain.",
      tag: "Protection",
      accentColor: "#FFF0F5",
    },
    {
      id: 15,
      title: "Financial Abundance",
      message: "Wishing you prosperity, abundance, and independence in everything you build.",
      tag: "Prosperity",
      accentColor: "#FADADD",
    },
    {
      id: 16,
      title: "Sweetest Memories",
      message: "May the memories you make this year become timeless treasures for life.",
      tag: "Treasures",
      accentColor: "#FFE4EC",
    },
    {
      id: 17,
      title: "Quiet Strength",
      message: "May you always remember your innate grace and power during any storm.",
      tag: "Strength",
      accentColor: "#FFF0F5",
    },
    {
      id: 18,
      title: "Endless Reasons to Celebrate",
      message: "May every month give you a brand-new reason to pop confetti and smile.",
      tag: "Celebration",
      accentColor: "#FADADD",
    },
    {
      id: 19,
      title: "Guarded Happiness",
      message: "May your peace of mind remain unshakeable and your soul forever young.",
      tag: "Soul",
      accentColor: "#FFE4EC",
    },
    {
      id: 20,
      title: "A Year of Magic",
      message: "Happiest Birthday Vaishnavi. You deserve the best this world has to offer.",
      tag: "Birthday Magic",
      accentColor: "#FFF0F5",
    },
  ],

  futureDreams: [
    {
      id: 1,
      title: "Scenic Road Trips & Long Drives",
      description: "Cruising down scenic highways with your favorite playlist playing and sunset filling the sky.",
      iconName: "Compass",
    },
    {
      id: 2,
      title: "Cozy Aesthetic Cafe Visits",
      description: "Discovering quaint little cafes, sharing warm pastries, and talking endlessly without keeping track of time.",
      iconName: "Coffee",
    },
    {
      id: 3,
      title: "Stargazing on Quiet Nights",
      description: "Sitting under a sky full of stars, wrapped in warmth, talking about universe and dreams.",
      iconName: "Sparkles",
    },
    {
      id: 4,
      title: "Celebrating Every Big Milestone",
      description: "Popping champagne when you land that dream project or achieve that big goal you worked so hard for.",
      iconName: "Trophy",
    },
    {
      id: 5,
      title: "A Scrapbook Filled to the Brim",
      description: "Collecting polaroids, concert tickets, notes, and dried flowers into albums of our journey.",
      iconName: "BookMarked",
    },
    {
      id: 6,
      title: "A Lifetime of Meaningful Smiles",
      description: "Knowing that whatever changes, the care, respect, and warmth we share will only grow stronger.",
      iconName: "Heart",
    },
  ],

  quizQuestions: [
    {
      id: 1,
      question: "What is Daksh's absolute favorite thing about Vaishnavi?",
      options: [
        "Her radiant smile that brightens any room",
        "Her thoughtful, caring nature",
        "Her cute quirks and habits",
        "All of the above and so much more!"
      ],
      correctIndex: 3,
      reaction: "100% Correct! Everything about you is genuinely treasured.",
    },
    {
      id: 2,
      question: "On a scale of 1 to 10, how special is today?",
      options: [
        "10/10",
        "100/10",
        "Infinity and beyond",
        "The most special day of the whole year!"
      ],
      correctIndex: 3,
      reaction: "Yes! Because today is the day Vaishnavi was born!",
    },
    {
      id: 3,
      question: "What should Vaishnavi do whenever she has a tough day?",
      options: [
        "Keep it all to herself",
        "Remember that Daksh is always in her corner",
        "Eat some ice cream & smile",
        "Both B and C!"
      ],
      correctIndex: 3,
      reaction: "Always remember: you never have to face anything alone.",
    },
    {
      id: 4,
      question: "What is the primary rule of this website?",
      options: [
        "Strictly no smiling",
        "Only happy vibes, smiles, and feeling loved",
        "Read it in 5 seconds",
        "Forget about it tomorrow"
      ],
      correctIndex: 1,
      reaction: "Exactly! This whole world was made just to bring joy to your face.",
    },
    {
      id: 5,
      question: "What makes ordinary moments with Vaishnavi feel so special?",
      options: [
        "Her natural warmth & genuine authenticity",
        "How easy it is to talk for hours",
        "The quiet comfort she brings",
        "All of the above!"
      ],
      correctIndex: 3,
      reaction: "Bingo! You turn even the simplest conversation into golden memories.",
    },
    {
      id: 6,
      question: "What is Daksh's biggest wish for your new year?",
      options: [
        "That you achieve every single goal you dream of",
        "That you stay healthy, peaceful, and radiant",
        "That you laugh and smile every single day",
        "All of the above and endless blessings!"
      ],
      correctIndex: 3,
      reaction: "You deserve every ounce of success and joy the universe can offer.",
    },
    {
      id: 7,
      question: "Who loves Vaishnavi the absolute most?",
      options: [
        "Someone random",
        "DAKSH (without a shadow of a doubt!)",
        "The moon and stars",
        "All the teddy bears in the world"
      ],
      correctIndex: 1,
      reaction: "DAKSH LOVES YOU THE MOST. Always and forever! ♡",
    },
    {
      id: 8,
      question: "What is the key takeaway for today?",
      options: [
        "You are deeply appreciated",
        "You are respected and cherished",
        "You are uniquely wonderful",
        "All of these, today and every single day!"
      ],
      correctIndex: 3,
      reaction: "Perfect score! You are truly one of a kind, Vaishnavi.",
    },
  ],

  virtualGifts: [
    {
      id: 1,
      boxTitle: "Gift Box 01",
      ribbonColor: "#C65B7C",
      surpriseTitle: "The Golden Smile Voucher",
      surpriseMessage: "Redeemable anytime: One instant mood lifter, unconditional support, and a guaranteed reason to smile whenever you need it.",
      iconName: "Smile",
    },
    {
      id: 2,
      boxTitle: "Gift Box 02",
      ribbonColor: "#F4A6B8",
      surpriseTitle: "A Jar of 365 Happy Thoughts",
      surpriseMessage: "Filled with endless reminders of your strength, your beauty, and how proud I am of the person you are becoming.",
      iconName: "Heart",
    },
    {
      id: 3,
      boxTitle: "Gift Box 03",
      ribbonColor: "#E8C7A0",
      surpriseTitle: "The 24/7 Listening Ear Pass",
      surpriseMessage: "Valid for life: Talk about anything—your biggest dreams, smallest rants, random thoughts—with zero judgment, just care.",
      iconName: "Ear",
    },
    {
      id: 4,
      boxTitle: "Gift Box 04",
      ribbonColor: "#DDA0DD",
      surpriseTitle: "A Treat & Adventure Ticket",
      surpriseMessage: "Entitles Vaishnavi to your favorite coffee, sweet treat, or movie night wherever and whenever you want.",
      iconName: "Gift",
    },
    {
      id: 5,
      boxTitle: "Gift Box 05",
      ribbonColor: "#C65B7C",
      surpriseTitle: "An Unbreakable Promise",
      surpriseMessage: "No matter how fast time moves or how life changes, Daksh will always value, respect, and love you the most.",
      iconName: "Crown",
    },
  ],

  scratchSecret: {
    prompt: "Gently rub or tap the scratch card to reveal the hidden note...",
    hiddenTitle: "A Secret Thought from Daksh",
    hiddenMessage: "If I could give you one gift in this world, I would give you the ability to see yourself through my eyes. Only then would you realize how truly extraordinary, rare, and wonderful you really are. Happy Birthday, Vaishnavi.",
    closingNote: "Forever your biggest admirer ♡",
  },

  surpriseHeading: "One More Little Surprise...",
  surpriseSubtitle: "There's something I really want you to know.",
  surpriseRevealHeading: "YOU ARE SO SPECIAL, VAISHNAVI!",
  surpriseRevealBody: "Out of all the things I could gift you, I wanted to create something that you could open and smile at anytime, anywhere.",
  surpriseFinalMessage: "DAKSH LOVES YOU THE MOST.",
  finalGreeting: "Once Again, Happiest Birthday Vaishnavi!",
  finalMessage: "May your life always be filled with happiness, love, laughter, and beautiful surprises.",
  finalBigStatement: "DAKSH LOVES YOU THE MOST ♡",
  finalFootnote: "Made with love by Daksh.",
};

const STORAGE_KEY = "vaishnavi_birthday_config_v3";

export function loadSavedConfig(): BirthdayConfig {
  if (typeof window === "undefined") return DEFAULT_BIRTHDAY_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BIRTHDAY_CONFIG;
    const parsed = JSON.parse(raw);
    const merged = { ...DEFAULT_BIRTHDAY_CONFIG, ...parsed };
    // Ensure all 15 local photos are preferred over old unsplash placeholders
    if (merged.heroPhotoUrl && merged.heroPhotoUrl.includes("unsplash.com")) {
      merged.heroPhotoUrl = DEFAULT_BIRTHDAY_CONFIG.heroPhotoUrl;
    }
    if (merged.galleryPhotos && merged.galleryPhotos.some((p: GalleryPhoto) => p.url.includes("unsplash.com"))) {
      merged.galleryPhotos = DEFAULT_BIRTHDAY_CONFIG.galleryPhotos;
    }
    if (merged.photoStories && merged.photoStories.some((s: PhotoStory) => s.url.includes("unsplash.com"))) {
      merged.photoStories = DEFAULT_BIRTHDAY_CONFIG.photoStories;
    }
    if (!merged.scrapbookPhotos || merged.scrapbookPhotos.length === 0) {
      merged.scrapbookPhotos = DEFAULT_BIRTHDAY_CONFIG.scrapbookPhotos;
    }
    if (!merged.surprisePhotos || merged.surprisePhotos.length === 0) {
      merged.surprisePhotos = DEFAULT_BIRTHDAY_CONFIG.surprisePhotos;
    }
    if (!merged.celebrationPhotoUrl) {
      merged.celebrationPhotoUrl = DEFAULT_BIRTHDAY_CONFIG.celebrationPhotoUrl;
    }
    if (!merged.finalPhotoUrl) {
      merged.finalPhotoUrl = DEFAULT_BIRTHDAY_CONFIG.finalPhotoUrl;
    }
    return merged;
  } catch {
    return DEFAULT_BIRTHDAY_CONFIG;
  }
}

export function saveConfig(config: BirthdayConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to save config to localStorage", e);
  }
}

export function resetConfig(): BirthdayConfig {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_BIRTHDAY_CONFIG;
}

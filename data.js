/* =====================================================================
   SITE CONTENT — edit everything on the website from this one file.
   ===================================================================== */

const SITE = {
  name: 'Laura Gonzalez',
  email: 'laauuugc@gmail.com',
  location: 'Ireland',
  hometown: 'Madrid',
  // Add your profile links here, e.g. { name: 'Instagram', url: 'https://www.instagram.com/yourhandle/' }.
  // While the list is empty, no social links are shown anywhere on the site.
  socials: [],
};

/* My path through Netsoc — shown on every project with netsoc: true */
const NETSOC_JOURNEY = {
  intro: 'I joined Netsoc as First Year Rep in my first year of college, then grew into Graphics Designer and, later, Graphics Officer. Most of the society’s look from those years came from my desk.',
  stops: ['First Year Rep', 'Graphics Designer', 'Graphics Officer'],
};

/* ---------------------------------------------------------------------
   WORKS — every project gets its own page (project.html?p=<slug>).
   section: 'client' or 'personal'
   medium:  personal pieces only: 'Gouache' or 'Digital' (used by the filter)
   images:  first image is the cover on the works grid.
   cover:   optional framing for that cover — pos: 'x% y%' to choose the
            focal point, or fit: 'contain' (+ bg colour) to show it whole.
   TODO: check titles, years and descriptions — I wrote them from the
   images themselves, so adjust anything that isn't quite right.
   --------------------------------------------------------------------- */
const PROJECTS = [
  /* ---------- Client work ---------- */
  /* Ordered strongest first: this is the order on the Client work page */
  {
    slug: 'mascots',
    netsoc: true,
    section: 'client',
    title: 'Netbot, Fuzz & Patch',
    client: 'Netsoc',
    year: '2024',
    disciplines: ['Character design', 'Illustration'],
    summary: 'A family of three mascots, each with a sheet of expressions.',
    description: [
      'Netsoc needed characters that could carry its posters and social posts. I designed three: Netbot, a cheerful computer; Fuzz, a mischievous purple mouse; and Patch, a small green bug.',
      'Each mascot has an expression sheet (waving, laughing, surprised, worried, love-struck) so they can react to whatever the event is, from coffee mornings to pub crawls.',
    ],
    ratio: 0.998, // width ÷ height of the cover image
    images: [
      { src: 'images/web/mascots-1.jpg', alt: '“Introducing our mascots” announcement: Netbot with Fuzz on its head and Patch beside them, surrounded by bunting and confetti.' },
      { src: 'images/web/mascots-2.jpg', alt: 'Expression sheet of Netbot, a purple computer character, in six poses.' },
      { src: 'images/web/mascots-3.jpg', alt: 'Expression sheet of Fuzz, a purple mouse with mint ears, in six poses.' },
      { src: 'images/web/mascots-4.jpg', alt: 'Expression sheet of Patch, a mint-green bug with antennae, in six poses.' },
    ],
  },
  {
    slug: 'freshers-week',
    netsoc: true,
    section: 'client',
    title: 'Freshers’ Week Poster Series',
    client: 'Netsoc',
    year: '2024 & 2025',
    disciplines: ['Poster design', 'Campaign'],
    summary: 'One system, two Freshers’ Weeks, six colours.',
    description: [
      'A poster series for Netsoc’s Freshers’ Week. Every poster shares the same skeleton: a bold “Freshers” header, a starburst frame, the logo running vertically down the side and a glowing day stamp in the corner.',
      'Each night gets its own colour and a mascot dressed for the occasion: a bubble-tea Netbot for Bubble Sort, a party Netbot for the pub crawl and an Among Us Patch for game night.',
      'I designed the series for two Freshers’ Weeks, in 2024 and 2025. The second run kept the same system with new nights: a suited-up Patch for a Big Tech careers talk, Netbot sipping through a bubble tea afternoon with Kakilang, and Patch and Netbot on a treasure hunt for €25 gift cards.',
    ],
    ratio: 0.800, // width ÷ height of the cover image
    images: [
      { src: 'images/web/freshers-1.jpg', alt: 'Green Freshers poster for “Bubble Sort: Rise to the Top” on Wednesday the 17th, with Netbot drinking bubble tea.' },
      { src: 'images/web/freshers-2.jpg', alt: 'Teal Freshers poster for the pub crawl on Thursday the 18th, with Netbot and Fuzz celebrating in confetti.' },
      { src: 'images/web/freshers-3.jpg', alt: 'Lilac Freshers poster for the Among Us game on Friday the 20th on the Netsoc Discord, with Patch in an Among Us suit.' },
      { src: 'images/web/freshers-4.jpg', alt: 'Purple Freshers poster for the Netsoc Talks “Breaking Into Big Tech” session on Tuesday the 17th, in the meeting rooms from 3 to 4pm, with Patch in a suit and tie.' },
      { src: 'images/web/freshers-5.jpg', alt: 'Teal Freshers poster for a Bubble Tea Afternoon with Kakilang on Wednesday the 18th at the Netsoc Freshers stand, with Netbot drinking bubble tea.' },
      { src: 'images/web/freshers-6.jpg', alt: 'Yellow Freshers poster for a treasure hunt with €25 gift card prizes on Thursday the 19th in Brava Lounge from 4 to 6pm, with Patch holding a telescope on top of Netbot.' },
    ],
  },
  {
    slug: 'netsoc-membership-card',
    netsoc: true,
    cover: { fit: 'contain', bg: '#2b2725' },
    section: 'client',
    title: 'Netsoc 30th Anniversary Membership Card',
    client: 'Netsoc',
    year: '2025/26',
    disciplines: ['Print design', 'Branding'],
    summary: 'A two-sided membership card for the society’s 30th year.',
    description: [
      'For Netsoc’s 30th anniversary I designed the society’s membership card, front and back.',
      'The front builds a halftone pattern of overlapping spheres in Netsoc green and lilac around the logo, which reads like a celebration without needing confetti. The back puts the mascots, Netbot and Fuzz, centre stage in a soft violet glow, framed with the membership year.',
    ],
    ratio: 1.583, // width ÷ height of the cover image
    images: [
      { src: 'images/web/netsoc-card-1.jpg', alt: 'Front of the Netsoc membership card: green and lilac halftone spheres around the Netsoc logo, with “Membership Card” and “30th Anniversary”.' },
      { src: 'images/web/netsoc-card-2.jpg', alt: 'Back of the card: the mascot Netbot waving with Fuzz on its head, inside a green rounded frame marked Netsoc 2025/26.' },
    ],
  },
  {
    slug: 'panda',
    section: 'client',
    title: 'Skippers Revenge Panda',
    client: 'Skippers Revenge',
    year: '2026',
    disciplines: ['Illustration', 'Merch design'],
    summary: 'A panda in a captain’s cap for an Irish band’s merch.',
    description: [
      'A commission for the Irish band Skippers Revenge: a contented panda in an oversized, embroidered captain’s cap, complete with a sprig of flowers and an “SR” badge.',
      'The band turned it into their merch, printed on black t-shirts and tote bags. I kept the line work bold and the fills simple so it would still read clearly on dark fabric.',
      'The band wore the t-shirts at their gigs at Whelan’s and at UCD Battle of the Bands.',
    ],
    ratio: 1.000, // width ÷ height of the cover image
    images: [
      { src: 'images/web/panda-1.jpg', alt: 'Illustration of a smiling panda sitting down, wearing a large yellow captain’s cap with a grey brim, flower embroidery and an SR badge for Skippers Revenge.' },
      { src: 'images/web/panda-3.jpg', alt: 'Close-up of the panda print on the black t-shirt, showing the yellow cap, its flower embroidery and the SR badge.' },
      { src: 'images/web/panda-4.jpg', alt: 'The Skippers Revenge t-shirt photographed at an angle on a dark wooden table.' },
    ],
  },
  {
    slug: 'wacs',
    section: 'client',
    title: 'W@CS Events',
    client: 'W@CS × RTC × ServiceNow',
    year: '2024–25',
    disciplines: ['Logo', 'Poster design'],
    summary: 'A logo and event posters with a sky full of clouds.',
    description: [
      'Visual identity and event posters for W@CS. The logo is built from a cloud with an upward arrow running into the @, a small nod to growth and to the cloud.',
      'The posters carry that idea across: soft peach backgrounds, teal clouds drifting in from the edges and lilac type, for a tech talk with RTC and an office visit to ServiceNow.',
    ],
    ratio: 1.011, // width ÷ height of the cover image
    images: [
      { src: 'images/web/wacs-1.jpg', alt: 'Peach poster for the “Securing a Role in Tech” talk and CV review with RTC, Monday 11 November, with clouds, bubble tea and pizza.' },
      { src: 'images/web/wacs-2.jpg', alt: 'Poster for a ServiceNow office visit on 5 February, with lilac information panels and teal clouds.' },
      { src: 'images/web/wacs-3.jpg', alt: 'The W@CS logo: purple lettering on a teal cloud with an orange arrow pointing up.' },
    ],
  },
  {
    slug: 'interview-club',
    netsoc: true,
    section: 'client',
    title: 'Interview Club',
    client: 'Netsoc × Google',
    year: '2025',
    disciplines: ['Poster design'],
    summary: 'Getting students ready for their internship interviews.',
    description: [
      'Poster for Interview Club, a session with guidance from Google professionals and practice with peers.',
      'A giant wifi symbol sits behind Patch and Fuzz mid-conversation, and two empty speech bubbles leave room for the questions you’re about to be asked.',
    ],
    ratio: 0.800, // width ÷ height of the cover image
    images: [
      { src: 'images/web/interview-club-1.jpg', alt: 'Purple Interview Club poster: Patch and Fuzz chatting with speech bubbles over a large wifi symbol, Harmony Studio, Tuesday 23 September, 4 to 5pm.' },
    ],
  },
  {
    slug: 'weekly-events',
    netsoc: true,
    section: 'client',
    title: 'Bubble Sort & CV Workshop',
    client: 'Netsoc',
    year: '2025',
    disciplines: ['Poster design'],
    summary: 'Posters for the society’s regular weekly sessions.',
    description: [
      'Posters for two recurring Netsoc sessions. Bubble Sort, a coding meetup with bubble tea, keeps Netbot and the bubbles from Freshers’ Week but moves to a periwinkle palette.',
      'CV Workshop borrows the look of a desktop: a browser window, a search bar and cursor arrows turn the event details into something that feels like opening a file.',
    ],
    ratio: 0.800, // width ÷ height of the cover image
    images: [
      { src: 'images/web/weekly-events-1.jpg', alt: 'Periwinkle Bubble Sort poster, Thursday the 25th, 12 to 1pm in the Meeting Rooms, with Netbot in a bubble tea cup surrounded by bubbles.' },
      { src: 'images/web/weekly-events-2.jpg', alt: 'Charcoal and green CV Workshop poster designed like a computer window, Thursday 25 September, 12 to 1pm.' },
    ],
  },
  {
    slug: 'coffee-morning',
    netsoc: true,
    section: 'client',
    title: 'Coffee Morning',
    client: 'Netsoc',
    year: '2025',
    disciplines: ['Poster design'],
    summary: 'A coffee morning, written like a line of code.',
    description: [
      'Poster for a Netsoc coffee morning. The title is set like an HTML tag, “< morning />”, and the green blocks recall the windows of a building (or a café front).',
      'Patch steals the show at the bottom, double-fisting two coffees.',
    ],
    ratio: 0.800, // width ÷ height of the cover image
    images: [
      { src: 'images/web/coffee-morning-1.jpg', alt: 'Lavender Coffee Morning poster, Thursday 25 September, 12 to 1pm, with Patch holding two coffee cups.' },
    ],
  },
  {
    slug: 'donut-drop',
    netsoc: true,
    section: 'client',
    title: 'Donut Drop × KPMG',
    client: 'Netsoc × KPMG',
    year: '2025',
    disciplines: ['Poster design', 'Sponsorship'],
    summary: 'A sponsored giveaway that had to be seen from across campus.',
    description: [
      'Poster for a donut giveaway sponsored by KPMG outside the Computer Science building.',
      'A hand-painted green border breaks up the corporate blue, and one big sprinkled donut does all the talking.',
    ],
    ratio: 0.800, // width ÷ height of the cover image
    images: [
      { src: 'images/web/donut-drop-1.jpg', alt: 'Blue Donut Drop poster with the KPMG and Netsoc logos, a hand holding a pink sprinkled donut, 12pm outside the Computer Science building.' },
    ],
  },

  /* ---------- Personal work: gouache on paper ---------- */
  {
    slug: 'gouache-cats',
    section: 'personal',
    medium: 'Gouache',
    title: 'Cats on the Wall',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'Five cats, one wall, one warm afternoon.',
    description: [
      'A row of cats on a sun-warmed stone wall: two black cats, one big and one small, keep watch over three fluffy white ones, under the shade of a leafy branch.',
      'The dusty pink wall and the patchwork stones are painted in flat, chalky layers, the way gouache likes to sit.',
    ],
    ratio: 1.653, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-cats.jpg', alt: 'Gouache painting of two black cats and three white cats sitting on a stone wall in front of a pink wall, with green leaves above.' },
    ],
  },
  {
    slug: 'gouache-cable-car',
    section: 'personal',
    medium: 'Gouache',
    title: 'Cable Car',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'A cabin swinging past rock spires at dusk.',
    description: [
      'A green cable car hangs from its wire over a ridge of tall, finger-like rock spires. The sky turns from deep blue to lilac behind them.',
      'Each spire is built from stacked bands of terracotta, blue and violet, like layers of sediment.',
    ],
    ratio: 1.614, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-cable-car.jpg', alt: 'Gouache painting of a green cable car on a wire passing tall terracotta rock spires under a blue and lilac sky.' },
    ],
  },
  {
    slug: 'gouache-cove',
    section: 'personal',
    medium: 'Gouache',
    title: 'Golden Cove',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'Blue rocks, gold cliffs, the sea turning white.',
    description: [
      'A hidden cove at golden hour: cobalt rocks in the foreground, a palm leaning in from the left and tall ochre cliffs glowing at the back.',
      'The foam where the sea meets the sand is left almost bare, so the white of the paper does the work.',
    ],
    ratio: 1.620, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-cove.jpg', alt: 'Gouache painting of a cove with deep blue rocks in front, white sea foam and tall golden cliffs under a pale sky.' },
    ],
  },
  {
    slug: 'gouache-flying-pig',
    section: 'personal',
    medium: 'Gouache',
    title: 'When Pigs Fly',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'A winged pig drifting through a canyon sky.',
    description: [
      'A round, slightly bewildered pig with wide wings floats between the walls of a canyon, the sky behind it full of choppy white clouds.',
      'The canyon is painted in warm umbers and oranges so the blue sky really pops.',
    ],
    ratio: 1.610, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-flying-pig.jpg', alt: 'Gouache painting of a pink winged pig flying through a canyon of brown and orange rock under a blue sky with white clouds.' },
    ],
  },
  {
    slug: 'gouache-shopfront',
    section: 'personal',
    medium: 'Gouache',
    title: 'Shopfront at Dusk',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'A little shop glowing as the street goes blue.',
    description: [
      'A small shop lit from inside at dusk, its warm yellow windows framed by dark beams, with blue buildings closing in on either side.',
      'The painting is mostly about light: the glow inside against the cool blue of the street.',
    ],
    ratio: 1.635, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-shopfront.jpg', alt: 'Gouache painting of a lit shopfront at dusk with warm yellow windows and dark wooden beams, between deep blue buildings.' },
    ],
  },
  {
    slug: 'gouache-lemons',
    section: 'personal',
    medium: 'Gouache',
    title: 'Lemons & Pepper',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'A still life with bold outlines and little stars.',
    description: [
      'Two lemons on a leafy branch and a striped orange pepper, outlined in cobalt and set against a splash of blue with tiny stars scattered around.',
      'It’s a still life that refuses to sit still.',
    ],
    ratio: 1.582, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-lemons.jpg', alt: 'Gouache still life of two lemons on a leafy branch and an orange pepper, outlined in blue, with yellow stars around them.' },
    ],
  },
  {
    slug: 'gouache-fox',
    section: 'personal',
    medium: 'Gouache',
    title: 'Siesta',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'A fox curled up for a nap in a riot of colour.',
    description: [
      'A fox dozing with its eyes shut, painted in patches of orange, violet, teal and cream against a lemon-yellow background.',
      'Shadows are violet instead of grey, so the whole thing stays warm and sleepy.',
    ],
    ratio: 1.589, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-fox.jpg', alt: 'Gouache painting of a sleeping fox in orange, purple and cream patches against a bright yellow background.' },
    ],
  },
  {
    slug: 'gouache-portrait',
    section: 'personal',
    medium: 'Gouache',
    title: 'Portrait in Green',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'A loose, expressive portrait study.',
    description: [
      'A portrait study of a man with tired eyes and a heavy brow, painted quickly in mauves, pinks and greys on an olive-green ground.',
      'The brushstrokes are left visible on purpose: it’s about getting the expression, not polishing it.',
    ],
    ratio: 0.627, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-portrait.jpg', alt: 'Gouache portrait of a man with dark hair and tired eyes, painted in mauve and pink tones on an olive green background.' },
    ],
  },
  {
    slug: 'gouache-teacup',
    section: 'personal',
    medium: 'Gouache',
    title: 'Té con flores',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'A teacup full of floating blossoms.',
    description: [
      'A porcelain teacup seen from above, filled with tea and floating white and blue blossoms. The china is painted with little blue flowers to match.',
      'The cool greys of the table and the shadows let the warm tea glow.',
    ],
    ratio: 0.616, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-teacup.jpg', alt: 'Gouache painting of a floral porcelain teacup seen from above, filled with tea and floating white and blue flowers.' },
    ],
  },
  {
    slug: 'gouache-shoreline',
    section: 'personal',
    medium: 'Gouache',
    title: 'Shoreline',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'The sea meeting the sand, seen from above.',
    description: [
      'A bird’s-eye view of a beach: turquoise water with curling white wave marks, pebbles and seaweed, and a strip of warm sand scattered with violet stones.',
      'A small study in pattern and rhythm.',
    ],
    ratio: 1.627, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-shoreline.jpg', alt: 'Gouache painting of a shoreline from above, with turquoise water, white waves, green seaweed and pebbles on golden sand.' },
    ],
  },
  {
    slug: 'gouache-overhead-kick',
    section: 'personal',
    medium: 'Gouache',
    title: 'Overhead Kick',
    client: 'Personal',
    year: '',
    disciplines: ['Gouache on paper'],
    summary: 'A footballer mid-air, upside down.',
    description: [
      'A footballer caught mid overhead kick, body inverted, boot connecting with the ball, against a block of green with loose gold and red pencil lines whipping around him.',
      'Next to it, a quicker sketch, because sketchbook pages never stay neat.',
    ],
    ratio: 1.635, // width ÷ height of the cover image
    images: [
      { src: 'images/web/gouache-overhead-kick.jpg', alt: 'Gouache painting of a footballer in a striped kit doing an overhead kick against a green background, with a loose sketch beside it.' },
    ],
  },

  /* ---------- Personal work: digital ---------- */
  {
    slug: 'jinx',
    medium: 'Digital',
    cover: { pos: '48% 30%' },
    section: 'personal',
    title: 'Jinx',
    client: 'Personal · fan art',
    year: '',
    disciplines: ['Digital painting'],
    summary: 'A portrait of Jinx from Arcane, surrounded by her own graffiti.',
    description: [
      'A digital painting of Jinx from the series Arcane. I painted her in a quiet, haunted moment and let the chaos happen around her instead: neon scribbles, monkey faces, “BOOM” and “HAHA” scrawled across the wall like she drew them herself.',
    ],
    ratio: 2.391, // width ÷ height of the cover image
    images: [
      { src: 'images/web/jinx-1.jpg', alt: 'Digital painting of Jinx from Arcane with long blue hair, set against a maroon wall covered in pink, green and blue graffiti doodles.' },
    ],
  },
  {
    slug: 'red-swimsuit',
    medium: 'Digital',
    cover: { pos: '62% 30%' },
    section: 'personal',
    title: 'Red Swimsuit',
    client: 'Personal',
    year: '',
    disciplines: ['Digital painting'],
    summary: 'Summer by the sea, in flat shapes and loose brushwork.',
    description: [
      'A woman in a red swimsuit and gold sunglasses shields her eyes against the sun. The figure is painted in crisp, flat planes of colour, while the cliffs and trees behind her dissolve into loose, dappled brushstrokes.',
    ],
    ratio: 1.415, // width ÷ height of the cover image
    images: [
      { src: 'images/web/red-swimsuit-1.jpg', alt: 'Digital painting of a woman in a red swimsuit and gold sunglasses shading her eyes, in front of turquoise water and a tree-covered cliff.' },
    ],
  },
  {
    slug: 'spider',
    medium: 'Digital',
    section: 'personal',
    title: 'Hanging by a Thread',
    client: 'Personal',
    year: '',
    disciplines: ['Digital illustration'],
    summary: 'A profile in red, and a spider on a single thread.',
    description: [
      'A portrait in profile against a saturated red background, outlined in electric blue. A single thread of silk runs from her lips to a black spider hanging below.',
    ],
    ratio: 0.707, // width ÷ height of the cover image
    images: [
      { src: 'images/web/spider-1.jpg', alt: 'Illustration of a woman in profile with a black fringe, outlined in blue on a red background, with a spider hanging from a thread at her lips.' },
    ],
  },
  {
    slug: 'tomato-toast',
    medium: 'Digital',
    section: 'personal',
    title: 'Tomato Toast',
    client: 'Personal',
    year: '',
    disciplines: ['Digital painting', 'Still life'],
    summary: 'An heirloom tomato on toast, painted up close.',
    description: [
      'A still life of a thick slice of heirloom tomato on toast. Seen this close up, the tomato’s flesh turns into a burst of reds, oranges and yellows, set off by a pale green background.',
    ],
    ratio: 0.707, // width ÷ height of the cover image
    images: [
      { src: 'images/web/tomato-toast-1.jpg', alt: 'Painting of a large slice of red and orange heirloom tomato on a slice of toast with cream cheese, on a light green background.' },
    ],
  },
  {
    slug: 'cuenca',
    medium: 'Digital',
    cover: { pos: '78% 50%' },
    section: 'personal',
    title: 'Casas Colgadas, Cuenca',
    client: 'Personal',
    year: '',
    disciplines: ['Digital painting'],
    summary: 'The hanging houses of Cuenca under a stormy sky.',
    description: [
      'The famous hanging houses of Cuenca, perched on the edge of the cliff, painted in black and white. A heavy, rolling sky fills most of the frame, so the houses feel even more precarious.',
    ],
    ratio: 2.391, // width ÷ height of the cover image
    images: [
      { src: 'images/web/cuenca-1.jpg', alt: 'Black and white digital painting of the hanging houses of Cuenca on a clifftop beneath dramatic storm clouds.' },
    ],
  },
];

/* ---------------------------------------------------------------------
   PAINTINGS — add an image file and it replaces the blank canvas.
   --------------------------------------------------------------------- */
const PAINTINGS = [
  {
    src: 'images/web/painting-guinness.jpg', title: 'A Pint at Last', medium: 'Acrylic on canvas', size: '', year: '',
    alt: 'Acrylic painting of a woman with long dark hair drinking a pint of Guinness, against a bright orange background with smiling blue stars and green spirals.',
    note: 'A very Irish moment, painted very loudly: an orange ground, smiling blue stars and spirals all over the place.',
  },
  {
    src: 'images/web/painting-bus.jpg', title: 'Night Bus', medium: 'Acrylic on canvas', size: '', year: '',
    alt: 'Small square acrylic painting of a green and yellow TFI bus at night, with lit windows and a yellow bollard in front.',
    note: 'A green and yellow TFI bus pulling in at night, on a small square canvas.',
  },
  {
    src: 'images/web/painting-cookie.jpg', title: 'Milk & Cookie', medium: 'Acrylic on canvas', size: '', year: '',
    alt: 'Acrylic painting of a chocolate chip cookie broken into a kaleidoscope of colours, with a splash of milk against a deep blue background.',
    note: 'A chocolate chip cookie broken into a kaleidoscope of colour, with a splash of milk.',
  },
];

/* ---------------------------------------------------------------------
   FAVOURITES — the cabinet on the About page.
   --------------------------------------------------------------------- */
const FAVOURITES = [
  {
    label: 'Favourite place',
    name: 'Sancti Petri, Cádiz',
    img: 'images/favourites/sancti-petri.jpg',
    story: 'I’m from Madrid, but every summer growing up was spent here, and it’s still where I find the most peace. The castle on its little island at sunset is my reset button.',
  },
  {
    label: 'Favourite book',
    name: 'The Seven Husbands of Evelyn Hugo',
    img: 'images/favourites/evelyn-hugo.jpg',
    story: 'I actually met Taylor Jenkins Reid, and she signed my copy. It lives on my shelf like a trophy.',
  },
  {
    label: 'Favourite music',
    name: 'folklore, Taylor Swift',
    img: 'images/favourites/folklore.jpg',
    story: 'My favourite album of all time, because I love depressing music. It’s on repeat whenever I’m painting.',
  },
  {
    label: 'Tool I love',
    name: 'Flat Winsor & Newton brush',
    img: 'images/favourites/brush.jpg',
    story: 'The first professional brush I ever bought. It couldn’t be more perfect: I use it on everything I paint.',
  },
  {
    label: 'Something meaningful',
    name: 'My Claddagh ring',
    img: 'images/favourites/claddagh.jpg',
    story: 'Ever since I was 12 I knew I wanted to live in Ireland, and I did it. Now I own a Claddagh ring that I never take off.',
  },
  {
    label: 'Favourite drink',
    name: 'Iced matcha with oat milk',
    img: 'images/favourites/matcha.jpg',
    story: 'One a day, and it instantly makes me 100× happier. I keep a list of every matcha I’ve tried since 2019.',
  },
  {
    label: 'Sketchbook',
    name: 'A blank canvas',
    img: 'images/favourites/canvas.jpg',
    story: 'My sketchbook is a canvas these days. Lately I’ve been working only in acrylics.',
  },
];

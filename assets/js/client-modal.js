/**
 * DREAM PEAK - CLIENT MODAL POPUP COMPONENT
 * Interactive client details modal displaying brand logo, project photography,
 * store counts, scope of work, and execution highlights.
 */

(function () {
  'use strict';

  // Comprehensive client portfolio database
  const CLIENTS_DATABASE = {
    levis: {
      name: "Levi's",
      logo: "assets/images/clients/logos/levis.png",
      badge: "6+ Stores",
      sector: "Global Retail & Denim Lifestyle Flagships",
      projectImage: "assets/images/clients/levis.jpg",
      imageCaption: "Levi's Prime Mall Flagship Turnkey Store Fit-out",
      coverage: "Mumbai, Bengaluru, Delhi NCR, Pune, Ahmedabad & Tier-1 Hubs Nationwide",
      description: "Levi Strauss & Co. is the global authority in denim and casual lifestyle apparel. Dream Peak has served as a primary nationwide retail execution and turnkey partner for Levi's across India, successfully manufacturing custom store fixtures and delivering complete interior fit-outs for 6+ flagship, mall, and high-street locations.",
      scope: [
        "Turnkey Retail Fit-Out",
        "Bespoke Denim Wall Fixtures",
        "Factory-Manufactured Millwork",
        "MEP & Specialized Lighting",
        "High-Street Civil Handover"
      ],
      highlights: [
        "Executed 6+ company-owned and franchisee outlets across India under strict brand guidelines.",
        "Precision-engineered heavy-duty steel fixture systems and custom laser-cut branding elements.",
        "Calibrated 3000K accent spotlighting designed to showcase authentic denim indigo washes.",
        "Completed fast-track turnarounds adhering to prime mall night-shift fit-out protocols."
      ]
    },

    ashika: {
      name: "Ashika Fashion Wear",
      logo: "assets/images/clients/logos/ashika.jpg",
      badge: "55+ Stores",
      sector: "Ethnic Designer Apparel & Saree Showrooms",
      projectImage: "assets/images/clients/ashika.jpg",
      imageCaption: "Ashika Luxury Bridal & Saree Showroom Architecture",
      coverage: "Surat, Mumbai, Ahmedabad, Rajkot & Western India Textile Hubs",
      description: "Ashika Fashion Wear is one of Western India's premier ethnic designer labels specializing in luxury sarees and bridal couture. Dream Peak has designed and executed over 55 grand showrooms and wholesale trading centers, blending traditional Indian luxury with modern ergonomic retail layouts.",
      scope: [
        "Architectural Space Planning",
        "Bespoke Hardwood Millwork",
        "Velvet Presentation Counters",
        "High-CRI Textile Lighting",
        "Turnkey Project Management"
      ],
      highlights: [
        "Over 55+ multi-level showrooms and wholesale centers executed across Gujarat and Maharashtra.",
        "Bespoke velvet-lined saree unrolling tables with concealed under-counter inventory storage.",
        "High-CRI (95+) true-color ceiling canopy illumination tailored for rich silk and zari fabrics.",
        "All custom cabinetry and display vitrines precision-crafted at Dream Peak's Vasai workshop."
      ]
    },

    vip: {
      name: "VIP Lounge",
      logo: "assets/images/clients/logos/vip.png",
      badge: "50+ Stores",
      sector: "Travel Gear, Luggage & Accessories Retail Chain",
      projectImage: "assets/images/clients/vip.jpg",
      imageCaption: "VIP Lounge Multi-brand Concept Store with Slatwall Systems",
      coverage: "Pan-India Presence covering 20+ Major Metropolitan Cities",
      description: "VIP Industries is India's iconic luggage and travel lifestyle company. Dream Peak has delivered over 50 exclusive VIP Lounge concept stores housing top-tier product lines including VIP, Carlton, Skybags, and Caprese within modern, high-density retail environments.",
      scope: [
        "Concept Store Execution",
        "Modular Slatwall Fixtures",
        "Engineered Luggage Test Ramps",
        "Turnkey MEP & HVAC",
        "Brand Zoning & Signage"
      ],
      highlights: [
        "Delivered 50+ airport and prime shopping mall outlets with standardized brand guidelines.",
        "Engineered multi-surface test ramps enabling customers to test luggage wheels on varied textures.",
        "Durable natural pinewood slat walls paired with quick-reconfigurable powder-coated shelving.",
        "Distinct brand-zoned retail environments for VIP, Carlton, and Caprese accessories."
      ]
    },

    metropolis: {
      name: "Metropolis Healthcare",
      logo: "assets/images/clients/logos/metropolis.jpg",
      badge: "20+ Labs",
      sector: "Clinical Pathology & Diagnostic Healthcare Centers",
      projectImage: "assets/images/clients/metropolis.jpg",
      imageCaption: "Metropolis Precision Pathology Laboratory & Cleanroom",
      coverage: "Mumbai, Navi Mumbai, Thane, Pune, Nashik & Regional Clusters",
      description: "Metropolis Healthcare is an internationally recognized leader in clinical pathology and diagnostics. Dream Peak designed and built over 20 state-of-the-art diagnostic facilities and patient care centers adhering to stringent sterility, airflow, and chemical resistance requirements.",
      scope: [
        "Clinical Space Planning",
        "Sterile Cleanroom Fit-Out",
        "Anti-Bacterial Vinyl Flooring",
        "Specialized Laboratory MEP",
        "Phlebotomy Suites & Reception"
      ],
      highlights: [
        "Executed 20+ NABL/CAP-standard diagnostic laboratories and patient collection centers.",
        "Seamless antimicrobial vinyl flooring with coved skirting for clinical sterile maintenance.",
        "Medical-grade chemical-resistant solid acrylic countertops with integrated plumbing.",
        "Acoustically isolated private phlebotomy suites providing patient comfort and privacy."
      ]
    },

    catwalk: {
      name: "Catwalk",
      logo: "assets/images/clients/logos/catwalk.png",
      badge: "6+ Stores",
      sector: "Luxury Women's Footwear & Fashion Accessories",
      projectImage: "assets/images/clients/catwalk.jpg",
      imageCaption: "Catwalk Chic Footwear Boutique with Floating Lit Displays",
      coverage: "Mumbai, Pune & Bengaluru Premier Fashion Malls",
      description: "Catwalk Worldwide is synonymous with high-glamour women's footwear and luxury handbags. Dream Peak created sophisticated boutique environments featuring floating acrylic-lit footwear shelves, mirrored accent walls, and custom plush seating for an indulgent trial experience.",
      scope: [
        "Luxury Boutique Architecture",
        "Floating Edge-Lit Shelving",
        "Custom Upholstered Seating",
        "Mirrored Architectural Partitions",
        "Turnkey Interior Execution"
      ],
      highlights: [
        "6+ high-traffic boutique rollouts in premier shopping malls like Phoenix Marketcity.",
        "Custom concealed-wire edge-lit acrylic shelving illuminating each footwear model individually.",
        "Plush velvet-upholstered circular trial ottomans custom-manufactured in our workshop.",
        "Minimalist frameless glass storefront portals with backlit stainless-steel brand logos."
      ]
    },

    gangar: {
      name: "Gangar Eyenation",
      logo: "assets/images/clients/logos/gangar.jpg",
      badge: "5+ Stores",
      sector: "Luxury Eyewear & Optometry Flagships",
      projectImage: "assets/images/clients/gangar.jpg",
      imageCaption: "Gangar Eyenation High-End Optical Showroom & Clinic",
      coverage: "Mumbai & Maharashtra Prime Retail Locations",
      description: "Gangar Eyenation is a benchmark in premium optical retail and clinical eye examination. Dream Peak delivered 5+ luxury optical boutiques featuring UV-filtered LED glass vitrines, darkroom refraction clinical suites, and dedicated brand bars for Ray-Ban, Oakley, and Gucci.",
      scope: [
        "Optometry Showroom Planning",
        "Lockable Glass Display Vitrines",
        "Specialized 4000K Color Optics",
        "Clinical Darkroom Acoustic Build",
        "Lacquered Joinery & Millwork"
      ],
      highlights: [
        "5+ flagship optical boutiques in prestigious high-street and commercial locations.",
        "Museum-grade anti-reflective glass showcases with integrated biometric and electronic locks.",
        "Dedicated acoustic optometry examination rooms equipped for advanced diagnostic instruments.",
        "High-gloss polyurethane lacquered cabinetry combined with warm Italian wood veneer accents."
      ]
    },

    ddecor: {
      name: "D'Decor",
      logo: "assets/images/clients/logos/ddecor.png",
      badge: "3+ Stores",
      sector: "Premier Home Fabrics, Furnishings & Curtains",
      projectImage: "assets/images/clients/ddecor.jpg",
      imageCaption: "D'Decor Experiential Home Furnishings Flagship Showroom",
      coverage: "Mumbai Prime High-Street & Design Districts",
      description: "D'Decor is the world's largest producer of soft furnishings and woven upholstery. Dream Peak executed grand experiential retail flagships where homeowners and interior designers interact with thousands of fabric textures in real-life room settings and motorized curtain mockups.",
      scope: [
        "Flagship Showroom Architecture",
        "Fabric Waterfall Display Racks",
        "Motorized Curtain Track Fixtures",
        "VIP Design Consultation Lounges",
        "Turnkey MEP & Ambiance Lighting"
      ],
      highlights: [
        "3+ sprawling experiential home furnishing flagships exceeding 5,000 sq.ft. each.",
        "Custom ceiling-recessed motorized curtain display systems with silent motorized tracks.",
        "Private VIP client consultation pods equipped with digital fabric visualizer terminals.",
        "Calibrated architectural mood lighting ensuring exact daylight color fidelity for fabrics."
      ]
    },

    sukhothai: {
      name: "Sukho Thai",
      logo: "assets/images/clients/logos/sukhothai.png",
      badge: "3+ Stores",
      sector: "Luxury Traditional Thai Spa & Wellness Sanctuaries",
      projectImage: "assets/images/clients/sukhothai.jpg",
      imageCaption: "Sukho Thai Serene Foot Reflexology Sanctuary",
      coverage: "Mumbai Luxury Malls & Lifestyle Hubs (Palladium, Bandra, Juhu)",
      description: "Sukho Thai is India's pioneer in authentic traditional Thai foot reflexology and therapeutic relaxation. Dream Peak transformed busy commercial spaces into serene sanctuaries of tranquility using multi-layer acoustic dampening, natural teakwood joinery, and ambient indirect lighting.",
      scope: [
        "Themed Wellness Architecture",
        "Multi-Layer Acoustic Soundproofing",
        "Moisture-Resistant Teak Joinery",
        "Concealed Indirect Mood Lighting",
        "Reflexology Suites & Footwash Zones"
      ],
      highlights: [
        "3+ premier wellness retreats built in luxury retail centers like High Street Phoenix Palladium.",
        "Engineered acoustic isolation walls ensuring near-zero ambient noise in therapy zones.",
        "Authentic Thai architectural motifs with warm timber battens and natural stone cladding.",
        "Custom-upholstered oversized reflexology recliners and waterproof copper foot basins."
      ]
    },

    zouk: {
      name: "Zouk",
      logo: "assets/images/clients/logos/zouk.jpg",
      badge: "Handcrafted",
      sector: "Modern Indian Lifestyle, Vegan Bags & Footwear",
      projectImage: "assets/images/clients/zouk.jpg",
      imageCaption: "Zouk Omnichannel Modern Indian Retail Flagship",
      coverage: "Mumbai & Bengaluru Prime Shopping Centers",
      description: "Zouk is an acclaimed D2C lifestyle brand that blends Indian heritage prints with modern functional designs. Dream Peak executed Zouk's physical flagship stores, translating their 100% vegan, handcrafted philosophy into warm retail spaces using birchwood pegboards and earthy tones.",
      scope: [
        "Brand Retail Concept Realization",
        "Modular Birchwood Pegboard Walls",
        "Earthy Textured Wall Finishes",
        "Custom Retail Merchandising Pods",
        "Turnkey Fast-Track Build"
      ],
      highlights: [
        "Successful physical retail flagship execution bridging digital brand identity into real spaces.",
        "Modular natural birchwood pegboard walls accommodating seasonal handbag and footwear drops.",
        "Terracotta and warm earth tones celebrating Indian craftsmanship with a fresh modern aesthetic.",
        "Turnkey project executed and handed over in an accelerated 21-day timeline."
      ]
    },

    carlton: {
      name: "Carlton",
      logo: "assets/images/clients/logos/carlton.png",
      badge: "Premium",
      sector: "British Heritage Travel Gear & Business Luggage",
      projectImage: "assets/images/clients/carlton.jpg",
      imageCaption: "Carlton Executive Luggage & Travel Gear Boutique",
      coverage: "Major International Airports & Metro Flagship Malls",
      description: "Established in London in 1976, Carlton embodies British engineering excellence in lightweight, durable luggage and business travel gear. Dream Peak created sleek, contemporary retail formats highlighting Carlton's cutting-edge travel technology for modern executives.",
      scope: [
        "Retail Space Optimization",
        "Matte-Black Metal Display Fixtures",
        "Brushed Aluminum Architectural Trims",
        "High-Lumen Showcase Pedestals",
        "Turnkey Fit-out Execution"
      ],
      highlights: [
        "Executive retail spaces built to rigorous international airport retail specifications.",
        "Precision-welded matte-black powder-coated steel display islands and wall fixtures.",
        "Backlit product risers designed to showcase ultra-light polycarbonate luggage durability.",
        "Streamlined corporate branding integration with brushed aluminum accents and crisp signage."
      ]
    },

    jashn: {
      name: "Jashn",
      logo: "assets/images/clients/logos/jashn.png",
      badge: "Ethnic",
      sector: "Luxury Ethnic Wear & Bridal Couture Showrooms",
      projectImage: "assets/images/clients/jashn.jpg",
      imageCaption: "Jashn Palatial Bridal & Festive Couture Showroom",
      coverage: "Mumbai, Pune, Ahmedabad & Hyderabad Couture Hubs",
      description: "Jashn is a celebrated Indian bridal and ethnic fashion house. Dream Peak built expansive, palatial retail environments featuring classical arches, ornate chandelier illumination, and private bridal dressing suites designed for a memorable wedding shopping journey.",
      scope: [
        "Palatial Retail Architecture",
        "Classical Archways & Mouldings",
        "VIP Bridal Trial Suites",
        "Ornate Chandelier Lighting",
        "Turnkey Civil & Joinery Works"
      ],
      highlights: [
        "Grand multi-level bridal destinations capturing the splendor of Indian festive couture.",
        "VIP bridal trial suites with 360-degree bevelled mirrors and plush velvet lounge seating.",
        "Custom-crafted decorative gypsum coffered ceilings with integrated crystal chandeliers.",
        "Full turnkey civil, flooring, HVAC, and custom joinery from Dream Peak's dedicated team."
      ]
    },

    almostgods: {
      name: "Almost Gods",
      logo: "assets/images/clients/logos/almostgods.png",
      badge: "Artisanal",
      sector: "Brutalist Architectural Concept Fashion Boutiques",
      projectImage: "assets/images/clients/almostgods.jpg",
      imageCaption: "Almost Gods Monolithic Brutalist Architectural Space",
      coverage: "New Delhi & Mumbai Fashion & Art Districts",
      description: "Almost Gods is an internationally celebrated Indian streetwear and high-fashion label known for sculptural, artistic silhouettes. Dream Peak brought the brand's bold vision to reality with a raw brutalist interior featuring hand-troweled micro-concrete, sculptural raw steel, and monolithic display plinths.",
      scope: [
        "Avant-Garde Architectural Fit-out",
        "Hand-Troweled Micro-Concrete",
        "Sculptural Industrial Steel Rails",
        "Monolithic Stone Display Plinths",
        "Museum-Grade Directional Lighting"
      ],
      highlights: [
        "Visionary brutalist retail interior featured across leading architectural and fashion media.",
        "Seamless micro-cement wall and floor finishes executed with artisanal hand-troweled texture.",
        "Raw industrial steel hanging systems fabricated specifically to carry heavy artistic garments.",
        "Museum-grade focused narrow-beam track lighting casting dramatic sculptural shadows."
      ]
    },

    gili: {
      name: "Gili World",
      logo: "assets/images/clients/logos/gili.jpg",
      badge: "Jewellery",
      sector: "Diamond Jewellery & Luxury Retail Boutiques",
      projectImage: "assets/images/clients/gili.jpg",
      imageCaption: "Gili World High-Security Diamond Jewellery Boutique",
      coverage: "Mumbai & Pan-India Luxury Retail Destinations",
      description: "Gili was India's pioneering branded diamond jewellery label. Dream Peak designed and fitted high-security jewellery boutiques featuring tamper-evident glass showcases, secure transaction zones, and specialized 6500K diamond sparkler lighting.",
      scope: [
        "High-Security Jewellery Vitrines",
        "Burglar-Proof Architectural Joinery",
        "6500K True-Sparkle Illumination",
        "Secure Transaction Desks",
        "Turnkey Boutique Execution"
      ],
      highlights: [
        "High-security diamond display vitrines with electronic locking and concealed hinges.",
        "Reinforced cash counters and strongroom doors engineered to insurance compliance standards.",
        "Luxury boutique aesthetics with velvet-lined displays and gold-leaf architectural trims.",
        "Complete turnkey interior handover with integrated CCTV and alarm infrastructure."
      ]
    },

    w: {
      name: "W Women's Wear",
      logo: "assets/images/clients/logos/w.jpg",
      badge: "Fashion",
      sector: "Contemporary Indian Women's Fashion & Apparel",
      projectImage: "assets/images/gallery/retail-againvintage.jpg",
      imageCaption: "W Contemporary Women's Fashion Retail Store",
      coverage: "Mumbai & Tier-1 Metro Fashion Malls",
      description: "W pioneered contemporary silhouettes in Indian women's fashion. Dream Peak delivered turnkey retail store rollouts characterized by clean geometric lines, vibrant brand color accents, and efficient high-density merchandising walls.",
      scope: [
        "Contemporary Retail Space Planning",
        "Modular Apparel Wall Fixtures",
        "Fitting Room Architectural Suites",
        "Illuminated Brand Portal Signage",
        "Turnkey Execution"
      ],
      highlights: [
        "Multi-tier apparel wall display systems maximizing floor inventory density elegantly.",
        "Backlit architectural storefront entrance portals with durable acrylic brand signages.",
        "Ergonomically designed fitting rooms with flattering warm-white perimeter mirror lighting.",
        "Consistent brand guidelines executed on fast-track timelines across multiple cities."
      ]
    },

    ivy: {
      name: "IVY Wine Cafe & Bistro",
      logo: "assets/images/clients/logos/ivy.svg",
      badge: "Hospitality",
      sector: "Fine Dining Hospitality, Wine Bars & Cafes",
      projectImage: "assets/images/gallery/corporate-boardroom.jpg",
      imageCaption: "IVY Wine Cafe & Bistro Handcrafted Dining Interior",
      coverage: "Mumbai Premium Culinary & Lifestyle Districts",
      description: "IVY Wine Cafe & Bistro blends casual European bistro culture with fine dining sophistication. Dream Peak executed warm, intimate interiors featuring solid oak tables, a bespoke wine display wall, and atmospheric ambient lighting.",
      scope: [
        "Hospitality Interior Architecture",
        "Custom Bar Counter Millwork",
        "Climate-Controlled Wine Storage",
        "Acoustic Ceiling Treatments",
        "Turnkey Commercial MEP"
      ],
      highlights: [
        "Custom temperature-controlled wine display cellar joinery with glass facade.",
        "Handcrafted solid wood dining furniture and heavy granite bar counter built in-house.",
        "Acoustically balanced dining zones reducing ambient chatter for comfortable conversations.",
        "Commercial kitchen coordination and fire-rated HVAC exhaust ducting installations."
      ]
    },

    birdys: {
      name: "Birdy's Bakery",
      logo: "assets/images/clients/logos/birdys.svg",
      badge: "Patisserie",
      sector: "Artisan Patisserie, Gourmet Bakery & Cafe Outlets",
      projectImage: "assets/images/gallery/corporate-office-passage.jpg",
      imageCaption: "Birdy's Gourmet Patisserie & Cafe Store",
      coverage: "Mumbai Metropolitan Retail Outlets",
      description: "Birdy's is one of Mumbai's most iconic bakery and confectionery brands. Dream Peak delivered turnkey quick-service and dine-in bakery outlets featuring curved glass refrigerated pastry cases and food-grade hygienic surfaces.",
      scope: [
        "Refrigerated Counter Joinery",
        "Food-Grade Stainless & Solid Surface",
        "Quick-Service Counter Architecture",
        "Hygienic Wall Tiling & MEP",
        "Citywide Store Rollout"
      ],
      highlights: [
        "Precision refrigerated pastry and confectionery vitrines with anti-condensation heated glass.",
        "Hygienic solid surface countertops and tiled service bays meeting food safety standards.",
        "Durable, easy-to-clean floor finishes suited for high foot-traffic bakery environments.",
        "Turnkey execution ensuring minimal retail closure and rapid opening turnover."
      ]
    },

    kkcl: {
      name: "KKCL (Killer & Lawman)",
      logo: "assets/images/clients/logos/kkcl.svg",
      badge: "Corporate / Retail",
      sector: "Kewal Kiran Clothing Ltd - Killer Jeans & Lawman",
      projectImage: "assets/images/gallery/retail-levis-2.jpg",
      imageCaption: "KKCL Youth-Oriented Industrial Denim Concept Store",
      coverage: "Corporate HQ & Retail Outlets Across Western India",
      description: "Kewal Kiran Clothing Ltd (KKCL) is one of India's largest apparel conglomerates. Dream Peak partnered with KKCL for both executive corporate headquarters and energetic retail store formats for Killer Jeans and Lawman Pg3.",
      scope: [
        "Corporate Headquarters Fit-Out",
        "Multi-Brand Retail Showrooms",
        "Custom Metal & Wood Racks",
        "Acoustic Meeting Facilities",
        "Turnkey Execution"
      ],
      highlights: [
        "Youth-focused industrial denim retail fixtures with exposed brick and distressed metal finishes.",
        "Executive conference boardrooms and open-plan corporate workstations at KKCL headquarters.",
        "Turnkey design-to-build deployment handling civil, interior, furniture, and electrical systems.",
        "Long-standing multi-year execution partnership supporting national brand expansion."
      ]
    },

    hakoba: {
      name: "Hakoba",
      logo: "assets/images/clients/logos/hakoba.svg",
      badge: "Textiles",
      sector: "Embroidered Cotton, Fabrics & Lifestyle Showrooms",
      projectImage: "assets/images/gallery/retail-jashn.jpg",
      imageCaption: "Hakoba Embroidered Cotton Fabrics Flagship Showroom",
      coverage: "Mumbai & Western India Retail Centers",
      description: "Hakoba is celebrated across generations for exquisite eyelet embroidered fabrics. Dream Peak built classic, organized showrooms with custom fabric roll bins, customer measurement counters, and bright illumination tailored for textile inspection.",
      scope: [
        "Textile Showroom Architecture",
        "Fabric Roll Storage & Display Bins",
        "Smooth Customer Examination Tables",
        "True-Color Fabric Illumination",
        "Turnkey Interior Execution"
      ],
      highlights: [
        "High-capacity custom wooden fabric display bins accommodating hundreds of fabric bolts.",
        "Comfortable customer examination counters with ultra-smooth scratch-proof laminate finishes.",
        "Bright, evenly distributed lighting eliminating shadows across intricate cotton embroideries.",
        "Turnkey delivery completed on schedule with zero disruption to neighboring commercial tenants."
      ]
    },

    againvintage: {
      name: "Again? Vintage",
      logo: "assets/images/clients/logos/againvintage.png",
      badge: "Streetwear",
      sector: "Urban Vintage, Streetwear & Thrift Boutiques",
      projectImage: "assets/images/clients/againvintage.jpg",
      imageCaption: "Again? Vintage Retro Industrial Concept Boutique",
      coverage: "Mumbai High-Street Fashion Hubs",
      description: "Again? Vintage curates authentic 90s streetwear and collectible vintage clothing. Dream Peak created an underground retro industrial store atmosphere using raw scaffolding pipes, exposed brickwork, and vintage neon signage.",
      scope: [
        "Vintage Industrial Architecture",
        "Repurposed Scaffolding Pipe Racks",
        "Exposed Concrete Flooring",
        "Custom Retro Neon Signage",
        "Fast-Track Turnkey Handover"
      ],
      highlights: [
        "Custom-welded industrial plumbing pipe garment racks with adjustable height configurations.",
        "Exposed concrete flooring with a distressed clear lacquer seal for high urban character.",
        "Custom retro neon lightbox accents and curated industrial fitting rooms.",
        "Completed and handed over within an accelerated 18-day turnaround."
      ]
    },

    fch: {
      name: "FCH",
      logo: "assets/images/clients/logos/fch.svg",
      badge: "Corporate",
      sector: "Financial Services & Corporate Headquarters",
      projectImage: "assets/images/gallery/corporate-boardroom.jpg",
      imageCaption: "FCH Corporate Headquarters Executive Suite & Boardroom",
      coverage: "Mumbai Corporate Financial District (BKC / Nariman Point)",
      description: "Future Capital Holdings (FCH) required modern, high-security corporate financial headquarters. Dream Peak designed and executed executive cabins, state-of-the-art conference boardrooms, and ergonomic workstation floors.",
      scope: [
        "Commercial Office Architecture",
        "Double-Glazed Acoustic Partitions",
        "Executive Boardroom Joinery",
        "Integrated Audiovisual Systems",
        "Turnkey MEP & HVAC Systems"
      ],
      highlights: [
        "Double-glazed acoustic glass partition walls providing strict speech privacy for board meetings.",
        "Custom solid walnut executive boardroom table with concealed power and AV data channels.",
        "Comprehensive turnkey MEP, biometric access control, and central chilled-water HVAC integration.",
        "Delivered with meticulous architectural detailing matching premier corporate banking standards."
      ]
    }
  };

  // DOM Elements
  let modal = null;
  let modalBackdrop = null;
  let closeBtn = null;
  let dismissBtn = null;
  let modalLogo = null;
  let modalName = null;
  let modalBadge = null;
  let modalSector = null;
  let modalProjectImage = null;
  let modalImageCaption = null;
  let modalLocations = null;
  let modalLocationsBox = null;
  let modalDesc = null;
  let modalScopeTags = null;
  let modalHighlightsList = null;
  let lastActiveElement = null;

  function initElements() {
    modal = document.getElementById('client-modal');
    if (!modal) return false;

    modalBackdrop = document.getElementById('modal-backdrop');
    closeBtn = document.getElementById('modal-close-btn');
    dismissBtn = document.getElementById('modal-dismiss-btn');
    modalLogo = document.getElementById('modal-client-logo');
    modalName = document.getElementById('modal-client-name');
    modalBadge = document.getElementById('modal-client-badge');
    modalSector = document.getElementById('modal-client-sector');
    modalProjectImage = document.getElementById('modal-project-image');
    modalImageCaption = document.getElementById('modal-image-caption');
    modalLocations = document.getElementById('modal-locations');
    modalLocationsBox = document.getElementById('modal-locations-box');
    modalDesc = document.getElementById('modal-client-desc');
    modalScopeTags = document.getElementById('modal-scope-tags');
    modalHighlightsList = document.getElementById('modal-highlights-list');

    return true;
  }

  /**
   * Open modal with client data
   * @param {string} clientId
   */
  function openClientModal(clientId) {
    const data = CLIENTS_DATABASE[clientId];
    if (!data || !modal) return;

    lastActiveElement = document.activeElement;

    // Populate header info
    modalLogo.src = data.logo;
    modalLogo.alt = data.name + " Official Logo";
    modalName.textContent = data.name;
    modalBadge.textContent = data.badge;
    modalSector.textContent = data.sector;

    // Populate project image
    modalProjectImage.src = data.projectImage;
    modalProjectImage.alt = (data.imageCaption || data.name) + " - Completed by Dream Peak";
    modalImageCaption.textContent = data.imageCaption || (data.name + " Project Showcase");

    // Populate coverage / locations
    if (data.coverage) {
      modalLocations.textContent = data.coverage;
      modalLocationsBox.style.display = 'block';
    } else {
      modalLocationsBox.style.display = 'none';
    }

    // Populate description
    modalDesc.textContent = data.description;

    // Populate scope tags
    modalScopeTags.innerHTML = '';
    if (data.scope && Array.isArray(data.scope)) {
      data.scope.forEach(function (tagText) {
        const tag = document.createElement('span');
        tag.className = 'modal-scope-tag';
        tag.textContent = tagText;
        modalScopeTags.appendChild(tag);
      });
    }

    // Populate highlights list
    modalHighlightsList.innerHTML = '';
    if (data.highlights && Array.isArray(data.highlights)) {
      data.highlights.forEach(function (highlightText) {
        const li = document.createElement('li');
        li.textContent = highlightText;
        modalHighlightsList.appendChild(li);
      });
    }

    // Show modal with animation
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Set focus to close button
    if (closeBtn) {
      setTimeout(function () {
        closeBtn.focus();
      }, 50);
    }
  }

  /**
   * Close client modal
   */
  function closeClientModal() {
    if (!modal || !modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  /**
   * Initialize event listeners
   */
  function initListeners() {
    // Click on showcase cards
    const showcaseCards = document.querySelectorAll('.client-showcase-card[data-client-id]');
    showcaseCards.forEach(function (card) {
      const clientId = card.getAttribute('data-client-id');
      card.addEventListener('click', function (e) {
        e.preventDefault();
        openClientModal(clientId);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openClientModal(clientId);
        }
      });
    });

    // Click on additional brand partner cards
    const logoCards = document.querySelectorAll('.client-logo-card[data-client-id]');
    logoCards.forEach(function (card) {
      const clientId = card.getAttribute('data-client-id');
      card.addEventListener('click', function (e) {
        e.preventDefault();
        openClientModal(clientId);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openClientModal(clientId);
        }
      });
    });

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeClientModal();
      });
    }

    // Dismiss button click
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function (e) {
        e.preventDefault();
        closeClientModal();
      });
    }

    // Backdrop click
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', function (e) {
        e.preventDefault();
        closeClientModal();
      });
    }

    // Escape key press
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeClientModal();
      }
    });
  }

  // Self-initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (initElements()) {
        initListeners();
      }
    });
  } else {
    if (initElements()) {
      initListeners();
    }
  }
})();

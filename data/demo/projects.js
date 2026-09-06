/**
 * Demo real-estate projects for testing (PRISM / demo hubs).
 * 30 projects: 15 condo+transit, 10 suburban townhomes,
 * 2 luxury inner-city, 3 luxury vacation (Khao Yai / Chiang Mai / Phang Nga).
 */
const DEMO_PROJECTS = [
  {
    "id": "C01",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "The Line Phrom Phong",
    "name_th": "The Line Phrom Phong",
    "description": "คอนโดสูงติด BTS พร้อมพงษ์ สำหรับคนทำงานสุขุมวิท",
    "description_en": "คอนโดสูงติด BTS พร้อมพงษ์ สำหรับคนทำงานสุขุมวิท",
    "zone": "Phrom Phong",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 3200000,
    "price_max": 8900000,
    "currency": "THB",
    "total_units": 420,
    "sold_units": 312,
    "nearest_station": "BTS Phrom Phong",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 180,
    "transit_score": 9,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C02",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Noble Around Sukhumvit 33",
    "name_th": "Noble Around Sukhumvit 33",
    "description": "คอนโดโลว์ไรส์ใกล้ทองหล่อ เดินถึง BTS",
    "description_en": "คอนโดโลว์ไรส์ใกล้ทองหล่อ เดินถึง BTS",
    "zone": "Thonglor",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 4500000,
    "price_max": 12500000,
    "currency": "THB",
    "total_units": 180,
    "sold_units": 141,
    "nearest_station": "BTS Thonglor",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 320,
    "transit_score": 9,
    "options": {
      "pets_allowed": true,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C03",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Ideo Q Chidlom",
    "name_th": "Ideo Q Chidlom",
    "description": "คอนโดใจกลางชิดลม ใกล้ Central Chidlom และ BTS",
    "description_en": "คอนโดใจกลางชิดลม ใกล้ Central Chidlom และ BTS",
    "zone": "Chidlom",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 5500000,
    "price_max": 15800000,
    "currency": "THB",
    "total_units": 350,
    "sold_units": 280,
    "nearest_station": "BTS Chidlom",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 250,
    "transit_score": 10,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C04",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Life Asoke Hype",
    "name_th": "Life Asoke Hype",
    "description": "คอนโดมิกซ์ยูสใกล้ MRT เพชรบุรี / Airport Link",
    "description_en": "คอนโดมิกซ์ยูสใกล้ MRT เพชรบุรี / Airport Link",
    "zone": "Asoke",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 2900000,
    "price_max": 7800000,
    "currency": "THB",
    "total_units": 680,
    "sold_units": 510,
    "nearest_station": "MRT Phetchaburi",
    "station_line": "MRT Blue",
    "station_distance_meters": 400,
    "transit_score": 9,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C05",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Chapter Charoennakhon",
    "name_th": "Chapter Charoennakhon",
    "description": "คอนโดวิวแม่น้ำเจ้าพระยา ใกล้ BTS สะพานตากสิน",
    "description_en": "คอนโดวิวแม่น้ำเจ้าพระยา ใกล้ BTS สะพานตากสิน",
    "zone": "Charoen Nakhon",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 3800000,
    "price_max": 11200000,
    "currency": "THB",
    "total_units": 290,
    "sold_units": 203,
    "nearest_station": "BTS Saphan Taksin",
    "station_line": "BTS Silom",
    "station_distance_meters": 550,
    "transit_score": 8,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C06",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "The Reserve Phahol-Saphanmai",
    "name_th": "The Reserve Phahol-Saphanmai",
    "description": "คอนโดแนวรถไฟฟ้าสายสีเขียว สะพานใหม่",
    "description_en": "คอนโดแนวรถไฟฟ้าสายสีเขียว สะพานใหม่",
    "zone": "Saphan Mai",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 2100000,
    "price_max": 4900000,
    "currency": "THB",
    "total_units": 520,
    "sold_units": 390,
    "nearest_station": "BTS Saphan Mai",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 220,
    "transit_score": 8,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C07",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Rhythm Ekkamai Estate",
    "name_th": "Rhythm Ekkamai Estate",
    "description": "คอนโดเอกมัย ใกล้ BTS เอกมัย",
    "description_en": "คอนโดเอกมัย ใกล้ BTS เอกมัย",
    "zone": "Ekkamai",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 4200000,
    "price_max": 11800000,
    "currency": "THB",
    "total_units": 240,
    "sold_units": 186,
    "nearest_station": "BTS Ekkamai",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 280,
    "transit_score": 9,
    "options": {
      "pets_allowed": true,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C08",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Whizdom Connect Sukhumvit",
    "name_th": "Whizdom Connect Sukhumvit",
    "description": "คอนโดอุดมสุข เชื่อมต่อ BTS",
    "description_en": "คอนโดอุดมสุข เชื่อมต่อ BTS",
    "zone": "Udom Suk",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 2500000,
    "price_max": 6200000,
    "currency": "THB",
    "total_units": 410,
    "sold_units": 287,
    "nearest_station": "BTS Udom Suk",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 350,
    "transit_score": 8,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C09",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "KnightsBridge Prime Onnut",
    "name_th": "KnightsBridge Prime Onnut",
    "description": "คอนโดอ่อนนุช ใกล้ BTS อ่อนนุช",
    "description_en": "คอนโดอ่อนนุช ใกล้ BTS อ่อนนุช",
    "zone": "On Nut",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 2300000,
    "price_max": 5600000,
    "currency": "THB",
    "total_units": 560,
    "sold_units": 420,
    "nearest_station": "BTS On Nut",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 200,
    "transit_score": 8,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C10",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Aspire Sathorn-Taksin",
    "name_th": "Aspire Sathorn-Taksin",
    "description": "คอนโดสาทร–ตากสิน สายสีลม",
    "description_en": "คอนโดสาทร–ตากสิน สายสีลม",
    "zone": "Taksin",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 2700000,
    "price_max": 7100000,
    "currency": "THB",
    "total_units": 380,
    "sold_units": 266,
    "nearest_station": "BTS Wongwian Yai",
    "station_line": "BTS Silom",
    "station_distance_meters": 300,
    "transit_score": 8,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C11",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Elio Del Ray",
    "name_th": "Elio Del Ray",
    "description": "คอนโดลาดพร้าว ใกล้ MRT ลาดพร้าว",
    "description_en": "คอนโดลาดพร้าว ใกล้ MRT ลาดพร้าว",
    "zone": "Ladprao",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 2400000,
    "price_max": 5800000,
    "currency": "THB",
    "total_units": 300,
    "sold_units": 210,
    "nearest_station": "MRT Lat Phrao",
    "station_line": "MRT Blue",
    "station_distance_meters": 450,
    "transit_score": 7,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C12",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "The Base Park East Sukhumvit 77",
    "name_th": "The Base Park East Sukhumvit 77",
    "description": "คอนโดสุขุมวิท 77 ใกล้ Airport Link",
    "description_en": "คอนโดสุขุมวิท 77 ใกล้ Airport Link",
    "zone": "On Nut",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 1900000,
    "price_max": 4500000,
    "currency": "THB",
    "total_units": 720,
    "sold_units": 504,
    "nearest_station": "Airport Link Ban Thap Chang",
    "station_line": "Airport Rail Link",
    "station_distance_meters": 900,
    "transit_score": 6,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C13",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Supalai Loft @ Talat Phlu",
    "name_th": "Supalai Loft @ Talat Phlu",
    "description": "คอนโดตลาดพลู ใกล้ BTS ตลาดพลู",
    "description_en": "คอนโดตลาดพลู ใกล้ BTS ตลาดพลู",
    "zone": "Talat Phlu",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 2200000,
    "price_max": 5200000,
    "currency": "THB",
    "total_units": 340,
    "sold_units": 238,
    "nearest_station": "BTS Talat Phlu",
    "station_line": "BTS Silom",
    "station_distance_meters": 260,
    "transit_score": 8,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C14",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "Park Origin Phrom Phong",
    "name_th": "Park Origin Phrom Phong",
    "description": "คอนโดพรีเมียมพร้อมพงษ์ ติด BTS",
    "description_en": "คอนโดพรีเมียมพร้อมพงษ์ ติด BTS",
    "zone": "Phrom Phong",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 6800000,
    "price_max": 18500000,
    "currency": "THB",
    "total_units": 210,
    "sold_units": 168,
    "nearest_station": "BTS Phrom Phong",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 150,
    "transit_score": 10,
    "options": {
      "pets_allowed": false,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "C15",
    "category": "condo_transit",
    "category_th": "คอนโดติดรถไฟฟ้า",
    "name": "XT Ekkamai",
    "name_th": "XT Ekkamai",
    "description": "คอนโดเอกมัยสไตล์โมเดิร์น ใกล้ BTS",
    "description_en": "คอนโดเอกมัยสไตล์โมเดิร์น ใกล้ BTS",
    "zone": "Ekkamai",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "condo",
    "status": "existing",
    "price_min": 3600000,
    "price_max": 9800000,
    "currency": "THB",
    "total_units": 450,
    "sold_units": 360,
    "nearest_station": "BTS Ekkamai",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 400,
    "transit_score": 9,
    "options": {
      "pets_allowed": true,
      "pool": true,
      "gym": true,
      "parking_pct": 45
    },
    "features": [
      "key_card",
      "cctv_24h",
      "lobby"
    ],
    "tags": [
      "condo",
      "bts_mrt",
      "bangkok"
    ]
  },
  {
    "id": "T01",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Baan Klang Muang Ratchapruek",
    "name_th": "Baan Klang Muang Ratchapruek",
    "description": "ทาวน์โฮม 2 ชั้น ราชพฤกษ์ สำหรับครอบครัว",
    "description_en": "ทาวน์โฮม 2 ชั้น ราชพฤกษ์ สำหรับครอบครัว",
    "zone": "Ratchapruek",
    "province": "Nonthaburi",
    "province_th": "นนทบุรี",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 2800000,
    "price_max": 4200000,
    "currency": "THB",
    "total_units": 180,
    "sold_units": 126,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T02",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Supalai Ville Bangna-Trad Km.10",
    "name_th": "Supalai Ville Bangna-Trad Km.10",
    "description": "ทาวน์โฮมบางนา–ตราด กม.10 ใกล้เมกาบางนา",
    "description_en": "ทาวน์โฮมบางนา–ตราด กม.10 ใกล้เมกาบางนา",
    "zone": "Bang Na",
    "province": "Samut Prakan",
    "province_th": "สมุทรปราการ",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 2500000,
    "price_max": 3900000,
    "currency": "THB",
    "total_units": 220,
    "sold_units": 154,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T03",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Primo Patio Bangna Km.5",
    "name_th": "Primo Patio Bangna Km.5",
    "description": "ทาวน์โฮมบางนา กม.5 ใกล้ทางด่วน",
    "description_en": "ทาวน์โฮมบางนา กม.5 ใกล้ทางด่วน",
    "zone": "Bang Na",
    "province": "Samut Prakan",
    "province_th": "สมุทรปราการ",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 3200000,
    "price_max": 4800000,
    "currency": "THB",
    "total_units": 160,
    "sold_units": 112,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T04",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "The Connect Suvarnabhumi 3",
    "name_th": "The Connect Suvarnabhumi 3",
    "description": "ทาวน์โฮมใกล้สุวรรณภูมิ",
    "description_en": "ทาวน์โฮมใกล้สุวรรณภูมิ",
    "zone": "Lat Krabang",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 2300000,
    "price_max": 3600000,
    "currency": "THB",
    "total_units": 240,
    "sold_units": 168,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T05",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Casa City Don Muang",
    "name_th": "Casa City Don Muang",
    "description": "ทาวน์โฮมดอนเมือง ใกล้สนามบิน",
    "description_en": "ทาวน์โฮมดอนเมือง ใกล้สนามบิน",
    "zone": "Don Mueang",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 2600000,
    "price_max": 4000000,
    "currency": "THB",
    "total_units": 200,
    "sold_units": 140,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T06",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Baan Suan Bang Bua Thong",
    "name_th": "Baan Suan Bang Bua Thong",
    "description": "ทาวน์โฮมบางบัวทอง บรรยากาศสวน",
    "description_en": "ทาวน์โฮมบางบัวทอง บรรยากาศสวน",
    "zone": "Bang Bua Thong",
    "province": "Nonthaburi",
    "province_th": "นนทบุรี",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 2100000,
    "price_max": 3400000,
    "currency": "THB",
    "total_units": 280,
    "sold_units": 196,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T07",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Golden Town Suksawat-Rama 3",
    "name_th": "Golden Town Suksawat-Rama 3",
    "description": "ทาวน์โฮมสุขสวัสดิ์–พระราม 3",
    "description_en": "ทาวน์โฮมสุขสวัสดิ์–พระราม 3",
    "zone": "Suksawat",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 2900000,
    "price_max": 4500000,
    "currency": "THB",
    "total_units": 150,
    "sold_units": 105,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T08",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Indy 2 Bangna Km.7",
    "name_th": "Indy 2 Bangna Km.7",
    "description": "ทาวน์โฮมบางนา กม.7 ใกล้ห้างและโรงเรียน",
    "description_en": "ทาวน์โฮมบางนา กม.7 ใกล้ห้างและโรงเรียน",
    "zone": "Bang Na",
    "province": "Samut Prakan",
    "province_th": "สมุทรปราการ",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 2700000,
    "price_max": 4100000,
    "currency": "THB",
    "total_units": 190,
    "sold_units": 133,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T09",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Villaggio Rangsit-Klong 4",
    "name_th": "Villaggio Rangsit-Klong 4",
    "description": "ทาวน์โฮมรังสิต–คลอง 4",
    "description_en": "ทาวน์โฮมรังสิต–คลอง 4",
    "zone": "Rangsit",
    "province": "Pathum Thani",
    "province_th": "ปทุมธานี",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 2000000,
    "price_max": 3200000,
    "currency": "THB",
    "total_units": 260,
    "sold_units": 182,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "T10",
    "category": "townhome_suburb",
    "category_th": "ทาวน์โฮมปริมณฑล",
    "name": "Grande Pleno Pinklao",
    "name_th": "Grande Pleno Pinklao",
    "description": "ทาวน์โฮมปิ่นเกล้า ฝั่งตะวันตก",
    "description_en": "ทาวน์โฮมปิ่นเกล้า ฝั่งตะวันตก",
    "zone": "Pinklao",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "townhouse",
    "status": "existing",
    "price_min": 3100000,
    "price_max": 4700000,
    "currency": "THB",
    "total_units": 170,
    "sold_units": 119,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 3,
    "options": {
      "pets_allowed": true,
      "parking": 2,
      "clubhouse": true,
      "playground": true
    },
    "features": [
      "24h_security",
      "cctv",
      "garden"
    ],
    "tags": [
      "townhouse",
      "suburb",
      "family"
    ]
  },
  {
    "id": "L01",
    "category": "luxury_inner_city",
    "category_th": "บ้านหรูใจกลางเมือง",
    "name": "The Residences Wireless Road",
    "name_th": "The Residences Wireless Road",
    "description": "บ้านเดี่ยวหรูใจกลางวิทยุ ใกล้สถานทูตและสวนลุม",
    "description_en": "บ้านเดี่ยวหรูใจกลางวิทยุ ใกล้สถานทูตและสวนลุม",
    "zone": "Wireless Road",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "single_house",
    "status": "existing",
    "price_min": 45000000,
    "price_max": 89000000,
    "currency": "THB",
    "total_units": 12,
    "sold_units": 7,
    "nearest_station": "BTS Ploenchit",
    "station_line": "BTS Sukhumvit",
    "station_distance_meters": 700,
    "transit_score": 7,
    "options": {
      "pets_allowed": true,
      "parking": 4,
      "pool": true,
      "smart_home": true,
      "private_garden": true
    },
    "features": [
      "security_guard",
      "cctv",
      "smart_home",
      "imported_finish"
    ],
    "tags": [
      "luxury",
      "inner_city",
      "single_house"
    ]
  },
  {
    "id": "L02",
    "category": "luxury_inner_city",
    "category_th": "บ้านหรูใจกลางเมือง",
    "name": "Sathorn Garden Estate",
    "name_th": "Sathorn Garden Estate",
    "description": "บ้านเดี่ยวหรูสาทร ทำเลธุรกิจระดับพรีเมียม",
    "description_en": "บ้านเดี่ยวหรูสาทร ทำเลธุรกิจระดับพรีเมียม",
    "zone": "Sathorn",
    "province": "Bangkok",
    "province_th": "กรุงเทพมหานคร",
    "property_type": "single_house",
    "status": "existing",
    "price_min": 38000000,
    "price_max": 72000000,
    "currency": "THB",
    "total_units": 18,
    "sold_units": 11,
    "nearest_station": "BTS Sala Daeng",
    "station_line": "BTS Silom",
    "station_distance_meters": 700,
    "transit_score": 7,
    "options": {
      "pets_allowed": true,
      "parking": 4,
      "pool": true,
      "smart_home": true,
      "private_garden": true
    },
    "features": [
      "security_guard",
      "cctv",
      "smart_home",
      "imported_finish"
    ],
    "tags": [
      "luxury",
      "inner_city",
      "single_house"
    ]
  },
  {
    "id": "V01",
    "category": "luxury_vacation",
    "category_th": "บ้านพักตากอากาศหรู — เขาใหญ่",
    "name": "Khao Yai Grand Valley",
    "name_th": "Khao Yai Grand Valley",
    "description": "บ้านพักตากอากาศหรูเขาใหญ่ วิวเขาและสนามกอล์ฟ",
    "description_en": "บ้านพักตากอากาศหรูเขาใหญ่ วิวเขาและสนามกอล์ฟ",
    "zone": "Khao Yai",
    "province": "Nakhon Ratchasima",
    "province_th": "นครราชสีมา",
    "property_type": "vacation_villa",
    "status": "existing",
    "price_min": 18000000,
    "price_max": 45000000,
    "currency": "THB",
    "total_units": 40,
    "sold_units": 22,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 1,
    "options": {
      "pets_allowed": true,
      "parking": 3,
      "pool": true,
      "golf_nearby": true,
      "sea_view": false,
      "mountain_view": true
    },
    "features": [
      "private_pool",
      "landscape_garden",
      "guest_house"
    ],
    "tags": [
      "luxury",
      "vacation",
      "เขาใหญ่"
    ]
  },
  {
    "id": "V02",
    "category": "luxury_vacation",
    "category_th": "บ้านพักตากอากาศหรู — เชียงใหม่",
    "name": "Doi Suthep Residence Chiang Mai",
    "name_th": "Doi Suthep Residence Chiang Mai",
    "description": "บ้านพักหรูเชิงดอยสุเทพ เชียงใหม่",
    "description_en": "บ้านพักหรูเชิงดอยสุเทพ เชียงใหม่",
    "zone": "Doi Suthep",
    "province": "Chiang Mai",
    "province_th": "เชียงใหม่",
    "property_type": "vacation_villa",
    "status": "existing",
    "price_min": 15000000,
    "price_max": 38000000,
    "currency": "THB",
    "total_units": 28,
    "sold_units": 15,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 1,
    "options": {
      "pets_allowed": true,
      "parking": 3,
      "pool": true,
      "golf_nearby": false,
      "sea_view": false,
      "mountain_view": true
    },
    "features": [
      "private_pool",
      "landscape_garden",
      "guest_house"
    ],
    "tags": [
      "luxury",
      "vacation",
      "เชียงใหม่"
    ]
  },
  {
    "id": "V03",
    "category": "luxury_vacation",
    "category_th": "บ้านพักตากอากาศหรู — พังงา",
    "name": "Andaman Cliff Estate Phang Nga",
    "name_th": "Andaman Cliff Estate Phang Nga",
    "description": "วิลล่าหรูพังงา วิวทะเลอันดามัน",
    "description_en": "วิลล่าหรูพังงา วิวทะเลอันดามัน",
    "zone": "Takua Thung",
    "province": "Phang Nga",
    "province_th": "พังงา",
    "property_type": "vacation_villa",
    "status": "existing",
    "price_min": 25000000,
    "price_max": 68000000,
    "currency": "THB",
    "total_units": 16,
    "sold_units": 9,
    "nearest_station": null,
    "station_line": null,
    "station_distance_meters": null,
    "transit_score": 1,
    "options": {
      "pets_allowed": true,
      "parking": 3,
      "pool": true,
      "golf_nearby": false,
      "sea_view": true,
      "mountain_view": false
    },
    "features": [
      "private_pool",
      "landscape_garden",
      "guest_house"
    ],
    "tags": [
      "luxury",
      "vacation",
      "พังงา"
    ]
  }
];

const DEMO_PROJECT_COUNTS = {
  total: DEMO_PROJECTS.length,
  condo_transit: DEMO_PROJECTS.filter((p) => p.category === "condo_transit").length,
  townhome_suburb: DEMO_PROJECTS.filter((p) => p.category === "townhome_suburb").length,
  luxury_inner_city: DEMO_PROJECTS.filter((p) => p.category === "luxury_inner_city").length,
  luxury_vacation: DEMO_PROJECTS.filter((p) => p.category === "luxury_vacation").length,
};

function projectsByCategory(category) {
  return DEMO_PROJECTS.filter((p) => p.category === category);
}

module.exports = { DEMO_PROJECTS, DEMO_PROJECT_COUNTS, projectsByCategory };
module.exports.default = DEMO_PROJECTS;

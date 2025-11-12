// Comprehensive South African location data
export const provinces = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

export const districtsByProvince: Record<string, string[]> = {
  "Eastern Cape": [
    "Buffalo City Metropolitan Municipality",
    "Nelson Mandela Bay Metropolitan Municipality",
    "Sarah Baartman District Municipality",
    "Amathole District Municipality",
    "Chris Hani District Municipality",
    "Joe Gqabi District Municipality",
    "OR Tambo District Municipality",
    "Alfred Nzo District Municipality"
  ],
  "Free State": [
    "Mangaung Metropolitan Municipality",
    "Fezile Dabi District Municipality",
    "Lejweleputswa District Municipality",
    "Thabo Mofutsanyana District Municipality",
    "Xhariep District Municipality"
  ],
  "Gauteng": [
    "City of Johannesburg Metropolitan Municipality",
    "City of Tshwane Metropolitan Municipality",
    "City of Ekurhuleni Metropolitan Municipality",
    "Sedibeng District Municipality",
    "West Rand District Municipality"
  ],
  "KwaZulu-Natal": [
    "eThekwini Metropolitan Municipality",
    "Amajuba District Municipality",
    "Harry Gwala District Municipality",
    "iLembe District Municipality",
    "King Cetshwayo District Municipality",
    "Ugu District Municipality",
    "Umgungundlovu District Municipality",
    "Umkhanyakude District Municipality",
    "Umzinyathi District Municipality",
    "Zululand District Municipality"
  ],
  "Limpopo": [
    "Capricorn District Municipality",
    "Mopani District Municipality",
    "Sekhukhune District Municipality",
    "Vhembe District Municipality",
    "Waterberg District Municipality"
  ],
  "Mpumalanga": [
    "Ehlanzeni District Municipality",
    "Gert Sibande District Municipality",
    "Nkangala District Municipality"
  ],
  "Northern Cape": [
    "Frances Baard District Municipality",
    "John Taolo Gaetsewe District Municipality",
    "Namakwa District Municipality",
    "Pixley ka Seme District Municipality",
    "ZF Mgcawu District Municipality"
  ],
  "North West": [
    "Bojanala Platinum District Municipality",
    "Dr Kenneth Kaunda District Municipality",
    "Dr Ruth Segomotsi Mompati District Municipality",
    "Ngaka Modiri Molema District Municipality"
  ],
  "Western Cape": [
    "City of Cape Town Metropolitan Municipality",
    "West Coast District Municipality",
    "Cape Winelands District Municipality",
    "Overberg District Municipality",
    "Eden District Municipality",
    "Central Karoo District Municipality"
  ]
};

export const municipalitiesByDistrict: Record<string, string[]> = {
  // Eastern Cape
  "Buffalo City Metropolitan Municipality": [
    "Buffalo City Metropolitan Municipality"
  ],
  "Nelson Mandela Bay Metropolitan Municipality": [
    "Nelson Mandela Bay Metropolitan Municipality"
  ],
  "Sarah Baartman District Municipality": [
    "Blue Crane Route Local Municipality",
    "Dr Beyers Naudé Local Municipality",
    "Kouga Local Municipality",
    "Kou-Kamma Local Municipality",
    "Makana Local Municipality",
    "Ndlambe Local Municipality",
    "Sundays River Valley Local Municipality"
  ],
  "Amathole District Municipality": [
    "Amahlathi Local Municipality",
    "Great Kei Local Municipality",
    "Mbhashe Local Municipality",
    "Mnquma Local Municipality",
    "Ngqushwa Local Municipality",
    "Nkonkobe Local Municipality",
    "Nxuba Local Municipality"
  ],
  "Chris Hani District Municipality": [
    "Enoch Mgijima Local Municipality",
    "Inxuba Yethemba Local Municipality",
    "Intsika Yethu Local Municipality",
    "Emalahleni Local Municipality",
    "Engcobo Local Municipality",
    "Sakhisizwe Local Municipality"
  ],
  "Joe Gqabi District Municipality": [
    "Elundini Local Municipality",
    "Senqu Local Municipality",
    "Walter Sisulu Local Municipality"
  ],
  "OR Tambo District Municipality": [
    "Ingquza Hill Local Municipality",
    "King Sabata Dalindyebo Local Municipality",
    "Mhlontlo Local Municipality",
    "Nyandeni Local Municipality",
    "Port St Johns Local Municipality"
  ],
  "Alfred Nzo District Municipality": [
    "Matatiele Local Municipality",
    "Mbizana Local Municipality",
    "Ntabankulu Local Municipality",
    "Umzimvubu Local Municipality"
  ],

  // Free State
  "Mangaung Metropolitan Municipality": [
    "Mangaung Metropolitan Municipality"
  ],
  "Fezile Dabi District Municipality": [
    "Metsimaholo Local Municipality",
    "Mafube Local Municipality",
    "Moqhaka Local Municipality",
    "Ngwathe Local Municipality"
  ],
  "Lejweleputswa District Municipality": [
    "Matjhabeng Local Municipality",
    "Nala Local Municipality",
    "Tswelopele Local Municipality",
    "Masilonyana Local Municipality"
  ],
  "Thabo Mofutsanyana District Municipality": [
    "Setsoto Local Municipality",
    "Dihlabeng Local Municipality",
    "Nketoana Local Municipality",
    "Maluti-a-Phofung Local Municipality",
    "Phumelela Local Municipality"
  ],
  "Xhariep District Municipality": [
    "Kopanong Local Municipality",
    "Letsemeng Local Municipality",
    "Mohokare Local Municipality"
  ],

  // Gauteng
  "City of Johannesburg Metropolitan Municipality": [
    "City of Johannesburg Metropolitan Municipality"
  ],
  "City of Tshwane Metropolitan Municipality": [
    "City of Tshwane Metropolitan Municipality"
  ],
  "City of Ekurhuleni Metropolitan Municipality": [
    "City of Ekurhuleni Metropolitan Municipality"
  ],
  "Sedibeng District Municipality": [
    "Emfuleni Local Municipality",
    "Midvaal Local Municipality",
    "Lesedi Local Municipality"
  ],
  "West Rand District Municipality": [
    "Mogale City Local Municipality",
    "Merafong City Local Municipality",
    "Rand West City Local Municipality"
  ],

  // KwaZulu-Natal
  "eThekwini Metropolitan Municipality": [
    "eThekwini Metropolitan Municipality"
  ],
  "Amajuba District Municipality": [
    "Newcastle Local Municipality",
    "eMadlangeni Local Municipality",
    "Dannhauser Local Municipality"
  ],
  "Harry Gwala District Municipality": [
    "Dr Nkosazana Dlamini-Zuma Local Municipality",
    "Greater Kokstad Local Municipality",
    "Ubuhlebezwe Local Municipality",
    "Umzimkhulu Local Municipality"
  ],
  "iLembe District Municipality": [
    "KwaDukuza Local Municipality",
    "Mandeni Local Municipality",
    "Maphumulo Local Municipality",
    "Ndwedwe Local Municipality"
  ],
  "King Cetshwayo District Municipality": [
    "City of uMhlathuze Local Municipality",
    "Mthonjaneni Local Municipality",
    "Nkandla Local Municipality",
    "uMlalazi Local Municipality"
  ],
  "Ugu District Municipality": [
    "Ray Nkonyeni Local Municipality",
    "uMdoni Local Municipality",
    "uMuziwabantu Local Municipality",
    "Umzumbe Local Municipality"
  ],
  "Umgungundlovu District Municipality": [
    "uMshwathi Local Municipality",
    "uMngeni Local Municipality",
    "Mpofana Local Municipality",
    "Impendle Local Municipality",
    "Msunduzi Local Municipality",
    "Mkhambathini Local Municipality",
    "Richmond Local Municipality"
  ],
  "Umkhanyakude District Municipality": [
    "Big Five Hlabisa Local Municipality",
    "Jozini Local Municipality",
    "Mtubatuba Local Municipality",
    "The Big Five False Bay Local Municipality"
  ],
  "Umzinyathi District Municipality": [
    "Endumeni Local Municipality",
    "Nquthu Local Municipality",
    "Msinga Local Municipality",
    "Umvoti Local Municipality"
  ],
  "Zululand District Municipality": [
    "AbaQulusi Local Municipality",
    "eDumbe Local Municipality",
    "uPhongolo Local Municipality",
    "Nongoma Local Municipality",
    "Ulundi Local Municipality"
  ],

  // Limpopo
  "Capricorn District Municipality": [
    "Blouberg Local Municipality",
    "Lepelle-Nkumpi Local Municipality",
    "Molemole Local Municipality",
    "Polokwane Local Municipality"
  ],
  "Mopani District Municipality": [
    "Ba-Phalaborwa Local Municipality",
    "Greater Giyani Local Municipality",
    "Greater Letaba Local Municipality",
    "Greater Tzaneen Local Municipality",
    "Maruleng Local Municipality"
  ],
  "Sekhukhune District Municipality": [
    "Elias Motsoaledi Local Municipality",
    "Ephraim Mogale Local Municipality",
    "Fetakgomo Tubatse Local Municipality",
    "Makhuduthamaga Local Municipality"
  ],
  "Vhembe District Municipality": [
    "Collins Chabane Local Municipality",
    "Makhado Local Municipality",
    "Musina Local Municipality",
    "Thulamela Local Municipality"
  ],
  "Waterberg District Municipality": [
    "Bela-Bela Local Municipality",
    "Lephalale Local Municipality",
    "Mogalakwena Local Municipality",
    "Mookgopong Local Municipality",
    "Modimolle-Mookgophong Local Municipality",
    "Thabazimbi Local Municipality"
  ],

  // Mpumalanga
  "Ehlanzeni District Municipality": [
    "Bushbuckridge Local Municipality",
    "City of Mbombela Local Municipality",
    "Nkomazi Local Municipality",
    "Thaba Chweu Local Municipality",
    "Umjindi Local Municipality"
  ],
  "Gert Sibande District Municipality": [
    "Albert Luthuli Local Municipality",
    "Dipaleseng Local Municipality",
    "Govan Mbeki Local Municipality",
    "Lekwa Local Municipality",
    "Mkhondo Local Municipality",
    "Msukaligwa Local Municipality",
    "Mpuluzi Local Municipality",
    "Pixley Ka Seme Local Municipality"
  ],
  "Nkangala District Municipality": [
    "Delmas Local Municipality",
    "Dr JS Moroka Local Municipality",
    "Emalahleni Local Municipality",
    "Highlands Local Municipality",
    "Steve Tshwete Local Municipality",
    "Thembisile Hani Local Municipality"
  ],

  // Northern Cape
  "Frances Baard District Municipality": [
    "Dikgatlong Local Municipality",
    "Magareng Local Municipality",
    "Phokwane Local Municipality",
    "Sol Plaatje Local Municipality"
  ],
  "John Taolo Gaetsewe District Municipality": [
    "Gamagara Local Municipality",
    "Joe Morolong Local Municipality",
    "Ga-Segonyana Local Municipality"
  ],
  "Namakwa District Municipality": [
    "Hantam Local Municipality",
    "Kamiesberg Local Municipality",
    "Karoo Hoogland Local Municipality",
    "Khâi-Ma Local Municipality",
    "Nama Khoi Local Municipality",
    "Richtersveld Local Municipality"
  ],
  "Pixley ka Seme District Municipality": [
    "Emthanjeni Local Municipality",
    "Kareeberg Local Municipality",
    "Renosterberg Local Municipality",
    "Thembelihle Local Municipality",
    "Ubuntu Local Municipality",
    "Umsobomvu Local Municipality"
  ],
  "ZF Mgcawu District Municipality": [
    "Dawid Kruiper Local Municipality",
    "Kai !Garib Local Municipality",
    "!Kheis Local Municipality",
    "Tsantsabane Local Municipality"
  ],

  // North West
  "Bojanala Platinum District Municipality": [
    "Kgetlengrivier Local Municipality",
    "Madibeng Local Municipality",
    "Moretele Local Municipality",
    "Moses Kotane Local Municipality",
    "Rustenburg Local Municipality"
  ],
  "Dr Kenneth Kaunda District Municipality": [
    "City of Matlosana Local Municipality",
    "Maquassi Hills Local Municipality",
    "Ventersdorp Local Municipality"
  ],
  "Dr Ruth Segomotsi Mompati District Municipality": [
    "Greater Taung Local Municipality",
    "Kagisano-Molopo Local Municipality",
    "Lekwa-Teemane Local Municipality",
    "Mamusa Local Municipality",
    "Naledi Local Municipality"
  ],
  "Ngaka Modiri Molema District Municipality": [
    "Ditsobotla Local Municipality",
    "Mafikeng Local Municipality",
    "Ramatlabama Local Municipality",
    "Tswaing Local Municipality"
  ],

  // Western Cape
  "City of Cape Town Metropolitan Municipality": [
    "City of Cape Town Metropolitan Municipality"
  ],
  "West Coast District Municipality": [
    "Bergrivier Local Municipality",
    "Cederberg Local Municipality",
    "Matzikama Local Municipality",
    "Saldanha Bay Local Municipality",
    "Swartland Local Municipality"
  ],
  "Cape Winelands District Municipality": [
    "Breede Valley Local Municipality",
    "Drakenstein Local Municipality",
    "Langeberg Local Municipality",
    "Stellenbosch Local Municipality",
    "Witzenberg Local Municipality"
  ],
  "Overberg District Municipality": [
    "Cape Agulhas Local Municipality",
    "Overstrand Local Municipality",
    "Swellendam Local Municipality",
    "Theewaterskloof Local Municipality"
  ],
  "Eden District Municipality": [
    "Bitou Local Municipality",
    "George Local Municipality",
    "Hessequa Local Municipality",
    "Kannaland Local Municipality",
    "Knysna Local Municipality",
    "Mossel Bay Local Municipality",
    "Oudtshoorn Local Municipality"
  ],
  "Central Karoo District Municipality": [
    "Beaufort West Local Municipality",
    "Laingsburg Local Municipality",
    "Prince Albert Local Municipality"
  ]
};
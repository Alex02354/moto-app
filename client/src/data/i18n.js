import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        my_events: "My Events",
        wishlist: "Wishlist",
        signin: "Sign In",
        all: "ALL",
        routes: "ROUTES",
        camps: "CAMPS",
        itinerary2: "ITINERARY",
        places2: "PLACES",
        country: "Country",
        title: "Title",
        description: "Description",
        section: "Section",
        all_countries: "All Countries",
        empty: "Your wishlist is empty.",
        contact_us: "Contact Us",
        offroadonroad: "OFF-ROAD ON ROAD",
        email: "Email: info@offroadonroad.sk",
        phone: "Phone: +421 904 675 465",
        rights: "All rights reserved.",
        access: "Access",
        date: "Date",
        created_by: "Created by",
        add_new_event: "Add New Event",
        atw: " Add to Wishlist",
        rfw: " Remove from Wishlist",
        edit_event: "Edit Event",
        delete_event: "Delete Event",
        map_link: "Map Link",
        main_section: "Main Section",
        select_main_section: "Select a main section",
        select_sub_section: "Select a sub-section",
        submit: "Submit",
        loading: "loading",
        image: "Image",
        coordinates: "Coordinates",
        comma: "comma-separated",
        select_country: "Select a country",
        select_access: "Select an access",
        signedin: "You must be signed in to add an event.",
        profile: "Profile",
        success: "Image uploaded successfully.",
        delete_account: "Delete Account",
        sign_out: "Sign out",
        sign_out_warning: "Are you sure you want to sign out?",
        yes: "Yes",
        no: "No",
        delete_account_warning:
          "Are you sure you want to delete your account? This action cannot be undone.",
        update: "Update",
        username: "Username",
        password: "Password",
        upload_image: "Upload Image",
        uploading: "Uploading...",
        image_success: "Image uploaded successfully",
        map_itinerary: "MAP/ITINERARY URL",
        car: "Car",
        caravan: "Caravan",
        offroad: "Offroad",
        camp: "Camp",
        route: "Route",
        itinerary: "Itinerary",
        places: "Places",
        natural: "Natural",
        created: "Created",
        camp_subsection: "Camp Sub-section",
        route_subsection: "Route Sub-section",
        places_subsection: "Places Sub-section",
        nature: "Nature",
        built: "Built",
        views: "Views",
        caravan_car: "Caravan/Car",
        example: "example 48.148598, 17.107748",
        coordinates_warning:
          "Invalid coordinates format. Use XX.XXXXXX, YY.YYYYYY.",
        image_first: "Please upload the image first.",
        edit_event: "Edit Event",
        delete_warning: "Are you sure you want to delete this event?",
        continue: "CONTINUE WITH GOOGLE",
        account: "Don't have and account?",
        signup: "Sign up",
        have_account: "Have an account?",
        signin_warn: "You must be signed in to view your events.",
        wishlist_warn: "You must be signed in to view your wishlist events.",
        noevents: "No events available.",
        gpx_file: "GPX file",
        upload_gpx: "Upload GPX file",
        countries: {
          Afghanistan: "Afghanistan",
          Albania: "Albania",
          Algeria: "Algeria",
          Andorra: "Andorra",
          Argentina: "Argentina",
          Armenia: "Armenia",
          Australia: "Australia",
          Austria: "Austria",
          Azerbaijan: "Azerbaijan",
          Belarus: "Belarus",
          Belgium: "Belgium",
          Bolivia: "Bolivia",
          Bosnia_Herzegovina: "Bosnia and Herzegovina",
          Brazil: "Brazil",
          Bulgaria: "Bulgaria",
          Canada: "Canada",
          China: "China",
          Colombia: "Colombia",
          Croatia: "Croatia",
          Cyprus: "Cyprus",
          Czechia: "Czechia",
          Denmark: "Denmark",
          Egypt: "Egypt",
          Estonia: "Estonia",
          Finland: "Finland",
          France: "France",
          Georgia: "Georgia",
          Germany: "Germany",
          Greece: "Greece",
          Hungary: "Hungary",
          Iceland: "Iceland",
          India: "India",
          Indonesia: "Indonesia",
          Iran: "Iran",
          Iraq: "Iraq",
          Ireland: "Ireland",
          Israel: "Israel",
          Italy: "Italy",
          Japan: "Japan",
          Jordan: "Jordan",
          Kazakhstan: "Kazakhstan",
          Kosovo: "Kosovo",
          Kyrgyzstan: "Kyrgyzstan",
          Latvia: "Latvia",
          Lebanon: "Lebanon",
          Libya: "Libya",
          Liechtenstein: "Liechtenstein",
          Lithuania: "Lithuania",
          Luxembourg: "Luxembourg",
          Malta: "Malta",
          Mexico: "Mexico",
          Moldova: "Moldova",
          Monaco: "Monaco",
          Mongolia: "Mongolia",
          Montenegro: "Montenegro",
          Morocco: "Morocco",
          Netherlands: "Netherlands",
          New_Zealand: "New Zealand",
          North_Macedonia: "North Macedonia",
          Norway: "Norway",
          Oman: "Oman",
          Pakistan: "Pakistan",
          Peru: "Peru",
          Poland: "Poland",
          Portugal: "Portugal",
          Romania: "Romania",
          Russia: "Russia",
          San_Marino: "San Marino",
          Saudi_Arabia: "Saudi Arabia",
          Serbia: "Serbia",
          Slovakia: "Slovakia",
          Slovenia: "Slovenia",
          Spain: "Spain",
          Sweden: "Sweden",
          Switzerland: "Switzerland",
          Syria: "Syria",
          Tajikistan: "Tajikistan",
          Thailand: "Thailand",
          Tunisia: "Tunisia",
          Turkey: "Turkey",
          Turkmenistan: "Turkmenistan",
          United_Arab_Emirates: "United Arab Emirates",
          United_Kingdom: "United Kingdom",
          United_States_of_America: "United States of America",
          Uzbekistan: "Uzbekistan",
          Venezuela: "Venezuela",
          Vietnam: "Vietnam",
          Yemen: "Yemen",
        },
        sections: {
          route: "Route",
          camp: "Camp",
          places: "Places",
          itinerary: "Itinerary",
        },
        campSections: {
          natural: "Natural",
          created: "Created",
        },
        routeSections: {
          offroad: "Offroad",
          caravan_car: "Caravan/Car",
        },
        placesSections: {
          nature: "Nature",
          built: "Built",
          views: "Views",
        },
        access2: {
          caravan: "Caravan",
          car: "Car",
          offroad: "Offroad",
        },
      },
    },
    sk: {
      translation: {
        my_events: "Moje udalosti",
        wishlist: "Obľúbené",
        signin: "Prihlásiť sa",
        all: "VŠETKO",
        routes: "TRASY",
        camps: "KEMPY",
        itinerary2: "ITINERÁRE",
        places2: "MIESTA",
        country: "Krajina",
        title: "Názov",
        description: "Popis udalosti",
        section: "Sekcia",
        all_countries: "Všetky krajiny",
        empty: "Váš zoznam obľúbených položiek je prázdny.",
        contact_us: "Kontaktujte nás",
        offroadonroad: "OFF-ROAD ON ROAD",
        email: "Email: info@offroadonroad.sk",
        phone: "Tel: +421 904 675 465",
        rights: "Všetky práva vyhradené.",
        access: "Prístup",
        date: "Dátum",
        created_by: "Vytvoril/a",
        atw: " Pridať k obľúbeným",
        rfw: " Odstrániť z obľúbených",
        add_new_event: "Pridať novú udalosť",
        edit_event: "Upraviť udalosť",
        delete_event: "Zmazať udalosť",
        map_link: "Odkaz na mapu",
        main_section: "Hlavná sekcia",
        select_main_section: "Vyber hlavnú sekcia",
        select_sub_section: "Vyber podsekciu",
        submit: "Odoslať",
        loading: "Načítáva sa...",
        image: "Obrázok",
        coordinates: "Súradnice",
        comma: "oddelené čiarkou",
        select_country: "Vyber krajinu",
        select_access: "Vybrať prístup",
        signedin: "Aby ste mohli pridať udalosť, musíte sa prihlásiť.",
        profile: "Profil",
        success: "Obrázok bol úspešne nahraný",
        delete_account: "Zmazať účet",
        sign_out: "Odhlásiť sa",
        sign_out_warning: "Skutočne sa chcete odhlásiť",
        yes: "Ano",
        no: "Nie",
        delete_account_warning:
          "Skutočne chcete zmazať svoj účet? Zmazaný účet už nemožno obnoviť.",
        update: "Upraviť",
        username: "Uživateľské meno",
        password: "Heslo",
        upload_image: "Nahrať obrázok",
        uploading: "Nahrávanie v procese..",
        image_success: "Nahranie obrázku bolo úspešné",
        map_itinerary: "MAPA/ITINERÁR URL",
        car: "Auto",
        caravan: "Karavan",
        offroad: "Offroad",
        camp: "Kemp",
        route: "Trasa",
        itinerary: "Itinerár",
        places: "Miesta",
        natural: "Prírodný",
        created: "Vytvorený",
        camp_subsection: "Kemp podsekcia",
        route_subsection: "Trasa podsekcia",
        places_subsection: "Miesta podsekcia",
        nature: "Prírodné",
        built: "Stavby",
        views: "Výhľady",
        caravan_car: "Karavan/Auto",
        example: "príklad 48.148598, 17.107748",
        coordinates_warning:
          "Neplatný formát súradníc. Použi: XX.XXXXXX, YY.YYYYYY.",
        image_first: "Nezabudnite nahrať obrázok",
        edit_event: "Upraviť udalosť",
        delete_warning: "Skutočne si prajete odstrániť udalosť?",
        continue: "Prihlásiť sa cez Google účet",
        account: "Nemáte účet?",
        signup: "Vytvoriť účet",
        have_account: "Máte účet?",
        signin_warn: "Prihláste sa, aby ste videli svoje udalosti.",
        wishlist_warn: "Prihláste sa, aby ste videli svoje obľúbené udalosti.",
        noevents: "Nevytvorili ste žiadne udalosti.",
        gpx_file: "GPX súbor",
        upload_gpx: "Nahrať GPX súbor",
        countries: {
          Afghanistan: "Afganistan",
          Albania: "Albánsko",
          Algeria: "Alžírsko",
          Andorra: "Andorra",
          Argentina: "Argentína",
          Armenia: "Arménsko",
          Australia: "Austrália",
          Azerbaijan: "Azerbajdžan",
          Belgium: "Belgicko",
          Belarus: "Bielorusko",
          Bolivia: "Bolívia",
          Bosnia_Herzegovina: "Bosna a Hercegovina",
          Brazil: "Brazília",
          Bulgaria: "Bulharsko",
          Cyprus: "Cyprus",
          Czechia: "Česko",
          Montenegro: "Čierna Hora",
          China: "Čína",
          Denmark: "Dánsko",
          Egypt: "Egypt",
          Estonia: "Estónsko",
          Finland: "Fínsko",
          France: "Francúzsko",
          Greece: "Grécko",
          Georgia: "Gruzínsko",
          Netherlands: "Holandsko",
          Croatia: "Chorvátsko",
          India: "India",
          Indonesia: "Indonézia",
          Iraq: "Irak",
          Iran: "Irán",
          Iceland: "Island",
          Ireland: "Írsko",
          Israel: "Izrael",
          Japan: "Japonsko",
          Yemen: "Jemen",
          Jordan: "Jordánsko",
          Canada: "Kanada",
          Kazakhstan: "Kazachstan",
          Kyrgyzstan: "Kirgizsko",
          Colombia: "Kolumbia",
          Kosovo: "Kosovo",
          Lebanon: "Libanon",
          Libya: "Líbya",
          Liechtenstein: "Lichtenštajnsko",
          Lithuania: "Litva",
          Latvia: "Lotyšsko",
          Luxembourg: "Luxembursko",
          Hungary: "Maďarsko",
          Malta: "Malta",
          Morocco: "Maroko",
          Mexico: "Mexiko",
          Moldova: "Moldavsko",
          Monaco: "Monako",
          Mongolia: "Mongolsko",
          Germany: "Nemecko",
          New_Zealand: "Nový Zéland",
          Norway: "Nórsko",
          Oman: "Omán",
          Pakistan: "Pakistan",
          Peru: "Peru",
          Poland: "Poľsko",
          Portugal: "Portugalsko",
          Austria: "Rakúsko",
          Romania: "Rumunsko",
          Russia: "Rusko",
          San_Marino: "San Maríno",
          Saudi_Arabia: "Saudská Arábia",
          North_Macedonia: "Severné Macedónsko",
          Slovakia: "Slovensko",
          Slovenia: "Slovinsko",
          United_Arab_Emirates: "Spojené arabské emiráty",
          United_Kingdom: "Spojené kráľovstvo",
          United_States_of_America: "Spojené štáty americké",
          Serbia: "Srbsko",
          Spain: "Španielsko",
          Sweden: "Švédsko",
          Switzerland: "Švajčiarsko",
          Syria: "Sýria",
          Tajikistan: "Tadžikistan",
          Italy: "Taliansko",
          Thailand: "Thajsko",
          Tunisia: "Tunisko",
          Turkey: "Turecko",
          Turkmenistan: "Turkménsko",
          Uzbekistan: "Uzbekistan",
          Venezuela: "Venezuela",
          Vietnam: "Vietnam",
        },
        sections: {
          route: "Trasa",
          camp: "Kemp",
          places: "Miesta",
          itinerary: "Itinerár",
        },
        campSections: {
          natural: "Prírodný",
          created: "Vytvorený",
        },
        routeSections: {
          offroad: "Offroad",
          caravan_car: "Karavan/Auto",
        },
        placesSections: {
          nature: "Príroda",
          built: "Stavby",
          views: "Výhľady",
        },
        access2: {
          caravan: "Karavan",
          car: "Auto",
          offroad: "Offroad",
        },
      },
    },
  },
});

export default i18n;

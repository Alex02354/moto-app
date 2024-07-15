import React, { useState, useEffect } from "react";
import myImage from "../assets/images/3.jpg"; // Adjust the path as necessary
import myImage2 from "../assets/images/1.jpg";
import myImage3 from "../assets/images/2.jpg";
import Events from "./Events";
import { FaArrowUp } from "react-icons/fa"; // Import arrow up icon from react-icons
import mapa from "../assets/images/mapa-mensia.jpg";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false); // State for image expansion

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="max-w-10xl mx-auto mt-10">
      <div className="max-w-7xl items-center mx-auto">
        <div className="px-4 my-5 flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-2/3 mb-4 md:mb-0">
            <p className="mb-4 text-justify font-bold">
              Cestovanie a spoznávanie je skutočným bohatstvom, ktorého základom
              sú zážitky z ciest a ľudia, ktorých pri tom stretneš. Spočiatku
              som si myslel, že cestovaním je aj "letná dovolenka" či "zájazd"
              do rezortu, avšak opak je pravdou a až neskôr som to pochopil, keď
              som v "mojich začiatkoch" spoznal partičku offroaďákov (Etreme
              Adventure Offroad Team) a začal s nimi jazdiť rôzne výjazdy /
              expedície rozmanitými krajinami a postupne objavoval ich kultúru,
              obyvateľov či zvyky. Väčšinou jazdíme trasy "na vlastnú päsť", čo
              prináša obrovský pocit slobody, dobrodružstva a autenticity, pri
              spoznávaní krajiny, nových ľudí a ich bežného života alebo
              typických tradícií.
            </p>
            <p className="mb-4 text-justify font-bold">
              Cestovanie je vášeň, je to niečo čomu podľahnete a už sa toho
              nikdy nevzdáte. Znamená aj vykročenie zo svojej komfortnej zóny v
              ústrety dobrodružstvu, vykročenie smerom k zážitkom a k veľkému
              otázniku, pretože nevieme, čo nás čaká, či už máme plán cesty,
              alebo nie. Vždy príde niečo, čo nám plán naruší a o tom to je,
              pretože práve to sú tie momenty, z ktorých vznikajú tie najlepšie
              príbehy.
            </p>
            <p className="mb-4 text-justify font-bold">
              Ak začnete cestovať, už nikdy nebudete ako predtým. Po každej
              novej ceste, po každom novom mieste, ktoré navštívite budete iný.
              Bude sa to diať prirodzene, nebudete to vôbec vnímať, len po čase
              zistíte, že spoznávate vlastne sami seba, nielen hranice krajín,
              ale aj svoje vlastné.
            </p>
          </div>
          <div className="md:w-1/3 md:ml-4">
            <img src={myImage} alt="Description of the image" />
          </div>
        </div>
        <h1 className="px-4 text-3xl font-bold text-left">Sólo či v skupine</h1>
        <div className="px-4 my-5 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/3 md:mr-4">
            <img src={myImage2} alt="Description of the image" />
          </div>
          <div className="md:w-2/3 mb-4 md:mb-0">
            <p className="my-4 text-justify font-bold">
              O čosi neskôr som objavil čaro cestovať aj sólo alebo dvojici,
              kedy sa nemusíte "obmedzovať" na rozhodovanie skupiny a môžete si
              ísť si pozrieť čo chcete, kedy chcete. Niekto preferuje
              spoznávanie pamiatok, niekto chce zase zdolávať vrcholy a vidieť
              nádherné výhľady, a niekto objavovať prírodné scenérie, čo nie je
              niekedy jednoduché skombinovať. Jednou z najlepších vecí na
              cestovaní osamote je, že jediná osoba, ktorú musíte potešiť, ste
              vy sami. :-) Cestovanie je o tom, aby ste si užívali slobodu robiť
              to, čo chcete robiť, keď to chcete urobiť ! Sólo cestovanie
              zvyšuje vašu sebadôveru ako nič iné, a dáva vám priestor na
              premýšľanie o tom, čo je a nie je pre vás dôležité.
            </p>
            <p className="mb-4 text-justify ">
              Pri menších tripoch alebo "poznávačkách" napr. miest alebo
              regiónov, sa len musíte rozhodnúť čo chcete vidieť a zakomponovať
              to do trasy, aby to malo "hlavu aj pätu", či už z časového
              hľadiska (koľko dní máte vyhradených na daný trip) a aj s ohľadom
              na trasovanie (nerobiť jednosmerné trasy, ale zokruhované) a denný
              kilometrový objem (koľko km ste schopný prejsť denne a neboli na
              ďaľší deň v "sklze").
            </p>
          </div>
        </div>
        <div className="px-4 my-5 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start">
          <p className="mb-4 text-justify font-bold">
            Pri off-road expedíciách je to presne naopak, kde väčšinu času ste
            mimo civilizácie a na odľahlých miestach hôr či lesov, a je celkom
            príjemné sa spoľahnúť na technické a materiálové zabezpečenie
            skupiny v prípade nejakej poruchy alebo neočakávaných udalostí.
            Členovia skupiny sú často zjednotení a pripravení pomôcť si navzájom
            pri riešení problémov alebo pri hľadaní riešení určitých výziev, ako
            je napr. zmena trasy či itinerára. V jednote je sila a ako skupina
            si vždy nejako poradíte - ten zvládne to a ten zas toto a ako sa
            hovorí: "V núdzi spoznáš priateľa ! ", v tomto prípade platí
            dvojnásobne !
          </p>
        </div>
        <h1 className="px-4 text-3xl font-bold  text-left">
          Menej je niekedy viac a niekedy viac zase menej
        </h1>
        <div className="px-4 my-5 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-2/3 mb-4 md:mb-0">
            <p className="mb-4 text-justify font-bold">
              Veľa ľudí sa snaží o nadmerné zaplnenie itinerára, naplánovať sa
              príliš veľa aktivít a miest na navštívenie, čo vedie často k
              "nestíhačkám" a stresu. Myslia si, že musia vidieť a zažiť všetko,
              a zabúdajú, že cestovanie by malo byť aj o oddychu a vychutnávaní
              si miestneho života. Dôležité je aj nechať si dostatok času na
              „neplánované aktivity" a objavovanie skrytých kútov a trás.
              Niektoré z tých najkrajších zážitkov prídu práve spontánne a je
              dobré mať flexibilný harmonogram, aby ste na ne mali čas a vedeli
              si ich aj užiť.
            </p>
            <p className="mb-4 text-justify font-bold">
              Každý má iné priority a možnosti, no dôležité je si uvedomiť, že
              aj s obmedzeným rozpočtom si môžeme užiť cestovanie a objavovať
              krásy sveta sa dá aj bez toho, aby sme minuli majland. V konečnom
              dôsledku platí, že čím viac času investuješ do plánovania, tým
              menej zaplatíš. Ak sa nechceš venovať hľadaniu a plánovaniu cesty,
              budeš si pravdepodobne musieť priplatiť za pohodlie a neočakávané
              riešenia. Často sa stáva, že sa ľudia zamerajú len na výber
              destinácie alebo letenky, ale zanedbajú faktory ako ubytovanie,
              stravovanie, dopravu, vstupy a iné výdavky. Najďalej sa dostaneš s
              časovou flexibilitou - ak nemáš určenú destináciu a ani konkrétny
              termín, práve vtedy máš najväčšie šance zažiť dobrodružstvo za
              menej peňazí - načasovanie by malo byť mesiac až dva pred začatím
              turistickej sezóny.
            </p>
          </div>
          <div className="md:w-1/3 md:ml-4">
            <img src={myImage3} alt="Description of the image" />
          </div>
        </div>
        <div className="px-4 my-5 max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start">
          <p className="mb-4 text-justify font-bold">
            Všetko má svoje "pre" a "proti" a je na preferencii každého jedného,
            ako chce ísť, kam a kedy chce ísť a s kým chce ísť. Každopádne,
            najdôležitejšie je, že sa vôbec odhodlal, že CHCE ísť :-) ... ako
            hovorí staré príslovie: „Cesta je cieľ." čo platí, si myslím, nie
            len pri cestovaní, ale aj v každodenom živote, kedy je potrebné žiť
            viac v prítomnosti a byť vďačný za každý moment.
          </p>
          <p className="mb-4  text-justify"></p>
        </div>
        <h1 className="px-4 text-3xl font-bold  text-left">
          ČASOVÁ OS CIEST a EXPEDÍCIÍ
        </h1>
        <Events />
        <h1 className="p-4 text-3xl font-bold  text-left">PLÁN JE JASNÝ ...</h1>
        <img
          src={mapa}
          alt="Home"
          className="cursor-pointer"
          onClick={() => setIsImageExpanded(true)}
        />
        {isImageExpanded && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setIsImageExpanded(false)}
          >
            <img
              src={mapa}
              alt="Enlarged map"
              className="max-w-full max-h-full"
            />
          </div>
        )}
      </div>

      <button
        className={`fixed bottom-5 right-10 p-4 rounded-full bg-yellow-500 text-white ${
          showScroll ? "block" : "hidden"
        }`}
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </button>
    </main>
  );
}

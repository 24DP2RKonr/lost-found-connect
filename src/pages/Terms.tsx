import Layout from "@/components/layout/Layout";
import { FileText } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Lietošanas noteikumi
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pēdējoreiz atjaunināts: 2024. gada 1. janvāris
            </p>
          </div>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="mb-4 text-xl font-semibold">1. Noteikumu pieņemšana</h2>
              <p className="text-muted-foreground">
                Izmantojot Atradums platformu, jūs piekrītat šiem lietošanas
                noteikumiem. Ja nepiekrītat šiem noteikumiem, lūdzu, neizmantojiet
                mūsu pakalpojumus.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">2. Pakalpojuma apraksts</h2>
              <p className="text-muted-foreground">
                Atradums ir bezmaksas platforma, kas palīdz cilvēkiem atrast
                pazaudētās mantas un ziņot par atrastajām mantām. Mēs nodrošinām
                platformu saziņai starp lietotājiem, bet neesam atbildīgi par
                lietotāju darbībām.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">
                3. Lietotāja pienākumi
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Sniegt patiesu un precīzu informāciju sludinājumos</li>
                <li>Neizmantot platformu nelikumīgiem mērķiem</li>
                <li>Cienīt citus lietotājus un neveikt aizskarošu uzvedību</li>
                <li>Nepublicēt maldinošu vai krāpniecisku saturu</li>
                <li>Neizmantot automātiskus rīkus bez atļaujas</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">4. Sludinājumu noteikumi</h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Sludinājumiem jābūt saistītiem ar pazaudētām vai atrastām mantām</li>
                <li>Aizliegts publicēt nepiemērotu vai aizskarošu saturu</li>
                <li>Fotoattēliem jābūt attiecīgajiem un piemērotiem</li>
                <li>Mēs paturam tiesības dzēst neatbilstošus sludinājumus</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">5. Intelektuālais īpašums</h2>
              <p className="text-muted-foreground">
                Platformas saturs, dizains un funkcionalitāte ir mūsu
                intelektuālais īpašums. Lietotāji patur tiesības uz savu
                publicēto saturu, bet piešķir mums licenci to parādīt platformā.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">6. Atbildības ierobežojumi</h2>
              <p className="text-muted-foreground">
                Mēs neesam atbildīgi par:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Lietotāju publicēto saturu vai darbībām</li>
                <li>Zaudējumiem, kas radušies platformas izmantošanas rezultātā</li>
                <li>Pakalpojuma pārtraukumiem vai tehniskām kļūdām</li>
                <li>Trešo pušu rīcību vai saturu</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">7. Konta pārtraukšana</h2>
              <p className="text-muted-foreground">
                Mēs paturam tiesības pārtraukt vai apturēt piekļuvi jebkuram
                lietotājam, kurš pārkāpj šos noteikumus vai iesaistās nelikumīgā
                vai kaitīgā darbībā.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">8. Noteikumu izmaiņas</h2>
              <p className="text-muted-foreground">
                Mēs varam mainīt šos noteikumus jebkurā laikā. Turpinot izmantot
                platformu pēc izmaiņām, jūs piekrītat jaunajiem noteikumiem.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">9. Piemērojamie likumi</h2>
              <p className="text-muted-foreground">
                Šie noteikumi tiek regulēti saskaņā ar Latvijas Republikas
                likumiem. Jebkuri strīdi tiks risināti Latvijas tiesās.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">10. Kontaktinformācija</h2>
              <p className="text-muted-foreground">
                Ja jums ir jautājumi par šiem noteikumiem, lūdzu, sazinieties ar
                mums:
              </p>
              <p className="mt-2 text-muted-foreground">
                E-pasts: info@atradums.lv
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;

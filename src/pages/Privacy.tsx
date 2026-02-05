import Layout from "@/components/layout/Layout";
import { Shield } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Privātuma politika
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pēdējoreiz atjaunināts: 2024. gada 1. janvāris
            </p>
          </div>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="mb-4 text-xl font-semibold">1. Ievads</h2>
              <p className="text-muted-foreground">
                Atradums ("mēs", "mūsu" vai "platformā") apņemas aizsargāt jūsu
                privātumu. Šī privātuma politika izskaidro, kā mēs vācam,
                izmantojam un aizsargājam jūsu personīgo informāciju, kad
                izmantojat mūsu pakalpojumus.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">
                2. Kādu informāciju mēs vācam
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Vārds un e-pasta adrese reģistrācijas laikā</li>
                <li>Sludinājumu saturs, ko jūs publicējat</li>
                <li>Ziņojumi, ko sūtāt citiem lietotājiem</li>
                <li>Ierīces un pārlūka informācija tehniskiem nolūkiem</li>
                <li>IP adrese drošības nolūkiem</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">
                3. Kā mēs izmantojam jūsu informāciju
              </h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Lai nodrošinātu un uzlabotu mūsu pakalpojumus</li>
                <li>Lai apstrādātu un parādītu jūsu sludinājumus</li>
                <li>Lai nodrošinātu saziņu starp lietotājiem</li>
                <li>Lai nosūtītu svarīgus paziņojumus par pakalpojumu</li>
                <li>Lai novērstu krāpšanu un nodrošinātu drošību</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">
                4. Informācijas kopīgošana
              </h2>
              <p className="text-muted-foreground">
                Mēs nepārdodam un nedalāmies ar jūsu personīgo informāciju
                trešajām pusēm mārketinga nolūkiem. Mēs varam kopīgot informāciju
                tikai:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Ar jūsu piekrišanu</li>
                <li>Lai izpildītu juridiskas prasības</li>
                <li>Lai aizsargātu mūsu tiesības un drošību</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">5. Datu drošība</h2>
              <p className="text-muted-foreground">
                Mēs izmantojam nozares standarta drošības pasākumus, lai
                aizsargātu jūsu personīgo informāciju. Tomēr neviena interneta
                pārraides metode nav 100% droša, un mēs nevaram garantēt absolūtu
                drošību.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">6. Jūsu tiesības</h2>
              <p className="text-muted-foreground">Jums ir tiesības:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Piekļūt savai personīgajai informācijai</li>
                <li>Labot neprecīzu informāciju</li>
                <li>Dzēst savu kontu un datus</li>
                <li>Iebilst pret datu apstrādi</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">7. Sīkdatnes</h2>
              <p className="text-muted-foreground">
                Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pieredzi platformā.
                Jūs varat kontrolēt sīkdatņu iestatījumus savā pārlūkā.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">
                8. Izmaiņas politikā
              </h2>
              <p className="text-muted-foreground">
                Mēs varam periodiski atjaunināt šo privātuma politiku. Par būtiskām
                izmaiņām mēs jūs informēsim, publicējot jauno politiku platformā.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">9. Kontaktinformācija</h2>
              <p className="text-muted-foreground">
                Ja jums ir jautājumi par šo privātuma politiku, lūdzu, sazinieties
                ar mums:
              </p>
              <p className="mt-2 text-muted-foreground">
                E-pasts: privacy@atradums.lv
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;

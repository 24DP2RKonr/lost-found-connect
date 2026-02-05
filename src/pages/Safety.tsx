import Layout from "@/components/layout/Layout";
import { Shield, Users, MapPin, AlertTriangle, CheckCircle } from "lucide-react";

const Safety = () => {
  const safetyTips = [
    {
      icon: Users,
      title: "Tiecieties publiskā vietā",
      description:
        "Vienmēr izvēlieties tikšanos publiskā, labi apgaismotā vietā ar cilvēkiem apkārt, piemēram, tirdzniecības centrā vai kafejnīcā.",
    },
    {
      icon: MapPin,
      title: "Informējiet kādu",
      description:
        "Pastāstiet draugam vai ģimenes loceklim, kur un kad jūs tiksieties ar svešinieku. Dalieties ar atrašanās vietu.",
    },
    {
      icon: AlertTriangle,
      title: "Uzticieties savai intuīcijai",
      description:
        "Ja kaut kas šķiet aizdomīgs vai otrā persona rada neērtības, pārtrauciet komunikāciju un ziņojiet par to.",
    },
    {
      icon: Shield,
      title: "Nedalieties ar personīgo informāciju",
      description:
        "Neatklājiet savu mājas adresi, darba vietu vai finanšu informāciju. Izmantojiet platformas ziņojumu sistēmu.",
    },
  ];

  const doList = [
    "Pārbaudiet mantas īpašumtiesības, pirms atdodat",
    "Lūdziet aprakstīt mantu detaļas, ko tikai īpašnieks varētu zināt",
    "Saglabājiet visu komunikāciju platformā",
    "Fotografējiet atrasto mantu pirms atdošanas",
    "Tikšanās laikā ņemiet līdzi draugu",
  ];

  const dontList = [
    "Nedalieties ar bankas datiem vai paroles",
    "Nesūtiet naudu pirms mantas saņemšanas",
    "Netiecieties privātās vai nomaļās vietās",
    "Neignorējiet aizdomīgu uzvedību",
    "Nesteidzieties - krāpnieki mēdz uzstāt uz ātru rīcību",
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Drošības padomi</h1>
            <p className="mt-2 text-muted-foreground">
              Jūsu drošība ir mūsu prioritāte. Sekojiet šiem padomiem, lai droši
              izmantotu platformu.
            </p>
          </div>

          {/* Main Tips */}
          <div className="mb-12 grid gap-6 sm:grid-cols-2">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <tip.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {tip.title}
                </h3>
                <p className="text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>

          {/* Do's and Don'ts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-found/30 bg-found/5 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-found">
                <CheckCircle className="h-6 w-6" />
                Ieteicams
              </h3>
              <ul className="space-y-3">
                {doList.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-found" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-lost/30 bg-lost/5 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-lost">
                <AlertTriangle className="h-6 w-6" />
                Nav ieteicams
              </h3>
              <ul className="space-y-3">
                {dontList.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-lost" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Report Section */}
          <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Pamanījāt aizdomīgu aktivitāti?
            </h3>
            <p className="mb-4 text-muted-foreground">
              Ja saskārāties ar aizdomīgu uzvedību vai iespējamu krāpšanu, lūdzu,
              ziņojiet mums nekavējoties.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ziņot par problēmu
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Safety;

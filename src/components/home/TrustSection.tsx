import { Shield, Users, Lock, Award } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Droša platforma",
    description: "Jūsu dati ir aizsargāti ar mūsdienīgām šifrēšanas tehnoloģijām.",
  },
  {
    icon: Users,
    title: "Verificēti lietotāji",
    description: "Kopienas dalībnieki ar atsauksmēm un vērtējumiem.",
  },
  {
    icon: Lock,
    title: "Privāta saziņa",
    description: "Jūsu kontaktinformācija netiek atklāta citiem lietotājiem.",
  },
  {
    icon: Award,
    title: "Vērtējumu sistēma",
    description: "Godīgas atsauksmes palīdz identificēt uzticamus lietotājus.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Drošība un uzticamība
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mēs rūpējamies, lai tu justos droši, izmantojot mūsu platformu
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-xl bg-card border border-border p-6 text-center shadow-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

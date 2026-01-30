import { FileText, Search, MessageSquare, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Publicē sludinājumu",
    description: "Apraksti pazaudēto vai atrasto mantu ar detaļām un fotogrāfijām.",
  },
  {
    icon: Search,
    title: "Meklē vai gaidi",
    description: "Pārlūko esošos sludinājumus vai saņem paziņojumu par jauniem ierakstiem.",
  },
  {
    icon: MessageSquare,
    title: "Sazinies droši",
    description: "Izmanto mūsu drošo ziņojumu sistēmu, lai sazinātos ar mantas īpašnieku.",
  },
  {
    icon: ThumbsUp,
    title: "Atstāj atsauksmi",
    description: "Novērtē savu pieredzi un palīdzi veidot uzticamu kopienu.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Kā tas strādā?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vienkāršs process, lai palīdzētu tev atrast pazaudēto vai atgriezt atrasto
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
              )}

              {/* Icon */}
              <div className="relative inline-flex mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary shadow-md transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg">
                  <step.icon className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                {/* Step Number */}
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground shadow-md">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Kā es varu publicēt sludinājumu par pazudušu mantu?",
      answer:
        "Lai publicētu sludinājumu, noklikšķiniet uz pogas 'Publicēt' galvenajā izvēlnē. Aizpildiet veidlapu ar mantas aprakstu, kategoriju, atrašanās vietu un pievienojiet fotoattēlu, ja iespējams.",
    },
    {
      question: "Vai pakalpojums ir bezmaksas?",
      answer:
        "Jā, Atradums platforma ir pilnīgi bezmaksas. Jūs varat publicēt neierobežotu skaitu sludinājumu un sazināties ar citiem lietotājiem bez maksas.",
    },
    {
      question: "Kā es varu sazināties ar sludinājuma autoru?",
      answer:
        "Atveriet interesējošo sludinājumu un izmantojiet ziņojumu formu lapas apakšā. Jūsu ziņojums tiks nosūtīts sludinājuma autoram, un jūs varēsiet turpināt sarunu sadaļā 'Ziņojumi'.",
    },
    {
      question: "Cik ilgi sludinājums ir aktīvs?",
      answer:
        "Sludinājumi paliek aktīvi 30 dienas. Pēc tam jūs varat tos atjaunot vai dzēst no sava profila.",
    },
    {
      question: "Ko darīt, ja atradu mantu?",
      answer:
        "Ja atradāt mantu, publicējiet sludinājumu ar tipu 'Atrasts'. Aprakstiet mantu pēc iespējas detalizētāk, lai īpašnieks to varētu atpazīt.",
    },
    {
      question: "Kā es varu dzēst savu sludinājumu?",
      answer:
        "Atveriet savu sludinājumu un noklikšķiniet uz pogas 'Dzēst sludinājumu'. Sludinājums tiks neatgriezeniski dzēsts.",
    },
    {
      question: "Vai mana personīgā informācija ir droša?",
      answer:
        "Jā, mēs rūpējamies par jūsu privātumu. Jūsu kontaktinformācija nav publiski pieejama - lietotāji var sazināties tikai caur platformas ziņojumu sistēmu.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Bieži uzdotie jautājumi
            </h1>
            <p className="mt-2 text-muted-foreground">
              Atbildes uz visbiežāk uzdotajiem jautājumiem par Atradums platformu
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;

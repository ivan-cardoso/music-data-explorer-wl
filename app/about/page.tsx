import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-foreground">
        About This Challenge
      </h1>

      <Card className="bg-card border-border shadow-sm rounded-2xl">
        <CardContent className="px-8">
          <h2 className="text-2xl font-semibold mb-4">The Project</h2>
          <p className="text-muted-foreground leading-relaxed">
            This Music Data Explorer called{" "}
            <span className="text-primary font-medium">Musify </span> was
            created as part of the{" "}
            <span className="text-primary font-medium">Wollen Labs</span> hiring
            challenge. The goal was to build a dynamic, interactive tool using
            modern technologies, applying clean design principles, data
            visualization, and API integrations.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <Card className="bg-card border-border shadow-sm rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <Image
              src="/ivan-profile.png"
              width={300}
              height={300}
              alt="Ivan Cardoso"
              className="rounded-full object-contain w-42 h-42"
            />
            <h3 className="text-xl font-semibold mt-4">Iván Cardoso</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Full Stack Developer
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm rounded-2xl">
          <CardContent className="p-8 flex flex-col items-center text-center">
            <Image
              src="/wollenlabs-logo.jpeg"
              width={300}
              height={300}
              alt="Wollen Labs"
              className="rounded-full object-contain w-42 h-42"
            />
            <h3 className="text-xl font-semibold mt-4">Wollen Labs</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              World class AI/ML Engineers
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border shadow-sm rounded-2xl mt-10">
        <CardContent className="p-8 text-center">
          <p className="text-xl font-medium text-foreground mb-2">
            I hope we can work together.
          </p>
          <p className="text-muted-foreground">
            Thank you for reviewing this project - I truly enjoyed building it.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

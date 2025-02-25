import {Hero} from "@/components/landing/hero/hero";
import {Integrations} from "@/components/landing/integrations";
import StreamerCarousel from "@/components/landing/trust";
import Workflow from "@/components/landing/workflow";

export default async function HomePage(props: {searchParams: Promise<{error: string}>}) {
  return (
    <div className="relative mx-auto mt-4 flex w-full max-w-screen-lg flex-col px-3 lg:px-4 xl:px-0">
      <Hero />
      <StreamerCarousel />
      <Workflow />
      <Integrations />
    </div>
  );
}

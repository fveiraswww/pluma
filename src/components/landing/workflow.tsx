export default function Workflow() {
  return (
    <div className="mx-auto mt-20 max-w-3xl px-4 py-16">
      <div className="mx-auto mb-14 w-full max-w-xl px-4 text-center">
        <h2 className="font-display text-balance text-3xl font-medium text-neutral-900">
          Powerful features for modern marketing teams
        </h2>
        <p className="mt-3 text-pretty text-lg text-neutral-500">
          We&apos;ve created a set of features that will allow your brand to travel to the next
          level.
        </p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-0 h-full w-0.5 transform bg-gray-200 md:left-1/2 md:-translate-x-1/2" />

        {/* Timeline items */}
        <div className="space-y-20">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-[18px] -mt-2 transform md:left-1/2 md:-translate-x-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-lg">
                1
              </div>
            </div>
            <div className="ml-auto pl-10 text-left md:w-1/2">
              <h3 className="mb-2 text-xl font-semibold">The brand sends an ad request</h3>
              <p className="text-gray-600">
                The brand sends an ad request, with the photo and description, and must have the
                credits available to pay the streamer.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-[18px] -mt-2 transform md:left-1/2 md:-translate-x-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-lg">
                2
              </div>
            </div>
            <div className="mr-auto pl-10 pr-10 text-start md:w-1/2 md:pl-0 md:text-end">
              <h3 className="mb-2 text-xl font-semibold">The streamer checks the ad</h3>
              <p className="text-gray-600">
                If the streamer is cool with the ad and approves it, the brand&apos;s credits will
                be deducted, and the ad will be all set to go live.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -left-[18px] -mt-2 transform md:left-1/2 md:-translate-x-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-lg">
                3
              </div>
            </div>
            <div className="ml-auto pl-10 text-start md:w-1/2">
              <h3 className="mb-2 text-xl font-semibold">Time to go live! 🎥</h3>
              <p className="text-gray-600">
                The announcement is streamed live, and the brand gets notified about the exact time
                it was shown.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

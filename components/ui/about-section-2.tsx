"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Zap } from "lucide-react";
import { useRef } from "react";

export default function AboutSection2() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 1.5,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };
  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };
  return (
    <section className="py-32 px-4 bg-background min-h-screen transition-colors duration-300 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto" ref={heroRef}>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Right side - Content */}
          <div className="flex-1">
            <TimelineContent
              as="h1"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="sm:text-4xl text-2xl md:text-5xl !leading-[110%] font-semibold text-foreground mb-8"
            >
              I am{" "}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-cyan-500 border-2 border-cyan-500 inline-block xl:h-16  border-dotted px-2 rounded-md"
              >
                redefining
              </TimelineContent>{" "}
              software quality to be more reliable and user-centric. My goal is
              to continually raise the bar and{" "}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-purple-500 border-2 border-purple-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                challenge
              </TimelineContent>{" "}
              how testing ensures{" "}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-rose-500 border-2 border-rose-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                perfection.
              </TimelineContent>
            </TimelineContent>

            <div className="mt-12 flex gap-2 justify-between items-center sm:flex-row flex-col">
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="mb-4 sm:text-xl text-xs sm:mb-0"
              >
                <div className=" font-medium text-foreground mb-1 capitalize">
                  Quality Assurance Specialist
                </div>
                <div className=" text-muted-foreground font-semibold uppercase">
                  Based in Dhaka
                </div>
              </TimelineContent>

              <TimelineContent
                as="button"
                animationNum={5}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="bg-brand gap-2 font-medium shadow-lg shadow-brand/20 text-brand-foreground h-12 px-4 rounded-full text-sm inline-flex items-center cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Zap fill="currentColor" size={16} />
                 About Me
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

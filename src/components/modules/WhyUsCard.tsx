import Image from "next/image";
import { useInView } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { DEFAULT_SANS_SERIF_FONT } from "next/dist/shared/lib/constants";

export type StickyProps = {
  title: string;
  description:
    | string
    | {
        problems: string;
        solution: string[];
      };
  image: string;
  id: number;
  setCurrentViewSlide: Dispatch<SetStateAction<number>>;
  list?: boolean;
};

export const WhyUsCard = ({
  title,
  description,
  image,
  id,
  setCurrentViewSlide,
  list = false,
}: StickyProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) {
      setCurrentViewSlide(id - 1);
    } else {
      setCurrentViewSlide(id);
    }
  }, [isInView, setCurrentViewSlide, id]);

  return (
    <div
      style={{
        position: "sticky",
      }}
      className="top-sticky sticky flex h-[460px] w-full max-w-[980px] scale-[0.95] items-center justify-between  rounded-[20px]  bg-[#121815] px-[63px] py-[68px]"
      ref={ref}
    >
      <div className="w-full">
        <h4 className="text-lg font-bold text-accent-light md:text-2xl">
          {title}
        </h4>
        {typeof description != "string" ? (
          <div>
            <div className="mt-[12px]">
              <h4 className="w-5/6 text-[16px] font-medium leading-7 tracking-wide text-secondary">
                {`"${description.problems}"`}
              </h4>
            </div>
            <div className="mt-[12px]">
              <p className="w-4/6 text-[16px] font-medium leading-7 tracking-wide text-accent-light">
                Solution
              </p>
              <ul className="mt-[8px] list-disc text-[16px] font-bold leading-[26px] tracking-wide text-[#888]">
                {description.solution.map((line: string, index: number) => (
                  <li
                    className="ml-[17px] text-sm font-medium leading-[22px] tracking-wide text-[#959595]"
                    key={index}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-[22px] text-[16px] font-medium leading-[26px] tracking-wide text-[#888]">
            {description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
      {/* <div className="flex h-full w-full items-center justify-end overflow-hidden p-4"> */}
      <div className="flex h-full w-[420px] items-center justify-end overflow-hidden">
        <Image
          width={1200}
          data-id={id}
          // className="h-full w-full rounded-3xl bg-center object-cover data-[id='4']:object-contain"
          className="rounded-3xl bg-center object-contain"
          height={1200}
          loading="lazy"
          src={image}
          alt={title}
        />
      </div>
    </div>
  );
};

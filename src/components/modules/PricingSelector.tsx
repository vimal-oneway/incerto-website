"use client";

import Link from "next/link";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

const inputDetails = [
  {
    labelName: "Ingestion",
    name: "ingestion",
    description: "Lorem Ipsum is simply dummy text of the",
    max: 10000,
    min: 100,
    defaultValue: 1000,
    unit: "GB",
    step: 100,
  },
  {
    labelName: "Users",
    name: "user",
    description: "Lorem Ipsum is simply dummy text of the",
    max: 200,
    min: 10,
    defaultValue: 10,
    unit: "Users",
    step: 1,
  },
  {
    labelName: "Retention",
    name: "retention",
    description: "Lorem Ipsum is simply dummy text of the",
    max: 60,
    min: 1,
    defaultValue: 1,
    unit: "Month",
    step: 1,
  },
];

type InputData = {
  user: number;
  retention: number;
  ingestion: number;
};

const OthersPricingDetails = [
  {
    name: "Signoz",
    color: "#F25733",
    getPrice: (data: InputData) =>
      Math.max(
        199,
        ((data.ingestion - 100) * 0.44 +
          data.retention * (0.35 * data.ingestion) +
          data.user * 75) *
          0.6,
      ),
  },
  {
    name: "Grafana",
    color: "#FFA900",
    getPrice: (data: InputData) =>
      Math.max(
        413,
        ((data.ingestion - 100) * 0.44 +
          data.retention * (0.35 * data.ingestion) +
          data.user * 75) *
          0.9,
      ),
  },
  {
    name: "New Relic",
    color: "#00CAFF",
    getPrice: (data: InputData) =>
      (data.ingestion - 100) * 0.44 +
      data.retention * (0.35 * data.ingestion) +
      data.user * 75,
  },
  {
    name: "Datadog",
    color: "#5920AD",
    getPrice: (data: InputData) =>
      2.25 *
        ((data.ingestion - 100) * 0.44 +
          data.retention * (0.35 * data.ingestion) +
          data.user * 75) +
      data.ingestion * 0.29 +
      data.retention * 0.3 +
      data.user * 28,
  },
];

const incertoPricingDetails = {
  name: "Incerto",
  color: "#FFFFFF50",
  getPrice: (data: InputData) =>
    Math.max(135, 0.2367 * OthersPricingDetails[0].getPrice(data)),
};

export const PricingSelector = () => {
  const [inputData, setInputData] = useState<InputData>({
    ingestion: inputDetails[0].defaultValue,
    retention: inputDetails[2].defaultValue,
    user: inputDetails[1].defaultValue,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, parseInt(e.target.value));
    setInputData({
      ...inputData,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  return (
    <div className="w-container mx-auto my-[150px] w-[100%] lg:w-[90%]">
      <h3 className="text-center text-[24px] font-medium tracking-[-0.48px] md:text-[34px] md:leading-[48px] md:tracking-[-0.68px]">
        Monthly
        <span className="font-bold text-[#0F9]"> Pricing Plan</span>
      </h3>

      <p className="mt-4 text-center text-[14px] leading-[28px] tracking-[0.28] md:text-[16px] md:tracking-[0.32px]">
        For more in-depth details{" "}
        <Link
          href={
            "https://docs.google.com/spreadsheets/d/1yAFzdHqP2nLeRcjl8m7gOFpnPKJUFg9Wa0gU3Ij1F3Q/edit?usp=sharing"
          }
          className="text-blue-400 underline underline-offset-4"
        >
          click here
        </Link>
        .
      </p>
      <div className="mt-[32px] flex flex-col-reverse gap-[48px] md:gap-[90px] lg:mt-[60px] lg:flex-row">
        <section className="mx-auto flex w-[90%] flex-col gap-[48px] lg:w-1/2 lg:gap-[23px]">
          <RangeInputs onChange={handleChange} inputData={inputData} />
        </section>
        <section className="w-full lg:w-1/2">
          <IncertoPricing inputData={inputData} />
          <div className="mt-[72px] hidden lg:block">
            <OthersPricing inputData={inputData} />
          </div>
        </section>
      </div>
      <section className="mx-auto mt-[48px] w-[90%] lg:hidden">
        <OthersPricing inputData={inputData} />
      </section>
    </div>
  );
};

const IncertoPricing = ({ inputData }: { inputData: InputData }) => {
  return (
    <div className="flex items-start justify-start bg-[url('/images/pricing/pricing_card.webp')] px-[20px] py-[38px] md:p-[38px] lg:rounded-[20px]">
      <div>
        <h5 className="text-2xl font-bold uppercase leading-[32px] tracking-[1.68px] text-[#FFFFFF]">
          {incertoPricingDetails.name}
        </h5>
        <h2 className="font-bold leading-[50px] tracking-[-0.88px] text-white md:text-[44px]">
          {`$ ${Math.round(incertoPricingDetails.getPrice(inputData)).toLocaleString()}`}
        </h2>
      </div>
    </div>
  );
};

const OthersPricing = ({ inputData }: { inputData: InputData }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-y-[32px] md:grid-cols-4 lg:grid-cols-2">
      {OthersPricingDetails.map(({ name, color, getPrice }, i) => (
        <div key={name}>
          <h6
            className={`text-lg font-bold uppercase leading-[28px] tracking-[1.44px] md:text-xl md:tracking-[1.68px]`}
            style={{
              color: color,
            }}
          >
            {name}
          </h6>
          <h4 className="text-[18px] font-bold tracking-[-0.36px] md:text-[24px] md:tracking-[-0.48px]">{`$ ${Math.round(getPrice(inputData)).toLocaleString()}`}</h4>
        </div>
      ))}
    </div>
  );
};

const RangeInputs = ({
  onChange,
  inputData,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputData: InputData;
}) => {
  return (
    <>
      {inputDetails.map((data, i) => (
        <div key={i}>
          <label
            htmlFor={data.name}
            className="block text-[18px] font-medium leading-[50px] tracking-[-0.36px] md:text-[24px] md:tracking-[-0.46px]"
          >
            {data.labelName}
          </label>
          <div className="mb-[16px] mt-[18px] flex flex-col gap-5 lg:mb-[12px]  lg:mt-[10px] lg:flex-row lg:items-center">
            <input
              id={data.name}
              name={data.name}
              type="range"
              step={data.step}
              onChange={onChange}
              defaultValue={data.defaultValue}
              max={data.max}
              min={data.min}
              className=" selector-ranger-color h-2 w-full cursor-pointer appearance-none rounded-lg  bg-[#0F937C] "
            />

            <span className="w-4/12 text-wrap rounded-xl bg-[#0F937C] px-2  py-1 text-center text-[18px] font-bold tracking-[-0.36px] md:min-w-[150px] md:text-[24px] md:tracking-[-0.48px]">
              {` ${inputData[data.name as keyof InputData]} ${data.unit}`}
              <sup>*</sup>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
// className=" h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#0F937C] "

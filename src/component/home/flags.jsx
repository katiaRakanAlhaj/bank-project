import React from "react";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

const CurrencyItem = ({ country, buyPrice, sellPrice, flag, t }) => (
  <div className="flex items-center py-5 justify-center text-nowrap px-[2rem]">
        <img className="w-[1.5rem] h-[1.5rem] mr-2" src={flag} alt={country} />

    <p className="text-[#FFFFFF] font-[400]">
      {country} : {t('Buy')} {buyPrice} | {t('Sell')}: {sellPrice}
    </p>
  </div>
);

const Flags = ({ flagData }) => {
  // Use flagData if available, otherwise fallback to currencyData
  const data = flagData?.data;

  // Function to chunk the data into groups of 4
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr?.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const chunkedData = chunkArray(data, 4);
  const { t, i18n } = useTranslation();

  // Duplicate the chunked data to create a seamless loop
  const duplicatedChunkedData = [...chunkedData, ...chunkedData];

  // Determine the direction based on the current language
  const direction = i18n.language === "ar" ? "right" : "left";

  return (
    <Marquee direction={direction}>
      {duplicatedChunkedData.map((chunk, index) => (
        <div key={index} className="grid items-center grid-cols-4  gap-y-2">
          {chunk.map((data) => (
            <CurrencyItem
              key={data.id}
              country={data.country}
              buyPrice={data.buy}
              sellPrice={data.sell}
              flag={data.country_flag}
              t={t}
            />
          ))}
        </div>
      ))}
    </Marquee>
  );
};

export default Flags;
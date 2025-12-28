import { useTranslation } from "react-i18next";
import call from "../../assets/images/call.png";
import sms from "../../assets/images/sms.png";

const Complaints = ({ customerData }) => {
  const { t } = useTranslation();
  return (
    <div>
      {customerData?.data?.map((customer) => (
        <>
          <div className="flex items-center text-center gap-x-2">
            <div className="w-[3rem] h-[0.3rem] rounded-sm bg-secondary"></div>
            <p className="text-[1.8rem] font-[700] text-[#333333]">
              {customer.title}
            </p>
          </div>
          <p className="text-[#333333] font-[400] text-[1.2rem] leading-[2.5rem] mt-[2rem]">
            {customer.description}
          </p>
          <h1 className="text-[#000000] font-[700] text-[1.2rem] mt-[2rem]">
            {customer.sub_title}
          </h1>
          <div className="flex items-center gap-x-4 mt-[1rem]">
            <img className="w-[1.2rem]" src={call} />
            <p className="text-[1.1rem] font-[700] text-primary">
              <span>{t("موبايل")}: </span>
              <a className="underline" href={`tel:${customer.phone_number}`}>{customer.phone_number}</a>
            </p>
          </div>
          <div className="flex items-center gap-x-4 mt-[1rem]">
            <img className="w-[1.2rem]" src={sms} />
            <p className="text-[1.1rem] font-[700] text-primary">
              <span>{t("بريد إلكتروني")}: </span>
              <a className="underline" href={`mailto:${customer.email}`}>{customer.email}</a>
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Complaints;
import { useTranslation } from "react-i18next";
import { CiLocationOn } from "react-icons/ci";
import { TiLocation } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Branches = ({ branchData }) => {
  const navigate = useNavigate();
  const handleButtonClick = (branchId) => {
    navigate(`/branch/${branchId}`);
  };
  const {t} = useTranslation();
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-4 mt-[3rem]">
      {branchData?.data?.map((branch) => (
        <div className="w-[100%] lg:h-[10rem] border rounded-lg border-[#f0f0f0] px-[1rem] py-[1.5rem]">
          <div className="flex items-center gap-x-1">
            <icon className="text-primary text-[1.2rem]">
              <TiLocation />
            </icon>
            <p className="text-primary font-[700] lg:text-[1.2rem]">
              {branch.branch_name}
            </p>
          </div>
          <p className="text-[#333333] lg:text-[1.2rem] mt-[1rem] font-[700]">
            {branch.address}
          </p>
          <div className="flex justify-self-end mt-[1rem]">
            <button
              onClick={() => handleButtonClick(branch.id)}
              className="w-[7rem] h-[2.2rem] rounded-[0.5rem] text-white font-[700] text-[0.9rem] bg-primary"
            >
              {t('شاهد المزيد')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Branches;

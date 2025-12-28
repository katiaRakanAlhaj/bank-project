import { useNavigate } from "react-router-dom";

const FifthModel = ({ pageData ,dataKey , dataPage}) => {
  const navigate = useNavigate();

  const handleCardClick = (pageUrl) => {
    navigate(`/card/${pageUrl}`);
  };

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-[3.7rem]">
      {pageData?.[dataKey]?.map((item) =>
        item?.[dataPage]?.map((page) =>
            page.cards.map((card) => (
            <div
              key={card.id}
              className="w-[100%] h-[20rem] relative group cursor-pointer"
              onClick={() => handleCardClick(card.page_url)}
            >
              <div className="absolute inset-0 border border-white z-10"></div>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-500 transform group-hover:scale-105">
                  <div>
                    <img
                      className="bg-cover w-[100%] h-[100%] z-10"
                      src={card.image}
                      alt={card.title}
                    />
                  </div>
                  <div
                    className="absolute top-0 left-0 w-[100%] h-[100%]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                      zIndex: 2,
                    }}
                  />
                  <p className="absolute z-10 bottom-8 right-16 text-[#FFFFFF] text-[1.1rem] font-[700]">
                    {card.title}
                  </p>
                  <button className="absolute z-10 bottom-4 right-16">lsls</button>
                </div>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default FifthModel;
import { useNavigate } from "react-router-dom";

const FifthModelCard = ({ pageData }) => {
  const navigate = useNavigate();

  const handleCardClick = (pageUrl) => {
    if (pageUrl) {
      navigate(`/card/${pageUrl}`);
    }
  };

  // Destructure page object
  const { page } = pageData || {};
  const {  cards = [] } = page || {};

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-x-6 gap-y-6 mt-[3.7rem]">
      {cards.map((card) => (
        <div
          key={card.id}
          className="w-full h-[20rem] relative group cursor-pointer"
          onClick={() => handleCardClick(card.page_url)}
        >
          <div className="absolute inset-0 border border-white z-10"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-500 transform group-hover:scale-105">
              <img
                className="object-cover w-full h-full z-10"
                src={card.image}
                alt={card.title}
              />
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
                  zIndex: 2,
                }}
              />
              <p className="absolute z-10 bottom-8 right-16 text-white text-[1.1rem] font-bold">
                {card.title}
              </p>
              <button className="absolute z-10 bottom-4 right-16">Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FifthModelCard;

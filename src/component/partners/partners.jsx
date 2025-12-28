const Partners = ({partnersData}) => {
    return(
    <>
     {partnersData?.data?.map((partner)=>(
        <div key={partner.id} className="grid grid-cols-1 mt-[3.2rem]">
        <img className="w-[100%] h-[35rem] object-cover" src = {partner.image}/>
    </div>
     ))}
    </>
    )
}
export default Partners;
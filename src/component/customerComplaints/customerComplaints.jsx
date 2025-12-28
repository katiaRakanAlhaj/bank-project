import useFetchData from "../../hooks/useFetchData";
import Complaints from "./complaint";
import Form from "./Form";
const Complaintscustomer = ()=> {
  const {data:customerData} = useFetchData('Complaint')
    return(
        <div className="container mx-auto mt-[3rem]">
      <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-x-12">
      <div className="lg:col-span-12 md:col-span-8">
           <Complaints customerData={customerData}/>
           <Form/>
          </div>
        </div>
      </div>
    )
}
export default Complaintscustomer;
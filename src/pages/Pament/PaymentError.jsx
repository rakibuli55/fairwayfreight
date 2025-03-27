import { MdError } from "react-icons/md";

function PaymentError() {
  return (
    <section className="min-h-screen pt-[150px]  pb-[100px]">
      <div>
        <div className="w-[600px] max-md:w-[90%] mx-auto p-10 custom-xs:p-5 custom-xs:py-10 rounded-[16px] shadow-lg bg-white text-center">
          <div className="text-[60px] flex items-center justify-center text-red-500">
          <MdError />
          </div>
          <div className="mt-5">
            <h1 className="text-[30px] custom-sm:text-[24px] custom-xs:text-[24px] font-semibold">
              Something went wrong !
            </h1>
            <p className="text-[18px] w-[80%] custom-xs:text-base mx-auto mt-2">
              We can't able to complete you payment. Please try again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentError;

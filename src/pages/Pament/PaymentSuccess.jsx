import { FaCheckCircle } from "react-icons/fa";

function PaymentSuccess() {
  return (
    <section className="min-h-screen pt-[150px]  pb-[100px]">
      <div>
        <div className="w-[600px] max-md:w-[90%] mx-auto p-10 custom-xs:p-5 custom-xs:py-10 rounded-[16px] shadow-lg bg-white text-center">
          <div className="flex items-center justify-center">
            <p className="text-[60px] text-primaryGreen">
              <FaCheckCircle />
            </p>
          </div>
          <div className="mt-5">
            <h1 className="text-[30px] custom-sm:text-[24px] custom-xs:text-[24px] font-semibold">
              Your payment was successfull
            </h1>
            <p className="text-[18px] w-[80%] custom-xs:text-base mx-auto mt-2">
              Thank you for your payment. We will be in contact with more
              details shortly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentSuccess;

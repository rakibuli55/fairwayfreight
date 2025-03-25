import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Preloader from "../../assets/icons/preloader.svg";
import QuoteCard from "./QuoteCard";

const GetQuoteDialouge = ({
  isDialougeOpen,
  onClose,
  isLoading,
  quoteData,
  error,
}) => {
  const addressFrom = quoteData?.address_from;
  const addressTo = quoteData?.address_to;

  return (
    <Dialog open={isDialougeOpen} onOpenChange={() => onClose(false)}>
      <DialogContent className="max-w-[900px] p-10 max-h-[calc(100vh-70px)] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <h3 className="text-[24px] text-center font-semibold mb-6">
            Quick Quote
          </h3>
          {isLoading ? (
            <div>
              <img
                className="w-[100px] mx-auto"
                src={Preloader}
                alt="Preloader"
              />
            </div>
          ) : error ? (
            <p className="bg-red-500 py-3 px-4 text-white text-[18px] text-center mt-8">
              Thank you for your interest in shipping Fairway Freight does not
              currently offer that route through the website. Contact Customer
              Service for help in booking your shipment: 10XXXXXXXXX.
            </p>
          ) : (
            quoteData && (
              <div>
                {/* address  */}
                <div className="flex flex-wrap items-center gap-2 justify-center">
                  <p className="text-[18px] text-heading font-semibold text-center">
                    {quoteData.address_from.formated_address}
                  </p>
                  <span>
                    <FaArrowRightLong />
                  </span>
                  <p className="text-[18px] text-heading font-semibold text-center">
                    {quoteData.address_to.formated_address}
                  </p>
                </div>
                {quoteData.rates.length > 0 && quoteData.rates.length > 4 ? (
                  <>
                    {/* curiar */}
                    <div className="grid grid-cols-2 gap-4 mt-10">
                      {quoteData?.rates
                        ?.filter((rate) => {
                          return (
                            (rate.attributes &&
                              rate.attributes.includes("FASTEST")) ||
                            (rate.attributes &&
                              rate.attributes.includes("BEST")) ||
                            (rate.attributes &&
                              rate.attributes.includes("CHEAPEST"))
                          );
                        })
                        .map((rate, index) => (
                          <QuoteCard key={index} rate={rate} />
                        ))}
                    </div>
                    <Link
                      to={`/ship?address_from=${encodeURIComponent(
                        JSON.stringify(addressFrom)
                      )}&address_to=${encodeURIComponent(
                        JSON.stringify(addressTo)
                      )}`}
                      className="block w-full py-3 px-4 bg-primaryGreen text-white font-semibold text-[18px] text-center rounded-[8px] !mt-10"
                    >
                      Start Shipping
                    </Link>
                  </>
                ) : (
                  quoteData?.rates > 0 && (
                    <>
                      <div className="grid grid-cols-2 gap-4 mt-10">
                        {quoteData?.rates.map((rate, index) => (
                          <QuoteCard key={index} rate={rate} />
                        ))}
                      </div>
                      <Link
                        to={`/ship?address_from=${encodeURIComponent(
                          JSON.stringify(addressFrom)
                        )}&address_to=${encodeURIComponent(
                          JSON.stringify(addressTo)
                        )}`}
                        className="block w-full py-3 px-4 bg-primaryGreen text-white font-semibold text-[18px] text-center rounded-[8px] !mt-10"
                      >
                        Start Shipping
                      </Link>
                    </>
                  )
                )}
                {quoteData.rates.length === 0 && (
                  <p className="bg-red-500 py-3 px-4 text-white text-[18px] text-center mt-8">
                    Thank you for your interest in shipping from{" "}
                    {quoteData.address_from.formated_address} to{" "}
                    {quoteData.address_to.formated_address}. Fairway Freight
                    does not provide any rate for this route through the website.Please try again or 
                    Contact Customer Service for help in booking your shipment:
                    10XXXXXXXXX.
                  </p>
                )}
              </div>
            )
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GetQuoteDialouge;

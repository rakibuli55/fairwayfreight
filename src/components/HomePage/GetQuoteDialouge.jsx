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

  let selectedItems = [];

  quoteData?.rates?.forEach((item) => {
    if (
      item.attributes?.includes("BESTVALUE") ||
      item.attributes.includes("CHEAPEST") ||
      item.attributes.includes("FASTEST")
    ) {
      selectedItems.push(item);
    }
    if (selectedItems.length === 4) {
      return;
    }
  });

  if (selectedItems.length < 4) {
    let remainingItems = quoteData?.rates
      .filter((item) => !selectedItems.includes(item))
      .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));

    remainingItems?.forEach((item) => {
      if (selectedItems.length < 4) {
        selectedItems.push(item);
      }
    });
  }

  return (
    <Dialog open={isDialougeOpen} onOpenChange={() => onClose(false)}>
      <DialogContent className="max-w-[900px] max-md:max-w-[95%] max-md:p-5 p-10 max-h-[calc(100vh-70px)] overflow-y-auto overflow-x-hidden rounded-[12px]">
        <DialogHeader>
          <h3 className="text-[24px] text-center font-semibold mb-6 custom-xs:text-[22px]">
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
                <div className="flex flex-wrap items-center gap-2 justify-center custom-xs:w-[90%] custom-xs:mx-auto">
                  <p className="text-[18px] text-heading font-semibold text-center custom-sm:text-base custom-sm:text-left custom-xs:text-base">
                    {quoteData.address_from.formated_address}
                  </p>
                  <span className="custom-xs:rotate-[90deg]">
                    <FaArrowRightLong />
                  </span>
                  <p className="text-[18px] text-heading font-semibold text-center custom-sm:text-base custom-sm:text-left custom-xs:text-base">
                    {quoteData.address_to.formated_address}
                  </p>
                </div>
                {quoteData.rates.length > 0 && quoteData.rates.length > 4 ? (
                  <>
                    {/* curiar */}
                    <div className="grid grid-cols-2 gap-4 mt-10 custom-sm:grid-cols-1 custom-xs:grid-cols-1">
                      {selectedItems?.map((item, index) => (
                        <QuoteCard key={index} rate={item} />
                      ))}
                    </div>
                    <Link
                      to={`/ship?address_from=${encodeURIComponent(
                        JSON.stringify(addressFrom)
                      )}&address_to=${encodeURIComponent(
                        JSON.stringify(addressTo)
                      )}`}
                      className="block w-full py-3 px-4 bg-primaryGreen text-white font-semibold text-[18px] text-center rounded-[8px] mt-10 custom-sm:mt-6 custom-xs:mt-5 custom-xs:py-[10px] custom-xs:text-base"
                    >
                      Start Shipping
                    </Link>
                  </>
                ) : (
                  quoteData?.rates?.length < 4 &&
                  quoteData?.rates?.length > 0 && (
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
                        className="block w-full py-3 px-4 bg-primaryGreen text-white font-semibold text-[18px] text-center rounded-[8px] custom-sm:!mt-6 !mt-10"
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
                    does not provide any rate for this route through the
                    website.Please try again or Contact Customer Service for
                    help in booking your shipment: 10XXXXXXXXX.
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

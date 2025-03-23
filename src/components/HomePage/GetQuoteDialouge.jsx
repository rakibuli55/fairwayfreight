import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { FaArrowRightLong } from "react-icons/fa6";
import Preloader from "../../assets/icons/preloader.svg";

const GetQuoteDialouge = ({
  isDialougeOpen,
  onClose,
  isLoading,
  quoteData,
  error,
}) => {
  return (
    <Dialog open={isDialougeOpen} onOpenChange={() => onClose(false)}>
      <DialogContent className="max-w-[900px] p-10">
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
            <div className="text-red-500 text-center">
              <p>{error}</p>
            </div>
          ) : (
            quoteData && (
              <div>
                {/* address  */}
                <div className="flex items-center gap-2 justify-center">
                  <p className="text-[18px] text-heading font-semibold text-center">
                    {quoteData.address_from.city}
                  </p>
                  <span>
                    <FaArrowRightLong />
                  </span>
                  <p className="text-[18px] text-heading font-semibold text-center">
                    {quoteData.address_to.city}
                  </p>
                </div>
              </div>
            )
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GetQuoteDialouge;

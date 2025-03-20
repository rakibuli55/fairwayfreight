import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import Preloader from "../../assets/icons/preloader.svg"

const GetQuoteDialouge = ({isDialougeOpen, onClose, isLoading, quoteData}) => {
  return (
    <Dialog open={isDialougeOpen} onOpenChange={() => onClose(false)}>
      <DialogContent className="max-w-[900px]">
        <DialogHeader>
          {
            isLoading ? (
                <div>
                    <img src={Preloader} alt="Preloader" />
                </div>
            ) : (<p>Data</p>)
          }
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GetQuoteDialouge;

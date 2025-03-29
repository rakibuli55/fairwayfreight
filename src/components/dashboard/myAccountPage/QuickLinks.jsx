import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const QuickLinks = () => {
  const navigate = useNavigate();
  const handleChange = (value) => {
    if (value === "changePassword") {
      navigate('/dashboard/change-password');
    } else if (value === "updateInformation") {
      navigate('/dashboard/update-information');
    }
  };
  return (
    <div className="flex custom-xs:block items-center gap-2 custom-xl:mt-10 custom-lg:mt-10 max-md:mt-6">
      <p className="text-[18px] text-heading custom-xs:mb-3">Quick links: </p>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[240px] h-[52px] text-base text-heading focus:ring-0">
          <SelectValue placeholder="Select a quick link" />
        </SelectTrigger>
        <SelectContent className="bg-primaryGreen">
          <SelectItem value="changePassword" className="text-base text-white">Change Password</SelectItem>
          <SelectItem value="updateInformation" className="text-base text-white">Update Personal Information</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default QuickLinks;

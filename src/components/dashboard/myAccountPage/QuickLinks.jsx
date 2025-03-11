import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QuickLinks = () => {
  return (
    <div className="flex items-center gap-2">
      <p className="text-[18px] text-heading">Quick links: </p>
      <Select>
        <SelectTrigger className="w-[240px] h-[52px] text-base text-heading focus:ring-0">
          <SelectValue placeholder="Select a quick link" />
        </SelectTrigger>
        <SelectContent className="bg-primaryGreen">
          <SelectItem value="changePassword" className="text-base text-white">Change Password</SelectItem>
          <SelectItem value="ypdateInformation" className="text-base text-white">Update Personal Information</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default QuickLinks;

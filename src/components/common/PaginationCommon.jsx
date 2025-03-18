import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationCommon = ({ currentPage, lastPage, onPerChnage }) => {

  const handlePrevious = () => {
    console.log('prev');
    if (currentPage > 1) {
      onPerChnage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < lastPage) {
      onPerChnage(currentPage + 1);
      console.log('next');
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevious} />
        </PaginationItem>
        {Array.from({ length: lastPage }, (_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink
              className="pagination--link"
              href="#"
              isActive={currentPage === index + 1}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCommon;

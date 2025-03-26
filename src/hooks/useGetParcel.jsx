const useGetParcel = (formValues, bagSizeData) => {
  const parcels = [];

  if (formValues.golfBags && formValues.golfBags.length > 0) {
    formValues.golfBags.forEach((golfbag) => {
      if (golfbag.size) {
        const matchedBag = bagSizeData.find(
          (bag) => bag.bag_size === golfbag.size
        );

        if (matchedBag) {
          parcels.push({
            mass_unit: matchedBag.mass_unit,
            weight: matchedBag.weight,
            distance_unit: matchedBag.distance_unit,
            height: matchedBag.height,
            length: matchedBag.length,
            width: matchedBag.width,
            extra: {
                insurance: {
                  amount: golfbag.insurance || "0",
                  currency: "USD",
                }
              }
          });
        }
      }
    });
  }
  if (formValues.luggageBags && formValues.luggageBags.length > 0) {
    formValues.luggageBags.forEach((luggageBag) => {
      if (luggageBag.size) {
        const matchedBag = bagSizeData.find(
          (bag) => bag.bag_size === luggageBag.size
        );

        if (matchedBag) {
          parcels.push({
            mass_unit: matchedBag.mass_unit,
            weight: matchedBag.weight,
            distance_unit: matchedBag.distance_unit,
            height: matchedBag.height,
            length: matchedBag.length,
            width: matchedBag.width,
            extra: {
                insurance: {
                  amount: luggageBag.insurance || "0",
                  currency: "USD",
                }
              }
          });
        }
      }
    });
  }


  return {parcels}
};

export default useGetParcel;

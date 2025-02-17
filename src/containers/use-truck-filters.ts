import { useState } from "react";

export const useTruckFilters = () => {
  const [filters, setFilters] = useState({
    licensePlate: "",
    trackerSerialNumber: "",
    maxDistance: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const handleSearch = () => setAppliedFilters(filters);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    const clearedFilters = {
      licensePlate: "",
      trackerSerialNumber: "",
      maxDistance: "",
    };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  return {
    filters,
    setFilters,
    appliedFilters,
    handleSearch,
    handleKeyDown,
    handleClear,
  };
};

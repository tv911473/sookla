import { useState } from "react";
import { Button } from "../ui/button";

interface UserFilterProps {
  onFilterChange: (selected: string[]) => void;
  isLoggedInFilter: boolean;
}

export default function UserFilter({ onFilterChange }: UserFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterSelect = (filter: string, checked: boolean) => {
    let updatedFilters = [...selectedFilters];

    if (checked) {
      if (!updatedFilters.includes(filter)) {
        updatedFilters.push(filter);
      }
    } else {
      updatedFilters = updatedFilters.filter((item) => item !== filter);
    }

    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button onClick={toggleDropdown} size="sm" variant={"filterb"}>
        Vali enda filter
      </Button>

      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg w-56 p-4 z-10 border">
          <form>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="liked"
                value="liked"
                checked={selectedFilters.includes("liked")}
                onChange={(event) =>
                  handleFilterSelect("liked", event.target.checked)
                }
                className="mr-2 accent-red-600"
              />
              <label
                htmlFor="liked"
                className="text-red-500 cursor-pointer hover:text-red-700"
              >
                Meeldivad retseptid
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="followed"
                value="followed"
                checked={selectedFilters.includes("followed")}
                onChange={(event) =>
                  handleFilterSelect("followed", event.target.checked)
                }
                className="mr-2 accent-red-600"
              />
              <label
                htmlFor="followed"
                className="text-red-500 cursor-pointer hover:text-red-700"
              >
                Jälgitavate kasutajate retseptid
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

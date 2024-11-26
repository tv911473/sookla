import { useState } from "react";
import { Button } from "../ui/button";

interface UserFilterProps {
  onFilterChange: (selected: string[]) => void;
  isLoggedIn: boolean;
}

export default function UserFilter({ onFilterChange }: UserFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);



  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterSelect = (filter: string, checked: boolean) => {
    let updatedFilters = [...selectedFilters];

    if (checked) {
      if (!updatedFilters.includes(filter)) {
        updatedFilters.push(filter);
      }
    } else {
      updatedFilters = updatedFilters.filter((item) => item !== filter);
    }

    console.log("Selected Filters:", updatedFilters);
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  return (
    <div className="relative mt-20">
      <Button onClick={toggleDropdown} size="sm" variant={"default"}>
        Vali enda filter
      </Button>

      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg w-48 p-4 z-10 border">
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
                className="mr-2"
              />
              <label htmlFor="liked" className="text-gray-700">
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
                className="mr-2"
              />
              <label htmlFor="followed" className="text-gray-700">
                Jälgitavate kasutajate retseptid
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

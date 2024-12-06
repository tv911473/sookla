import { useState } from "react";
import { Button } from "../ui/button";

interface CategoryFilterProps {
  onCategoryChange: (selected: string[]) => void;
  categories: { category_name: string }[];
}

export default function CategoryFilter({
  onCategoryChange,
  categories,
}: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    let updatedCategories = [...selectedCategories];

    if (checked) {
      if (!updatedCategories.includes(category)) {
        updatedCategories.push(category);
      }
    } else {
      updatedCategories = updatedCategories.filter((cat) => cat !== category);
    }

    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      <Button onClick={toggleDropdown} size="sm" variant={"filterb"}>
        Vali kategooria
      </Button>

      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg w-48 p-4 z-10 border">
          <form>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={category.category_name}
                    checked={selectedCategories.includes(
                      category.category_name
                    )}
                    onChange={(event) =>
                      handleCategoryChange(
                        category.category_name,
                        event.target.checked
                      )
                    }
                    className="mr-2 accent-red-600"
                  />
                  <label
                    htmlFor={category.category_name}
                    className="text-black-700 cursor-pointer text-red-500 hover:text-red-700"
                  >
                    {category.category_name}
                  </label>
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

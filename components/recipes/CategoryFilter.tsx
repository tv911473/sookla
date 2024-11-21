import { useState } from "react";
import { Button } from "../ui/button";

interface CategoryFilterProps {
    onFilterChange: (selected: string[]) => void;
    categories: { category_name: string }[];
  }

export default function CategoryFilter({
    onFilterChange,
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
    onFilterChange(updatedCategories);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }; 
  return (
    <div className="relative mt-20">
        <Button onClick = {toggleDropdown} size="sm" variant={"default"}>Vali kategooria</Button> 

      {isOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg w-48 p-4 z-10 border">
          <form>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={category.category_name}
                  onChange={(event) =>
                    handleCategoryChange(category.category_name, event.target.checked)
                  }
                  className="mr-2"
                />
                <label htmlFor={category.category_name} className="text-gray-700">
                  {category.category_name}
                </label>
              </div>
            ))}
          </form>
        </div>
      )}
    </div>
  );
}

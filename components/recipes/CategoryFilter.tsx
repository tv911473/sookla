import { useState } from "react";

interface CategoryFilterProps {
    onFilterChange: (selected: string[]) => void;
    categories: { category_name: string }[];
  }

export default function CategoryFilter({
    onFilterChange,
    categories,
  }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
  return (
    <div>
      <form>
        {categories.map((category, index) => (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                id={category.category_name}
                onChange={(event) =>
                  handleCategoryChange(category.category_name, event.target.checked)
                }
              />
              {category.category_name}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

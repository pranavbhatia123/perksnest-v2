import { useState, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { dealsData } from "@/data/deals";

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  subcategories?: SubCategory[];
}

const categoryTemplates: Omit<Category, 'count'>[] = [
  { id: "all", name: "All deals" },
  { id: "ai", name: "AI" },
  { id: "project", name: "Project Management" },
  { id: "data", name: "Data & Cloud" },
  { id: "customer", name: "Customer" },
  { id: "development", name: "Development" },
  { id: "marketing", name: "Marketing" },
  { id: "finance", name: "Finance" },
  { id: "communication", name: "Communication" },
  { id: "sales", name: "Sales" },
];

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategorySidebar = ({ activeCategory, onCategoryChange }: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["project"]);

  // Calculate real counts from deals data
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: dealsData.length };
    dealsData.forEach(deal => {
      counts[deal.category] = (counts[deal.category] || 0) + 1;
    });
    return counts;
  }, []);

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="w-64 shrink-0">
      <div className="sticky top-24">
        <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
        
        <nav className="space-y-1">
          {categoryTemplates.map((template) => {
            const count = categoryCounts[template.id] || 0;
            const category = { ...template, count };
            return (
            <div key={category.id}>
              <button
                onClick={() => {
                  if (category.subcategories) {
                    toggleExpanded(category.id);
                  }
                  onCategoryChange(category.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeCategory === category.id
                    ? "bg-secondary font-medium text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  {category.subcategories && (
                    <span className="text-muted-foreground">
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </span>
                  )}
                  {!category.subcategories && category.id === "all" && (
                    <span className="w-2 h-2 rounded-full bg-foreground" />
                  )}
                  <span>{category.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{category.count}</span>
              </button>
              
              {/* Subcategories */}
              {category.subcategories && expandedCategories.includes(category.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => onCategoryChange(sub.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        activeCategory === sub.id
                          ? "bg-secondary font-medium text-foreground"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
          })}
        </nav>
      </div>
    </div>
  );
};

export default CategorySidebar;

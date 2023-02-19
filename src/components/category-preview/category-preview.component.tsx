import ProductCard from "../product-card/product-card.component";
import {
  CategiryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";

import { FC } from "react";

import { Category } from "../../store/categories/category.types";

export type CategoryPreviewProps = Category;

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, items }) => {
  return (
    <CategiryPreviewContainer>
      <Title to={title}>{title.toUpperCase()}</Title>
      <Preview>
        {items
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategiryPreviewContainer>
  );
};

export default CategoryPreview;

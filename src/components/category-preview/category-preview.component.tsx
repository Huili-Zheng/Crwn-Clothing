import ProductCard from "../product-card/product-card.component";
import {
  CategiryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";

import { FC } from "react";

import { CategoryItem } from "../../store/categories/category.types";

export type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
  return (
    <CategiryPreviewContainer>
      <Title to={title}>{title.toUpperCase()}</Title>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategiryPreviewContainer>
  );
};

export default CategoryPreview;

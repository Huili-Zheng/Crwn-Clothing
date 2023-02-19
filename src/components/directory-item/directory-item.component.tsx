import {
  DirectoryItemContainer,
  Body,
  BackgroundImage,
} from "./directory-item.styles";

import { CategoryDescription } from "../../store/categories/category.types";

import { useNavigate } from "react-router-dom";
import { FC } from "react";

export type DirectoryItemProps = {
  category: CategoryDescription;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { imageUrl, title } = category;
  const navigate = useNavigate();
  const goToCategoryHandler = () => {
    navigate(`/shop/${title}`);
  };

  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body onClick={goToCategoryHandler}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

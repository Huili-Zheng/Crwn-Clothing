import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles";
import { Fragment, useEffect, useState } from "react";
import { getCategoryDescriptionAndDocuments } from "../../utils/firebase/firebase.utils";

import { CategoryDescription } from "../../store/categories/category.types";

export type CategoryDescriptionMap = Record<string, CategoryDescription[]>;
const Directory = () => {
  const [categoryDescriptionMap, setCategoryDescriptionMap] =
    useState<CategoryDescriptionMap>({});

  useEffect(() => {
    const getCategoryDescriptionMap = async () => {
      const newCategoryDescriptionMap =
        await getCategoryDescriptionAndDocuments();
      setCategoryDescriptionMap(newCategoryDescriptionMap);
    };
    getCategoryDescriptionMap();
  }, []);
  console.log(categoryDescriptionMap);

  return (
    <DirectoryContainer>
      {Object.keys(categoryDescriptionMap).map((title) => {
        console.log(categoryDescriptionMap[title]);
        return (
          <Fragment key={title}>
            {categoryDescriptionMap[title].map((category) => (
              <DirectoryItem key={category.id} category={category} />
            ))}
          </Fragment>
        );
      })}
    </DirectoryContainer>
  );
};

export default Directory;

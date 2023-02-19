import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles";
import { Fragment, useEffect, useState } from "react";
import { getCategoryDescriptionAndDocuments } from "../../utils/firebase/firebase.utils";

const Directory = () => {
  const [categoryDescriptionMap, setCategoryDescriptionMap] = useState({});

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
          <Fragment>
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

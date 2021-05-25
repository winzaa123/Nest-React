import React, {useState,useEffect} from 'react'

import  {getAll as CategorieLists} from "../services/CategorieService";


const CategorieSelect  = (props : any) => {
    const [categories, setCategories] = useState([]);

    // const [valueInput, setValue] = useState(value);

    useEffect(() => {
        loadCategories();
      }, []);

    const loadCategories = () => {
        CategorieLists()
          .then(response => {
            setCategories(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };
      return (
        <select  {...props}   className="form-control">
              <option value="">Please select</option>
            {categories.map((categorie : any) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.name}
              </option>
            ))}
          </select>
      )

    //   const input = <select  {...props}   className="form-control" onChange={e => {
    //     setValue(e.currentTarget.value)
    //   }} >
    //     <option value="">Please select</option>
    //   {categories.map((categorie) => (
    //     <option key={categorie.id} value={categorie.id}>
    //       {categorie.name}
    //     </option>
    //   ))}
    // </select>


    //   return [valueInput, input ];

}
export default  CategorieSelect
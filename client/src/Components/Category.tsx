import { FC} from "react";
import { Card } from "./Card";
import { CategoryType } from "../Types/Category";
import "./Category.css"
import { useRemoveCategoryMutation } from "../redux/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
interface Props {
    category: CategoryType
}
export const Category: FC<Props> = ({ category }) => {
    const [removeCategory, data] = useRemoveCategoryMutation()

    const handleRemove = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        removeCategory(category.id)
    }
    return (
        <Card vertical={false} to={category.id} bg={category.color}>
            <h4 className="fit-content">{category.name}</h4>
            <button className="fit-content"
            onClick={handleRemove}>
                <FontAwesomeIcon icon={faTrash}/>
            </button>
        </Card>
    )
}
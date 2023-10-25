import {useState} from "react";

interface useTablePaginatorProps{
    currentPage:number,
    pages:number
}
export const useTablePaginator = ({currentPage, pages}:useTablePaginatorProps) => {

    const [requiredPage, setRequiredPage] = useState(1);

    const handleNextPage = () =>{

        if(currentPage === pages){
            return currentPage;
        }
        setRequiredPage(currentPage+1);
    }

    const handlePreviousPage = () =>{
        if(currentPage === 1){
            return currentPage
        }
        setRequiredPage(currentPage-1);
    }

    const handleTargetPage = (targetPage:number) => {
        setRequiredPage(targetPage);
    }

    return{
        requiredPage,
        handleNextPage,
        handlePreviousPage,
        handleTargetPage
    }


}
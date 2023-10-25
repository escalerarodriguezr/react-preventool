
export interface TablePaginatorPros {
    total: number,
    currentPage: number,
    pages: number,
    handlePreviousPage: ()=>void,
    handleNextPage: ()=>void
    handleTargetPage: (targetPage:number)=>void
}
export const TablePaginator = (props:TablePaginatorPros)=>{

    const {total, pages, currentPage, handlePreviousPage, handleNextPage, handleTargetPage} = props

    return (
        <>

            <p className="card-title-desc">Total: {total} | Viendo página {currentPage} de {pages} </p>

            {
                pages != 1 &&
                <nav aria-label="Page navigation example">
                    <ul className="pagination">


                        <li className="page-item"
                            onClick={handlePreviousPage}
                        >


                                        <span className="page-link cursor-pointer" >
                                            Previous
                                        </span>
                        </li>

                        {
                            Array.from(Array(pages).keys()).map((cPage) =>{

                                    if((cPage+1 == currentPage) ||
                                        (cPage+1) == currentPage+1 ||
                                        (cPage+1) == currentPage+2 ||
                                        (cPage+1) == currentPage-1 ||
                                        (cPage+1) == currentPage-2 ||
                                        (cPage+1) == 1 ||
                                        (cPage+1) == pages
                                    ) {
                                        return (
                                            <li
                                                key={cPage+1}
                                                className={
                                                    'page-item cursor-pointer'
                                                    +
                                                    ((cPage+1)===currentPage
                                                        ? " active"
                                                        : "")
                                                }
                                                onClick={()=>handleTargetPage(cPage+1)}
                                            >
                                                            <span className="page-link" >
                                                                {cPage+1}
                                                            </span>
                                            </li>
                                        );
                                    }

                                }
                            )
                        }
                        <li className="page-item cursor-pointer"
                            onClick={handleNextPage}
                        >
                                        <span className="page-link">
                                            Next
                                        </span>
                        </li>
                    </ul>
                </nav>
            }
        </>
        )


}
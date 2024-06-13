import { useState } from "react";

const ELEM_PER_PAGE = 5

function List({data, renderData}: {data: any, renderData: any}) {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const lastIndex = currentPage * ELEM_PER_PAGE;
    const firstIndex = lastIndex - ELEM_PER_PAGE;

    const dataPerPage= data.slice(firstIndex, lastIndex)

    function decPage() {
        if(currentPage <= 1) return 
        setCurrentPage(currentPage - 1 )
    }

    function incPage(){
        if(!data[lastIndex]) return
        setCurrentPage(currentPage + 1 )
    } 

    return( 
        <div>
            <div className="row col-12 mb-3">
                <span  className=" col-4 text-center" style={ {cursor: 'pointer'}} onClick={decPage}>{'<'}</span>
                <span className=" col-4 text-center">{currentPage}</span>
                <span className=" col-4 text-center"  style={ {cursor: 'pointer'}} onClick={incPage}>{'>'}</span>
            </div>
            <div>
                {renderData(dataPerPage)}
            </div>
        </div>)
}

export default List;
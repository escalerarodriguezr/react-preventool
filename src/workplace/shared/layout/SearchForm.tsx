export const SearchForm = () => {
    return(
        <>
            <form className="app-search d-none d-lg-block">
                <div className="position-relative">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={"Search" + "..."}
                    />
                    <span className="bx bx-search-alt"></span>
                </div>
            </form>

        </>
    )
}
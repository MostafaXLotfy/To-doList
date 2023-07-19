import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Search.css"
import React, { useState } from "react"

export const Search = () => {

    const [searchTextChange, setSearchText] = useState('')

    const handleOnSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }


    return (
        <div className="search-input">
            <input type="search" value={searchTextChange} onChange={handleOnSearchTextChange} />
            <div className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}
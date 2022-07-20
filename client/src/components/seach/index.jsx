import React from 'react'
// import './index.css'
import {FaSearch} from "react-icons/all";

const Search = () => {


    return(

        <div className='seach-container'>
            <input className='input-search' type="text" name='search' />
            <div>
                <button className='input-searh-button'><FaSearch /></button>
            </div>
        </div>

    )
}
export default Search;
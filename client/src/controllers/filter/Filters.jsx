import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { filterCountries } from "../../redux/actions"

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilter = (event) => {
        const value = event.target.value;

        dispatch(filterCountries(value))
    }


    return (
        <div>
            <select onChange={handleFilter}>
                <option value="All">Todos</option>
                <option value="South America">America</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctica">Antartida</option>
            </select>
        </div>
    )
}

export default Filter
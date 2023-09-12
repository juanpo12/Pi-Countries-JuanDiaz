import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterCountries, filterActvities } from "../../redux/actions"
import style from '../cards/Cards.module.css'

const Filter = () => {
    const dispatch = useDispatch()
    const [momentRegion, setMomentRegion] = useState('All')

    const { countriesActivitiesFiltered } = useSelector(state => state)
    const allActivities = useSelector(state => state.activitiesFilter)

    // const { countriesActivitiesFiltered } = useSelector(state => state)

    const optionActivities = allActivities.map(activity => {
        return <option key={activity.id} value={activity.id}>{activity.nombre}</option>
    })

    const handleFilterActivities = (event) => {
        const value = event.target.value;
        dispatch((filterActvities(value)))
    }

    const continents = ['South America', 'Africa', 'Europe', 'Asia', 'Oceania', 'Antarctica', 'North America'].map((continent) => {
        return <option key={continent} value={continent}>{continent}</option>
    })




    const handleFilter = (event) => {
        const value = event.target.value;

        setMomentRegion(value)
        dispatch(filterCountries(value))
    }

    return (
        <div className={style.filter}>
            <div className={style.selectFilter}>
                <select value={momentRegion} onChange={handleFilter}>
                    {/* {continents} */}
                    <option value="All">Todos</option>
                    <option value="South America">America</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antartida</option>
                </select>
            </div>
            <div className={style.select}>
                <select onChange={handleFilterActivities}>
                    <option>Seleccione una actividad</option>
                    {optionActivities}
                </select>
            </div>
        </div>

    )
}

export default Filter
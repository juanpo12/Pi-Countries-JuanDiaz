import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterCountries, filterActvities, orderPopulation, orderAlphabetical, orderCards } from "../../redux/actions"
import style from '../cards/Cards.module.css'

const Filter = () => {
    const dispatch = useDispatch()
    const [momentRegion, setMomentRegion] = useState('All')
    const {orderPage} = useSelector(state => state)

    const allActivities = useSelector(state => state.activitiesFilter)

    const optionActivities = allActivities.map(activity => {
        return <option key={activity.id} value={activity.id}>{activity.nombre}</option>
    })

    const orderAll = () => {
        switch (orderPage) {
            case "A":
            case "D":
              dispatch(orderCards(orderPage));
              break;
      
            case "P":
              dispatch(orderPopulation(orderPage));
              break;
      
            case "O":
              dispatch(orderAlphabetical(orderPage));
              break;
      
            default:
              break;
          }
    }

    const handleFilterActivities = (event) => {
        const value = event.target.value;
        dispatch((filterActvities(value)))
        orderAll()
        handleFilter({target: {value: momentRegion}})
    }

    const handleFilter = (event) => {
        const value = event.target.value;

        setMomentRegion(value)
        dispatch(filterCountries(value))
        orderAll()
    }


    return (
        <div className={style.filter}>
            <div className={style.selectFilter}>
                <select value={momentRegion} onChange={handleFilter}>
                    <option value="All">Todos</option>
                    <option value="South America">Sur America</option>
                    <option value="North America">Norte America</option>
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
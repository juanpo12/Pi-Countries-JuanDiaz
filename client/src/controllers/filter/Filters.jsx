import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterCountries, filterActvities } from "../../redux/actions"

const Filter = () => {
    const dispatch = useDispatch()

    const allActivities = useSelector(state => state.activitiesFilter)
    console.log(allActivities);

    const optionActivities = allActivities.map(activity => {
        return <option key={activity.id} value={activity.id}>{activity.nombre}</option>
    })

    const handleFilterActivities = (event) => {
        const value = event.target.value;
        dispatch((filterActvities(value)))
    }



    const [momentActivities, setMomentActivities] = useState([])
    const [momentRegion, setMomentRegion] = useState('All')


    const handleFilter = (event) => {
        const value = event.target.value;

        setMomentRegion(value)
        dispatch(filterCountries(value))
    }

    useEffect(() => {
        localStorage.setItem("momentRegion", momentRegion);
    }, [momentRegion]);

    // useEffect(() => {
    //     const savedRegion = localStorage.getItem("momentRegion");
    //     if (savedRegion) {
    //         setMomentRegion(savedRegion);
    //         dispatch(filterCountries(savedRegion));
    //     }
    // }, [dispatch]);




    return (
        <div>
            <select value={momentRegion} onChange={handleFilter}>
                <option value="All">Todos</option>
                <option value="South America">America</option>
                <option value="Africa">Africa</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctica">Antartida</option>
            </select>
            <div>
                <select onChange={handleFilterActivities}>
                    <option>Seleccione una actividad</option>
                    {optionActivities}
                </select>
            </div>
        </div>

    )
}

export default Filter
import React from "react"

const Filter = () => {



    return (
        <>
        <div>
            <button onClick={() => setContinentFilter("Todos")}>Todos los continentes</button>
            <button onClick={() => setContinentFilter("Asia")}>Asia</button>
            <button onClick={() => setContinentFilter("América")}>América</button>

        </div>

        <div>
            <button onClick={() => setActivityFilter("Todas")}>Todas las actividades</button>
            <button onClick={() => setActivityFilter("pepito")}>Playa</button>
            <button onClick={() => setActivityFilter("pepita")}>Montaña</button>

        </div>
        
        </>

    )

}

export default Filter
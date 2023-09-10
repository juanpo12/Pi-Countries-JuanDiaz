import { Link } from "react-router-dom"
import  './Landing.css'

const LandingPage = () => {

    return (

        <div className='container'>

            <div className='boxButton'>
                <h1>Bienvenido</h1>
                <Link to={'/home'}><button className='button button1'>Ingresar</button></Link>
            </div>
        </div>

    )
}

export default LandingPage;
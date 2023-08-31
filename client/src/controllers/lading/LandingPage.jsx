import { Link } from "react-router-dom"

const LandingPage = () => {

    return (
        <div>
            <Link to={'/home'}><button>Ingresar</button></Link>
        </div>
    )
}

export default LandingPage;
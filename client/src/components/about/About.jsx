import './About.css'

const About = () => {
    
    return (
        <div className="about2">
            <div className='containerDivAbout'>
                <div className='description'>
                    <h1>Juan José Diaz</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi laboriosam dolorum quisquam provident aliquid, harum possimus iusto delectus molestias adipisci, culpa quas exercitationem nulla consectetur non nihil consequatur repellat voluptates.</p>
                    <div className='icons'>
                        <a href="https://www.linkedin.com/in/juan-jos%C3%A9-diaz-45436b269/"><p className='linkedin'/></a>
                        <a href="https://github.com/juanpo12"><p className='github'/></a>
                    </div>
                </div>
                <div className="imagen"></div>
            </div>
        </div>
    )
}

export default About
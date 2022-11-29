import about from '../../img/about.png';


const About = () => {
    return (
        <div className="container bg-white pt-5">
            <div className="row px-3 pb-5">
                <div className="col-md-12">
                    <h2 className="mb-4 font-weight-bold">Software engineer with 13 years of experience</h2>
                    <img className="img-fluid float-left w-50 mr-4 mb-3" src={about} alt="About Image" />
                    <p className="m-0">
                        Takimata lorem et ut et diam amet dolor gubergren, amet dolor eirmod sea sea invidunt, sed no sed diam ipsum ut et. Sit nonumy est ut consetetur sed, labore dolor ipsum sed ea dolor lorem erat et erat, consetetur sed labore duo voluptua rebum sed gubergren. Dolores nonumy sanctus erat clita stet sed, dolore justo diam eos aliquyam diam. Clita nonumy rebum dolor dolor eos takimata labore diam sed, et voluptua et invidunt sanctus, elitr dolor nonumy tempor dolor elitr lorem no dolor ipsum, ut at gubergren dolor est aliquyam stet, et sea takimata rebum labore erat duo invidunt lorem. At takimata stet diam dolore accusam, kasd at diam aliquyam diam sed est dolor takimata. Sadipscing rebum diam ea et tempor, eirmod et et invidunt voluptua et dolor sit. Labore labore clita et amet sea sit et, est ipsum eirmod amet voluptua dolore, diam eirmod kasd lorem gubergren clita at amet, sea accusam vero amet lorem eos sed diam sit amet, nonumy ipsum et tempor magna dolores aliquyam vero eos ipsum. Ipsum ipsum sadipscing diam aliquyam diam et ipsum eos vero, gubergren magna elitr elitr clita dolor. Aliquyam vero sed sanctus sed dolore sanctus elitr no amet, ea magna ipsum.
                    </p>
                </div>
                <div className="col-md-12 pt-4">
                    <div className="d-flex flex-column skills">
                        <div className="progress w-100 mb-4">
                            <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: '80%'}}>Storytelling</div>
                        </div>
                        <div className="progress w-100 mb-4">
                            <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style={{width :'90%'}}>Team leading</div>
                        </div>
                        <div className="progress w-100">
                            <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>Programming</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;


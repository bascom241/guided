
import InstructorHero from '../InstructorComponents/InstructorHero'
import Reasons from '../InstructorComponents/Reasons'
import GettingStarted from '../InstructorComponents/GettingStarted'
import StatsBanner from '../InstructorComponents/StatsBanner'
import Banner from '../InstructorComponents/Banner'
const InstructorHome = () => {
    return (
        <div>
            <InstructorHero />
            <Reasons/>
            <StatsBanner/>
            <GettingStarted/>
            <Banner/>
           
        </div>
    )
}

export default InstructorHome

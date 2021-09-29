import Splash from "../components/generic/splash/splash";
import PageLayout from "../layouts/PageLayout";
import PageTitle from "../components/generic/titles/page-title";
import {CMS_NAME} from "../lib/constants";
import PersonCard from "../components/generic/cards/person-card";

const pageContext = {
    title: `About`,
    heading: `About ${CMS_NAME}`
}
const persons = [
    {
        name: "Juan dela Cruz",
        position: "President"
    },
    {
        name: "Pedro dela Cruz",
        position: "Vice President: Operations"
    },
    {
        name: "Lucas dela Cruz",
        position: "Vice President: Finance"
    },
    {
        name: "Mateo dela Cruz",
        position: "Janitor"
    },
    {
        name: "Timoteo dela Cruz",
        position: "Pool Boy"
    },
]

export default function About() {
    return (
        <>
            <PageLayout title={pageContext.title} preview={false}>
                <PageTitle title={pageContext.heading} />
                <Splash srcFull="/static/splash-01.png"/>

                <div className="md:w-5/6 sm:w-full mx-auto my-4">
                    {persons.map(( person) => (
                        <PersonCard
                            name={person.name}
                            position={person.position}
                            imgFull={null}
                            imgMobile={null}
                            url={null}
                            content={null} />
                    ))}

                </div>
            </PageLayout>
        </>
)
}

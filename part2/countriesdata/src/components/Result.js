import CountryView from "./CountryView"
import CountryListItem from "./CountryListItem"

const Result = ({result}) => {
    if (result.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    };
    if (result.length === 1) {
        const country = result[0]
        return (
            <CountryView country={country}/>
        )
    }

    return (
        <div>
            {result.map(country => 
                <CountryListItem key={country.population} country={country}/>
            )}
        </div>
    )
}

export default Result
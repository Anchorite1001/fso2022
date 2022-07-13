const Result = ({result}) => {
    if (result.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    };
    if (result.length === 1) {
        const country = result[0]
        return (
            <div>
                <h2>{country.name['common']}</h2>
                <p>capital {country.capital.toString()}</p>
                <p>area {country.area}</p>

                <h3>languages:</h3>
                <ul>
                    {Object.entries(country.languages).map(([key,value]) => (
                        <li key={key}>{value}</li>
                    ))}
                </ul>
                <p>{country.flag}</p>
            </div>
        )
    }

    return (
        <div>
            {result.map(country => 
                <p key={country.population}>{country.name['common']}</p>
            )}
        </div>
    )
}

export default Result
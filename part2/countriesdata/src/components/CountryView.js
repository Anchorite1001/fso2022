const CountryView = ({country}) => (
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

export default CountryView

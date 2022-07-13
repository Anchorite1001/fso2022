import { useState } from 'react'

import CountryView from "./CountryView";

const CountryListItem = ({country}) => {
    const [showView, setShowView] = useState(false)

    return (
        <div>
            <p>
            {country.name['common']}{' '}
            <button onClick={() => setShowView(!showView)}>
                {showView ? 'Hide' : 'Show'}
            </button>
            </p>
            {showView &&
                <CountryView country={country}/>
            }
        </div>
    )
};

export default CountryListItem
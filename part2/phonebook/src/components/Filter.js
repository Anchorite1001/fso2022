const Filter = ({searchQuery, handleSearchChange}) => (
    <div>
        filter shown with 
        <input 
        value={searchQuery} 
        onChange={handleSearchChange}
        />
    </div>
)

export default Filter
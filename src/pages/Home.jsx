import Card from '../components/Card';

function Home({sneakers, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart}) {
    return (
        <div className="content p-40">
            <div className='d-flex align-center justify-between mb-40'>
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className='search-block'>
                    <img src='/img/search.png' alt='Search'></img>
                    {searchValue && <img onClick={() => setSearchValue('')} className='clear cu-p' src='/img/btn-remove.svg' alt='Clear'></img>}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск...'></input>
                </div>
            </div>
            <div className='d-flex flex-wrap'>
            {sneakers.filter(sneakersItem => sneakersItem.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((sneakers) => (
                            <Card key = {sneakers.id}
                                    id = {sneakers.id}
                                    title = {sneakers.title}
                                    price = {sneakers.price}
                                    imageUrl = {sneakers.imageUrl}
                                    onFavorite = {(obj) => onAddToFavorite(obj)}
                                    onPlus = {(obj) => onAddToCart(obj)}/>))}
            </div>
        </div> 
    );
}

export default Home;
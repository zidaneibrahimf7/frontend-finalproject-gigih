import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); // State untuk daftar saran
  const navigate = useNavigate();

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/product/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
      } else {
        throw new Error('Something went wrong!');
      }
    } catch (error) {
      console.error('Error fetching suggestions', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const selectedSuggestion = suggestions[0];
    if (selectedSuggestion) {
      navigate(`/videos/${selectedSuggestion.videoID}`);
    } else {
      console.log('No suggestion selected');
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className='relative'>
      <input
        type='text'
        placeholder='Search product...'
        value={searchQuery}
        onChange={handleSearchChange}
        className='w-90 p-2 mb-2 mt-3 rounded-md bg-mango placeholder:text-amber-600 text-orange'
      />
      {suggestions.length > 0 && (
        <ul className='suggestions'>
          {suggestions.map((item) => (
            <li
              key={item.videoID}
              onClick={() => navigate(`/videos/${item.videoID}`)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
      <button type='submit' className='bg-light-peach hover:bg-mango text-orange p-2 mx-3 rounded-lg'>
        Search
      </button>
    </form>
  );
};

export default SearchBar;

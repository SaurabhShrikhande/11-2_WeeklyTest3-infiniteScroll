// src/components/InfiniteScroll.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const count = 10;
  const apikey = "Dx8F8bc8M-OYLGjakB46ExFLWlVSi759Kfs_TQ4R92I";
  const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(apiURL);
      const newItems = response.data;
             console.log(newItems);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);

      // If the response has no more items, set hasMore to false
      if (newItems.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchItems}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {items.map((item, index) => (
        <div key={index} style={{display:"flex", justifyContent:"center", margin:"20px"}}>
            <h1 style={{width:"18vw"}}>{item.alt_description}</h1>
          <a href={item.links.html} target="_blank"> 
            <img style={{width:"75vw"}} src={item.urls.regular} alt={item.alt_description}/>
              </a>

        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ItemData } from "../types/itemData.interface";
import ItemCard from "../components/ItemCard.component";
import { styled } from "styled-components";

const fetchItems = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/");
  return res.data.items;
};

const Home = () => {
  const [items, setItems] = useState<ItemData[]>([]);
  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const fetchedItems = await fetchItems();
        if (Array.isArray(fetchedItems)) {
          setItems(fetchedItems);
        } else {
          console.error("Expected array of items, received:", fetchedItems);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItemsData();
  }, []);

  console.log("ITEMS ", items);
  return (
    <Container>
      <Header>All items</Header>
      {items.map((item) => (
        <ItemCard item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Home;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 50%;
  margin: 50px auto;
`;

const Header = styled.h1`
  font-weight: 600;
  text-align: center;
  font-size: 30px;
`;

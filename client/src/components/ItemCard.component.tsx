import React from "react";
import styled from "styled-components";
import { ItemData } from "../types/itemData.interface";
import { Source } from "../types/source.enum";
import rozetkaIcon from "../media/Rozetka.png";
import telemartIcon from "../media/Telemart.jpeg";

const renderSpecifications = (specifications: string) => {
  const specificationsArray = specifications.split("\n");
  return specificationsArray.map((text, index) => {
    if (text.length > 0) {
      const [label, value] = text.split(": ");
      return (
        <SpecificationRow key={index}>
          <SpecificationHeader>{label}:</SpecificationHeader>
          {value?.split(",")}
        </SpecificationRow>
      );
    }
  });
};

const ItemCard: React.FC<{ item: ItemData }> = ({ item }) => {
  const specifications = renderSpecifications(item.specifications);
  let sourceIcon;

  if (item.source === Source.ROZETKA) sourceIcon = rozetkaIcon;
  else if (item.source === Source.TELEMART) sourceIcon = telemartIcon;

  const navigateToItemPageHandler = () => {};

  return (
    <Container onClick={navigateToItemPageHandler}>
      <SourceLabel src={sourceIcon} />
      <h2>{item.title}</h2>
      <Image src={item.profileImage} alt="profile image" />
      <PriceContainer>{item.price}₴</PriceContainer>
      <TypeContainer>
        <h3>Тип: </h3>
        {item.type}
      </TypeContainer>
      {item.subtitle && <Subtitle>{item.subtitle}</Subtitle>}
      {item.description && (
        <div>
          <h3>Опис:</h3>
          <div>{item.description}</div>
        </div>
      )}
      <SpecificationsContainer>
        <h3>Характеристики:</h3>
        {specifications}
      </SpecificationsContainer>
    </Container>
  );
};

export default ItemCard;

const Container = styled.div`
  padding: 20px;
  border: 1px solid;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
`;

const SourceLabel = styled.img`
  position: absolute;
  height: 20px;
  right: 10px;
  top: 10px;
`;

const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  & > h3 {
    margin: 0;
  }
`;

const Image = styled.img`
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  margin: 20px auto;
`;

const PriceContainer = styled.div`
  font-size: 16px;
  font-weight: 600;
  align-self: flex-start;
`;

const Subtitle = styled.div`
  margin: 15px 0;
  font-size: 14px;
`;

const SpecificationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > h3 {
    margin: 30px 0 10px;
    padding: 0;
  }
`;

const SpecificationRow = styled.div`
  display: flex;
  gap: 10px;
`;

const SpecificationHeader = styled.h4`
  font-size: 16;
  font-weight: 600;
  margin: 0;
`;

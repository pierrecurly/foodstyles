import { gql } from "@apollo/client";

export const GET_FOOD_STYLES = gql`
  query getFoodStyles {
   cards {
      id
      name       
    }
  }
`;

export const CREATE_FOOD_STYLE = gql`
  mutation createCard($data: CardInput!) {
    createCard(data: $data) {
      id
      name       
    }
  }
`;

export const DUPLICATE_FOOD_STYLE = gql`
  mutation duplicateFoodStyle($id: ID!) {
    duplicateCard(id: $id) {
      id
      name           
    }
  }
`;

export const SHARE_FOOD_STYLE = gql`
  mutation shareFoodStyle($id: ID!) {
    shareCard(
      id: $id  
    )
  }
`;

export const DELETE_FOOD_STYLE = gql`
  mutation deleteFoodStyle($id: ID!) {
    deleteCard(id: $id)    
  }
`;
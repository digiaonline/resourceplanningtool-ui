// @flow

export const FETCH_CUSTOMERS_QUERY: string = `query {
  listCustomers {
     id
     name
     logo
     industry
     url
     projects {
       id
       name
     }
   }
}`;

export const getCreateCustomerQuery = (
  name: string,
  url: string,
  industry: string,
  logo: string
): string => {
  return `mutation {
    createCustomer(name: "${name}", url: "${url}", industry: "${industry}", logo: "${logo}") {
      id
      name
      logo
      industry
      url
    }
  }`;
};

export const getDeleteCustomerQuery = (id: string): string => {
  return `mutation {
    removeCustomer(id: "${id}")
  }`;
};

export const getUpdateCustomerQuery = (
  id: string,
  name: string,
  industry: string,
  url: string,
  logo: string
): string => {
  return `mutation {
    updateCustomer(id: ${+id}, name: "${name}", industry: "${industry}",  url: "${url}", logo: "${logo}",)
  }`;
};

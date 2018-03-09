// @flow

export const FETCH_CUSTOMERS_QUERY = `query {
  listCustomers {
     id
     name
     logo
     industry
     url
   }
}`;

export const getCreateCustomerQuery = (
  name: String,
  url: String,
  industry: String,
  logo: String
) => {
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

export const getDeleteCustomerQuery = (id: String) => {
  return `mutation {
    removeCustomer(id: "${id}")
  }`;
};

export const getUpdateCustomerQuery = (
  id: String,
  name: String,
  industry: String,
  logo: String,
  url: String
) => {
  return `mutation {
    updateCustomer(id: ${+id}, name: "${name}", industry: "${industry}",  url: "${url}", logo: "${logo}",)
  }`;
};

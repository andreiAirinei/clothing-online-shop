import { createSelector } from 'reselect';

const selectShop = state => state.shop;

// Returns an OBJECT of collections because of shop.data.jsx
export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Convert the OBJECT in to an ARRAY so that it can be used/maped in collections-overview
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // Get all the keys and then map over the array of keys so that we can get the value of the collection object of that key
  collections =>
    // If collections exists then call Object.keys, else return an empty version of our collections
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

// function that returns another function
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );

export const selectIsFetchingCollections = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  // Double !! returns true or false if it is empty or not
  shop => !!shop.collections
);
// ### OLD WAY before changing SHOP_ITEMS to object
// An object that maps the string value to the respective ID where the string value that we are getting from our URL, will be the actual property
// hats with ID of 1

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// };

// function that returns another function
// export const selectCollection = collectionUrlParam =>
//   createSelector(
//     [selectCollections],
//     collections =>
//       collections.find(
//         collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//       )
//   );

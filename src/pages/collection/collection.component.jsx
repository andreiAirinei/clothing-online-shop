import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

// console.log(match.params.collectionId) -> hats, sneakers...;

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// @arg1 - state - the overall reducer state
// @arg2 - ownProps - is the props of the component that we are wrapping in our connect
const mapStateToProps = (state, ownProps) => ({
  // selectCollection - is returning our createSelector call, which returns a function
  // This is necessary because unlike other selectors, this selector need a part of the state depending on the URL parameter
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);

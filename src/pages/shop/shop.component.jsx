import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {
  selectIsFetchingCollections,
  selectIsCollectionsLoaded
} from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// We get map, match, location & history props from App.js as we use Router

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isFetchingCollections, isCollectionLoaded } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner
              isLoading={isFetchingCollections}
              {...props}
            />
          )}
        />
        {/* It allows us to acces the categoryId as a parameter, which is the string of hats / sneakers... 
            collectionId - name defined by me
        */}
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isFetchingCollections: selectIsFetchingCollections,
  isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

// const ShopPage = ({ match }) => (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     {/* It allows us to acces the categoryId as a parameter, which is the string of hats / sneakers... */}
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);

// ### BEFORE PROMISE LECTURE
// componentDidMount() {
//   const { updateCollections } = this.props;
//   const collectionRef = firestore.collection('collections');
//   // onSnapshot activates whenever the collectionRef updates or whenever this code is run for the first time
//   this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
//     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//     updateCollections(collectionsMap);
//     this.setState({ loading: false });
//   });
// }

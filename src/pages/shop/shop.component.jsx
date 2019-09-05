import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.component';
import CollectionPageContainer from '../collection/collection.container';

// We get map, match, location & history props from App.js as we use Router

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        {/* It allows us to acces the categoryId as a parameter, which is the string of hats / sneakers... 
            collectionId - name defined by me
        */}
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

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
  null,
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

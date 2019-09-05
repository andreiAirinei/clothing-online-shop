// Container - component that gets wrapped in all of the HOC that it needs
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Currying all of our functions together
import { compose } from 'redux';

import { selectIsFetchingCollections } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingCollections
});

// Containers don't render anything. They just pass props down to components

// Currying all of our functions together
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;

// ### BEFORE compose
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));

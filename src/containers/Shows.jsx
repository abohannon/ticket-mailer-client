import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'
import { Card, Table } from 'components/common'
import { CARD_TITLE_PRIMARY } from 'constants'
import { formatUrlString } from 'helpers/util'

// Actions
import { fetchShows, search } from 'actions/applicationActions'
import { SEARCH_SHOWS, CLEAR_SEARCH } from 'actions/types'

class Shows extends Component {
  static propTypes = {
    fetchShowsPending: PropTypes.object,
    fetchShowsResolved: PropTypes.object,
    dispatch: PropTypes.func,
    location: PropTypes.object,
    toggleSearchBar: PropTypes.func,
    searchResultsShows: PropTypes.array,
  }

  componentDidMount() {
    const { dispatch, location, toggleSearchBar } = this.props
    this.searchQuery = location.search

    toggleSearchBar(SEARCH_SHOWS)

    dispatch(search(CLEAR_SEARCH))
    dispatch(fetchShows(this.searchQuery))
  }

  componentWillUnmount() {
    const { toggleSearchBar } = this.props

    toggleSearchBar()
  }

  parseShows = shows => shows.map((show, index) => ({
    key: index,
    show: show.title,
    bundles: show.variants.map(variant => ({
      title: variant.title,
      variant_id: variant.id,
      variant_title: variant.title,
      show_title: show.title,
      artist_name: show.vendor,
      email_sent: variant.email_sent,
    })),
  }))

  renderTableData = () => {
    const { fetchShowsResolved, searchResultsShows } = this.props

    if (!isEmpty(searchResultsShows)) {
      return this.parseShows(searchResultsShows)
    }

    if (!isEmpty(fetchShowsResolved)) {
      return this.parseShows(fetchShowsResolved.payload)
    }

    return []
  };

  render() {
    const { fetchShowsPending } = this.props

    const loading = !isEmpty(fetchShowsPending)

    const columns = [
      {
        title: 'Name',
        dataIndex: 'show',
        className: 'table-cell',
      },
      {
        title: 'Bundles',
        dataIndex: 'bundles',
        render: (bundles, record, index) => (
          <span>
            {bundles.map(bundle => (
              <Link
                to={{
                  pathname: `/dashboard/orders/${formatUrlString(record.show)}/${formatUrlString(bundle.title)}`,
                  search: `?variant_id=${bundle.variant_id}`,
                  state: {
                    variantId: bundle.variant_id,
                    variantTitle: bundle.variant_title,
                    showTitle: bundle.show_title,
                    artistName: bundle.artist_name,
                  },
                }}
                key={bundle.title}
              >
                <Tag
                  color={bundle.email_sent ? 'green' : 'blue'}
                  key={bundle.title}
                >
                  {bundle.title}
                </Tag>
              </Link>
            ))}
          </span>
        ),
      },
    ]

    const title = this.searchQuery ? 'Current Shows' : 'All Shows'

    return (
      <Card
        title={title}
        headStyle={CARD_TITLE_PRIMARY}
        fullWidth
      >
        <Table
          columns={columns}
          dataSource={this.renderTableData()}
          pagination={false}
          showHeader
          loading={loading}
        />
      </Card>
    )
  }
}

const mapStateToProps = ({
  application: {
    fetchShowsPending,
    fetchShowsResolved,
    searchResultsShows,
  },
}) => ({
  fetchShowsPending,
  fetchShowsResolved,
  searchResultsShows,
})

export default connect(mapStateToProps)(Shows)

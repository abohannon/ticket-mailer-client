import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'
import { Card, Table } from 'components/common'
import { formatUrlString } from 'helpers/util'
import { CARD_TITLE_PRIMARY } from 'constants'

// Actions
import { fetchTours, search } from 'actions/applicationActions'

import { SEARCH_TOURS, CLEAR_SEARCH } from 'actions/types'

class Tours extends Component {
  static propTypes = {
    fetchToursPending: PropTypes.object,
    fetchToursResolved: PropTypes.object,
    dispatch: PropTypes.func,
    toggleSearchBar: PropTypes.func,
    searchResultsTours: PropTypes.array,
  }

  componentDidMount() {
    const { dispatch, toggleSearchBar } = this.props

    toggleSearchBar(SEARCH_TOURS)

    // clear search results if any are held in redux
    dispatch(search(CLEAR_SEARCH))
    dispatch(fetchTours())
  }

  componentWillUnmount() {
    const { toggleSearchBar } = this.props
    toggleSearchBar()
  }

  parseTours = source => source.map((tour, index) => ({
    key: index,
    tour: tour.title,
    tour_id: tour.collection_id,
  }))

  tableData = () => {
    const { fetchToursResolved, searchResultsTours } = this.props
    if (!isEmpty(searchResultsTours)) {
      return this.parseTours(searchResultsTours)
    }

    if (!isEmpty(fetchToursResolved)) {
      return this.parseTours(fetchToursResolved.payload)
    }
    return []
  };

  render() {
    const { fetchToursPending } = this.props

    const loading = !isEmpty(fetchToursPending)

    const columns = [
      {
        title: 'Name',
        dataIndex: 'tour',
        className: 'table-cell',
        render: (text, record, index) => (
          <Link to={{
            pathname: `shows/${formatUrlString(text)}`,
            search: `?collection_id=${record.tour_id}`,
          }}
          >
            {text}
          </Link>
        ),
      },
    ]

    return (
      <Card
        title="Current Tours"
        style={{ minHeight: 400 }}
        headStyle={CARD_TITLE_PRIMARY}
        fullWidth
      >
        <Table
          columns={columns}
          dataSource={this.tableData()}
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
    fetchToursPending,
    fetchToursResolved,
    searchResultsTours,
  },
}) => ({
  fetchToursPending,
  fetchToursResolved,
  searchResultsTours,
})

export default connect(mapStateToProps)(Tours)

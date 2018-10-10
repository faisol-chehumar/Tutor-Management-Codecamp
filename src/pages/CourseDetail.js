import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCourses } from '../actions/coursesActions'
import ImageView from '../components/PageView/ImageView'
import { Row, Col } from 'antd'

// const uuidv1 = require('uuid/v1')

class CourseDetail extends Component {
  componentDidMount() {
    this.props.fetchCourses(this.props.match.params.id)
    console.log(this.props.match.params.id)
  }
  render() {
    const { courseList } = this.props
    console.log('CourseDetail Page >>>>>>>', courseList)
    return (
      courseList.map(s =>
        <div key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <ImageView
                title={s.title}
                description={s.description}
                imagePath={s.imagePath}
                imageDefault={'https://static1.squarespace.com/static/593ff48f20099eef990d199d/59db9c3dccc5c5531166f2c2/59db9c3de5dd5b5a1b440128/1507652291838/Icon+-+Coding.png?format=300w'}
              />
            </Col>
            <Col span={18} >
              <h1>{`${s.title}`}</h1>
              <p><b>StartDate: </b> {s.startDate}</p>
              <p><b>EndDate: </b> {s.endDate}</p>
              <address>
                <p><b>Adress Title:</b> {s.addressTitle}</p>
                <p><b>Adress:</b> {s.address}</p>
              </address>
            </Col>
          </Row>
        </div>

      )
    );
  }
}

const mapStateToProps = state => ({
  courseList: state.items.courses,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchCourses
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetail)
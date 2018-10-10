import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCourses } from '../actions/coursesActions'
import { Row, Col, Card } from 'antd'
const { Meta } = Card
const uuidv1 = require('uuid/v1')

class CourseDetail extends Component {
  componentDidMount() {
    this.props.fetchCourses(this.props.match.params.id)
    console.log(this.props.match.params.id)
  }
  render() {
    const { courseList } = this.props
    console.log('courseList>>>>>>>',courseList)
    return (
      courseList.map(s =>
        <div key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img alt="example"
                    src={s.imagePath === null || s.imagePath === '' || s.imagePath === 'www.google.com'
                    ? 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'
                    : s.imagePath}
                  />
                }
              >
                <Meta
                  title={`${s.title}`}
                  description={s.description}
                />
              </Card>
            </Col>
            <Col span={18} >
              <h1>{`${s.title}`}</h1>
              <p><b>StartDate: </b> {s.startDate}</p>
              <p><b>EndDate: </b> {s.endDate}</p>
              <address>
                <p><b>Adress Title:</b> { s.addressTitle}</p>
                <p><b>Adress:</b> { s.address}</p>
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
import React, { Component } from 'react'
import { fetchData } from '../../utils/request'
import ImageView from '../../components/PageView/ImageView'
import { Row, Col } from 'antd'

// const uuidv1 = require('uuid/v1')

class CourseDetail extends Component {
  state = {
    courseDetail : []
  }

  async componentDidMount() {
    this.setState({ courseDetail :  await fetchData('courses/' + this.props.match.params.id) })
  }

  render() {
    const { courseDetail } = this.state
    console.log(courseDetail)

    return (
      courseDetail.map(s =>
        <div key={s.key}>
          <Row gutter={16}>
            <Col span={6}>
              <ImageView
                title={s.title}
                description={s.description}
                imagePath={s.imagePath}
                imageDefault={'https://res.cloudinary.com/dbzxmgk2h/image/upload/v1540543273/exam-icon.png'}
              />
            </Col>
            <Col span={18} >
              <div>
                <h1>{`${s.title}`}</h1>
                <p>{s.description}</p>
                <p><b>StartDate: </b> {s.startDate}</p>
                <p><b>EndDate: </b> {s.endDate}</p>
                <address>
                  <p><b>Adress Title:</b> {s.location[0].addressTitle}</p>
                  <p><b>Adress:</b> {s.location[0].address}</p>
                </address>
              </div>
            </Col>
          </Row>
        </div>
      )
    )
  }
}

export default CourseDetail
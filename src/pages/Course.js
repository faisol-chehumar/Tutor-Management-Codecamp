import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCourses } from '../actions/coursesActions'
import { List, Avatar, Icon } from 'antd'

class Course extends Component {

  componentDidMount() {
    this.props.fetchCourses()
  }
  
  render() {
    const { coursesList } = this.props
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
    console.log(coursesList)

    return (
      <List
        itemLayout="vertical"
        size="medium"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={coursesList.result}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.description}
          </List.Item>
        )}
      />
    )
  }
}

const mapStateToProps = state => ({
  coursesList: state.items.courses,
  loading: state.items.loading,
  error: state.items.error
})

const mapDispatchToProps = {
  fetchCourses
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Course)
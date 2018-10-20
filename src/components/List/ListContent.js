import React from 'react'
import moment from 'moment'

import { List, Avatar, Icon, Tag } from 'antd'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

const ListContent = (props) => (
	<List
		itemLayout="vertical"
		size="large"
		pagination={{
			onChange: (page) => {
				console.log(page);
			},
			pageSize: 3,
		}}
		dataSource={props.listData}
		renderItem={item => (
			<List.Item
				key={item.title}
				actions={[
					<IconText type="star-o" text="156" />, 
					<IconText type="like-o" text="156" />,
					<IconText type="message" text="2" />
				]}
				extra={<img style={{ border: '1px solid #eee' }} width={272} alt="logo" src={item.imagePath} />}
			>
				<List.Item.Meta
					avatar={<Avatar src={item.avatar} />}
					title={<a href={`courses/${item.courseId}`}><h2>{item.title}</h2></a>}
					description={(() => (
						<div>
							<div>
								<b style={{ fontSize: '1rem' }}>Start - End: </b>
								{moment(item.startDate).format('YYYY/MM/DD')} - {moment(item.endtDate).format('YYYY/MM/DD')}
							</div>
							<div>
							<b style={{ fontSize: '1rem' }}>Day: </b>
								{item.coursesSchedule.map(elm => (
									<Tag color="#108ee9">{elm.day.toUpperCase()} : {elm.timeCode.toUpperCase()}</Tag>
								))}
							</div>
							<div>
								<b style={{ fontSize: '1rem' }}>Location: </b>
								{item.location[0].addressTitle}
							</div>
						</div>)
					)()}
				/>
				{item.description}
			</List.Item>
		)}
	/>
)

export default ListContent


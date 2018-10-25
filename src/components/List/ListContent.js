import React from 'react'
import moment from 'moment'
import { List, Avatar, Icon, Tag, Button } from 'antd'
import styled from 'styled-components'

import color from '../../styles/color'


const ListContentContainer = styled(List)`
	padding: 2rem !important;
	border-radius: 8px;
	background-color: ${color.white};
	border: 1px solid ${color.shadow};

	.ant-list-item:not(:last-child) {
		margin-bottom: 2rem;
	}
`


// const IconText = ({ type, text }) => (
//   <span>
//     <Icon type={type} style={{ marginRight: 8 }} />
//     {text}
//   </span>
// )

const ListContent = (props) => (
	<ListContentContainer
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
				// actions={[
				// 	<IconText type="star-o" text="156" />, 
				// 	<IconText type="like-o" text="156" />,
				// 	<IconText type="message" text="2" />
				// ]}
				extra={<img style={{ border: '1px solid #eee' }} width={272} alt="logo" src={item.imagePath} />}
			>
				<List.Item.Meta
					avatar={<Avatar src={item.avatar} />}
					title={<a href={`courses/${item.courseId}`}><h2>{item.title}</h2></a>}
					description={(() => (
						<div>
							<p>{item.description}</p>
							<div style={{ padding: '1rem 0', lineHeight: '2' }}>
								<div>
									<b style={{ fontSize: '1rem', marginRight: '1rem' }}>
										<Icon style={{ color: '#0fbb45' }} type="calendar" theme="outlined" /> Start - End: 
									</b> 
									{moment(item.startDate).format('YYYY/MM/DD')} - {moment(item.endtDate).format('YYYY/MM/DD')}
								</div>
								<div>
									<b style={{ fontSize: '1rem', marginRight: '1rem' }}>
										<Icon type="star" theme="twoTone" twoToneColor="#ffd605" /> Day: 
									</b> 
									{item.coursesSchedule.map(elm => (
										<Tag key={elm.day} color={color.hilight}>{elm.day.toUpperCase()} : {elm.timeCode.toUpperCase()}</Tag>
									))}
								</div>
								<div>
									<b style={{ fontSize: '1rem', marginRight: '1rem' }}><Icon type="environment" theme="twoTone" twoToneColor="#eb2f96" /> Location: </b>
									{item.location[0].addressTitle}
								</div>
							</div>
							<Button style={{ color: `${color.hilight}`, borderColor: `${color.hilight}` }} ghost type="primary" href={`courses/${item.courseId}`}>Course Detail</Button>
						</div>)
					)()}
				/>
			</List.Item>
		)}
	/>
)

export default ListContent


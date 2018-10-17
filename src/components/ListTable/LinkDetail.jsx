import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'antd'

const LinkDetail = ({ linkPath, imagePath, title, imageDefault }) => (
	<Link to={linkPath}>
		<Avatar
				style={{ marginRight: 5 }}
				size="large"
				src={imagePath === null || imagePath === '' || imagePath === undefined
						? imageDefault 
						: imagePath}
		/>
		{title}
	</Link>
)
export default LinkDetail
import React from 'react'
import { Card } from 'antd'
const { Meta } = Card
const ImageView = ({ description, imagePath, title, imageDefault }) => (
    <Card
        hoverable
        style={{ width: 240 }}
        cover={
            <img alt={title}
                src={imagePath === null || imagePath === '' || imagePath === undefined
                    ? imageDefault
                    : imagePath}
            />
        }
    >
        <Meta
            title={title}
            description={description}
        />
    </Card>

)
export default ImageView
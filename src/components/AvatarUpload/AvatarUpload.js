import React from 'react'
import { Upload, Icon, message } from 'antd'
import axios from 'axios'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

class Avatar extends React.Component {
  state = {
    loading: false,
  }

  handleChange = (info) => {
    // console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }))

    }
  }

  uploadHandle = (url) => {
    this.props.onUploadAvatar(url)
    // this.props.avatarHandle = url
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl
    // console.log(this.props)
    // console.log(this.state)
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={(file) => {
          // console.log(file)
          // console.log(file.file)
          const formData = new FormData()
            formData.append("file", file.file)
            formData.append("tags", `codeinfuse, medium, gist`)
            formData.append("upload_preset", "io4200sx") // Replace the preset name with your own
            formData.append("api_key", "186427164758563") // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0)

            axios.post("https://api.cloudinary.com/v1_1/dbzxmgk2h/image/upload", formData, {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
              const data = response.data
              const fileURL = data.secure_url // You should store this URL for future references in your app
              // console.log(data)
              // console.log(fileURL)
              this.setState({
                imageUrl: fileURL,
                loading: false,
              })
              
              this.uploadHandle(fileURL)
            })

        }}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    )
  }
}

export default Avatar
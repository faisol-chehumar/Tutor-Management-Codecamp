import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { uploadImage } from '../../actions/uploadImagesActions'
import { connect } from 'react-redux'

class UploadImage extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return }

    this.setState({ loading: true }, () => {
      let reader = new FileReader()

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result })
      }

      reader.readAsDataURL(nextProps.file)
    })
  }

  render() {
    const { file } = this.props
    const { loading, thumb } = this.state

    if (!file) { return null }

    if (loading) { return <p>loading...</p> }

    return (<img src={thumb}
      alt={file.name}
      className="img-thumbnail mt-2"
      height={200}
      width={200} />)
  }
}

class UploadImageForm extends React.Component {
  render() {
    return (
      <div className="container">
        <Formik 
          initialValues={{ file: null }}
          onSubmit={(values) => {
            console.log('Upload')
            // Initial FormData
            const formData = new FormData()
            formData.append("file", values.file)
            formData.append("tags", `codeinfuse, medium, gist`)
            formData.append("upload_preset", "io4200sx") // Replace the preset name with your own
            formData.append("api_key", "186427164758563") // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0)
            
            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/dbzxmgk2h/image/upload", formData, {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
              const data = response.data
              const fileURL = data.secure_url // You should store this URL for future references in your app
              console.log(data)
              console.log(fileURL)
              this.props.uploadImage(fileURL)
            })
          }}

          validationSchema={yup.object().shape({
            file: yup.mixed().required(),
          })}

          render={({ values, handleSubmit, setFieldValue }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="file">File upload</label>
                  <input id="file" name="file" type="file" onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0])
                  }} className="form-control" />
                  <UploadImage file={values.file} />
                </div>
                <button type="submit" className="btn btn-primary">submit</button>
              </form>
            )
          }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  uploadImage
}

export default connect(
  null,
  mapDispatchToProps
)(UploadImageForm)


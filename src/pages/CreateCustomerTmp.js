import React, { Component } from 'react'
import CreateFormXX from '../components/Form/CreateFormXX'
class CreateCustomer extends Component {
    state = {
        title: 'Courses'
    }

    render() {
        const { title } = this.state
        const formData = [
            {
                title: 'Course title',
                decorator: 'courseTitle',
                required: true,
                type: 'INPUT'
            }
        ]
        
        return (
            <div>
                <h2>CREATE NEW {title.toUpperCase()}</h2>
                <CreateFormXX formData={formData} />
            </div>
        )
    }
}

export default CreateCustomer
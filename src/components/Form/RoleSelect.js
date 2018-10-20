import React, { Component } from 'react'
import { Checkbox, Row, Col, Input } from 'antd'

const CheckboxGroup = Checkbox.Group

let data = {}
const role = ['ta', 'tch']
class RoleSelect extends Component {
	state = {
		roleChecked: {
			tch: true,
			ta: true
		}
	}

	
	checkRole = (checkedValues, role) => {
		if (checkedValues.includes(role)) {
		  if (!([role] in data)) {
			data = {
			  ...data,
			  [role]: {
				value : ''
			  }
			}
		  }
		} else {
		  delete data[role]
		}
	  }

	onChange = (checkedValues) => {

		role.map(d => this.checkRole(checkedValues, d))

		this.props.onSelected(data)
	}

	handleChange(value) {
		console.log(`selected ${value}`);
	}

	// onInputChange = (value) => {
	// 	console.log('Input value >>>>',value);
	// }

	render() {
		const { roleChecked } = this.state

		return (
			<CheckboxGroup style={{ width: '100%' }} onChange={this.onChange}>
				{
					Object.keys(roleChecked).map(role => (
						<Row key={role}>
							<Col span={4}>
								<Checkbox
									value={role}
									onClick={e => this.setState({
										roleChecked: {
											...roleChecked,
											[role]: !roleChecked[role]
										}
									})}
									
								>
									{role.toUpperCase()}
							
								</Checkbox>
							</Col>
							<Col span={20}>
								<Input
									placeholder="Please Enter Your Manday Rate"
									disabled={roleChecked[role]}
									onChange={e => {
								    data[role].value = e.target.value
										console.log(role, e.target.value)
									}
								} />
							</Col>
						</Row>
					))
				}
			</CheckboxGroup>
		)
	}
}

export default RoleSelect
import React from "react"
import { Form, Input } from "semantic-ui-react"

export const DataElementForm = ({dataElements, submitAction}) => {
	const handleSumbit = (event)=>{
		submitAction(event.target.value)
	}
	return (
		<Form>
			<Form.Field>
				<label>DataElements</label>
				<select
					onChange={handleSumbit}>
					{
						dataElements.map((dataElement, i) =>(
							<option value={dataElement.dataelementid}
								key={i}>
								{dataElement.dataelementname}
							</option>
						))
					}
				</select>
			</Form.Field>
		</Form>
	)
}

export default DataElementForm
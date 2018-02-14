import React from "react"
import { Table, Icon, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

const ChildrenTable = ({ children, title, childrenLevel }) => (
	<div>
		<Table cell stripped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan="3">
						{title + " " + childrenLevel}
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{children.map(child => (
					<Table.Row>
						<Table.Cell collapsing>
							<Icon name="folder" />
						</Table.Cell>
						<Table.Cell>{child.name}</Table.Cell>
						<Table.Cell collapsing textAlign="right">
							<Button>
								<Link to={`/facilities/${child.id}`}>View Performance</Link>
							</Button>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	</div>
)

export default ChildrenTable

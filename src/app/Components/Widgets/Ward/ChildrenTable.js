import React from "react"
import { Table, Icon, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"

const ChildrenTable = ({ children, title, childrenLevel }) => (
	<div>
		<Table celled striped>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell colSpan="3">
						{title + " " + childrenLevel}
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{children.map(child => (
					<Table.Row key={child.id}>
						<Table.Cell collapsing>
							<Icon name="folder" />
						</Table.Cell>
						<Table.Cell>{child.name}</Table.Cell>
						<Table.Cell collapsing textAlign="right">
							<Button>
								<Link to={`/${childrenLevel}/${child.id}`}>View Performance</Link>
							</Button>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	</div>
)

export default ChildrenTable

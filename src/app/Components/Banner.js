import React from "react"
import { Segment, Header } from "semantic-ui-react"

const Banner = ({ title }) => {
	return (
		<Segment size="massive" inverted color="red" secondary>
			<Header as="h1">{title} WARD</Header>
		</Segment>
	)
}

export default Banner

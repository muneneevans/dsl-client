import React from "react"
import { Segment, Header } from "semantic-ui-react"

const Banner = ({ title, color }) => {
	return (
		<Segment size="massive" inverted color={color} secondary>
			<Header as="h1">{title}</Header>
		</Segment>
	)
}

export default Banner

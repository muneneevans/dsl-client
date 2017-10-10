import React from 'react'
import DropDownInput from "./Inputs/DropDownInput"
import { Dropdown, Form, Card, Header } from "semantic-ui-react"

export const YearForm = (props) => {
    const handleChange = (e, { value }) => {
        props.submitAction(value)
    }

    const years =[{"key":1970,"text":1970,"value":1970},{"key":1971,"text":1971,"value":1971},{"key":1972,"text":1972,"value":1972},{"key":1973,"text":1973,"value":1973},{"key":1974,"text":1974,"value":1974},{"key":1975,"text":1975,"value":1975},{"key":1976,"text":1976,"value":1976},{"key":1977,"text":1977,"value":1977},{"key":1978,"text":1978,"value":1978},{"key":1979,"text":1979,"value":1979},{"key":1980,"text":1980,"value":1980},{"key":1981,"text":1981,"value":1981},{"key":1982,"text":1982,"value":1982},{"key":1983,"text":1983,"value":1983},{"key":1984,"text":1984,"value":1984},{"key":1985,"text":1985,"value":1985},{"key":1986,"text":1986,"value":1986},{"key":1987,"text":1987,"value":1987},{"key":1988,"text":1988,"value":1988},{"key":1989,"text":1989,"value":1989},{"key":1990,"text":1990,"value":1990},{"key":1991,"text":1991,"value":1991},{"key":1992,"text":1992,"value":1992},{"key":1993,"text":1993,"value":1993},{"key":1994,"text":1994,"value":1994},{"key":1995,"text":1995,"value":1995},{"key":1996,"text":1996,"value":1996},{"key":1997,"text":1997,"value":1997},{"key":1998,"text":1998,"value":1998},{"key":1999,"text":1999,"value":1999},{"key":2000,"text":2000,"value":2000},{"key":2001,"text":2001,"value":2001},{"key":2002,"text":2002,"value":2002},{"key":2003,"text":2003,"value":2003},{"key":2004,"text":2004,"value":2004},{"key":2005,"text":2005,"value":2005},{"key":2006,"text":2006,"value":2006},{"key":2007,"text":2007,"value":2007},{"key":2008,"text":2008,"value":2008},{"key":2009,"text":2009,"value":2009},{"key":2010,"text":2010,"value":2010},{"key":2011,"text":2011,"value":2011},{"key":2012,"text":2012,"value":2012},{"key":2013,"text":2013,"value":2013},{"key":2014,"text":2014,"value":2014},{"key":2015,"text":2015,"value":2015},{"key":2016,"text":2016,"value":2016},{"key":2017,"text":2017,"value":2017}]
    return(
        <Form>
            <Form.Field>
                <Header as='h5'>Year</Header>
                <DropDownInput options={years} placeholder="select a year" onChange={handleChange}/>
            </Form.Field>
        </Form>
    )
}

export default YearForm